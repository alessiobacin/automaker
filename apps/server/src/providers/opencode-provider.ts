/**
 * OpenCode Provider - Executes queries using opencode CLI
 *
 * Extends CliProvider with OpenCode-specific:
 * - Support for multiple model providers (Anthropic, OpenAI, OpenRouter)
 * - Environment variable based authentication
 * - JSONL streaming format
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {
  CliProvider,
  type CliSpawnConfig,
  type CliDetectionResult,
  type CliErrorInfo,
} from './cli-provider.js';
import type {
  ProviderConfig,
  ExecuteOptions,
  ProviderMessage,
  InstallationStatus,
  ModelDefinition,
  ContentBlock,
} from './types.js';
import { OPENCODE_MODEL_CONFIG_MAP, type OpencodeModelId } from '@automaker/types';
import { createLogger, isAbortError } from '@automaker/utils';
import { spawnJSONLProcess } from '@automaker/platform';

const logger = createLogger('OpenCodeProvider');

// =============================================================================
// OpenCode Error Types
// =============================================================================

export enum OpenCodeErrorCode {
  NOT_INSTALLED = 'OPENCODE_NOT_INSTALLED',
  NOT_AUTHENTICATED = 'OPENCODE_NOT_AUTHENTICATED',
  INVALID_MODEL = 'OPENCODE_INVALID_MODEL',
  API_ERROR = 'OPENCODE_API_ERROR',
  RATE_LIMITED = 'OPENCODE_RATE_LIMITED',
  EXECUTION_FAILED = 'OPENCODE_EXECUTION_FAILED',
}

export class OpenCodeError extends Error {
  constructor(
    public readonly code: OpenCodeErrorCode,
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'OpenCodeError';
  }
}

// =============================================================================
// OpenCode Provider Implementation
// =============================================================================

export class OpenCodeProvider extends CliProvider {
  private sessionId: string | null = null;

  constructor(config: ProviderConfig = {}) {
    super(config);
  }

  // ==========================================================================
  // CliProvider Abstract Implementation
  // ==========================================================================

  getCliName(): string {
    return 'opencode';
  }

  getSpawnConfig(): CliSpawnConfig {
    return {
      windowsStrategy: 'direct',
      commonPaths: {
        linux: ['~/.local/bin/opencode', '/usr/local/bin/opencode'],
        darwin: ['~/.local/bin/opencode', '/usr/local/bin/opencode', '/opt/homebrew/bin/opencode'],
        win32: ['%USERPROFILE%\\.local\\bin\\opencode.exe'],
      },
      versionCommand: '--version',
    };
  }

  buildCliArgs(options: ExecuteOptions): string[] {
    const args: string[] = [];

    // Add model if specified
    if (options.model) {
      args.push('--model', options.model);
    }

    // Add streaming mode
    args.push('--output-format', 'stream-json');

    // Add working directory
    if (options.workingDirectory) {
      args.push('--cwd', options.workingDirectory);
    }

    // Add context files
    if (options.contextFiles?.length) {
      for (const file of options.contextFiles) {
        args.push('--file', file);
      }
    }

    // Add the prompt/message
    if (options.message) {
      args.push('--message', options.message);
    }

    return args;
  }

  normalizeEvent(event: unknown): ProviderMessage | null {
    if (!event || typeof event !== 'object') {
      return null;
    }

    const e = event as Record<string, unknown>;
    const eventType = e.type as string;

    switch (eventType) {
      case 'text':
      case 'content':
        return {
          type: 'assistant',
          message: {
            role: 'assistant',
            content: String(e.content || e.text || ''),
          },
        };

      case 'tool_use':
      case 'tool_call':
        return {
          type: 'tool_use',
          name: String(e.name || e.tool || 'unknown'),
          input: e.input || e.arguments || {},
        };

      case 'tool_result':
        return {
          type: 'tool_result',
          tool_use_id: String(e.tool_use_id || e.id || ''),
          content: String(e.content || e.result || ''),
        };

      case 'error':
        return {
          type: 'error',
          message: String(e.message || e.error || 'Unknown error'),
        };

      case 'done':
      case 'end':
        return {
          type: 'result',
          subtype: 'success',
          cost_usd: (e.usage as any)?.cost || 0,
          duration_ms: (e.duration_ms as number) || 0,
          session_id: this.sessionId || '',
        };

      default:
        // Return null for unknown events
        return null;
    }
  }

  // ==========================================================================
  // Provider Interface Implementation
  // ==========================================================================

  get name(): string {
    return 'opencode';
  }

  get displayName(): string {
    return 'OpenCode';
  }

  get defaultModel(): string {
    return 'claude-sonnet-4-20250514';
  }

  protected mapError(stderr: string, exitCode: number | null): CliErrorInfo {
    const lower = stderr.toLowerCase();

    // Authentication errors
    if (
      lower.includes('api key') ||
      lower.includes('unauthorized') ||
      lower.includes('authentication')
    ) {
      return {
        code: OpenCodeErrorCode.NOT_AUTHENTICATED,
        message: 'OpenCode is not authenticated. Please set API keys.',
        recoverable: true,
        suggestion: 'Set ANTHROPIC_API_KEY, OPENAI_API_KEY, or OPENROUTER_API_KEY',
      };
    }

    // Rate limiting
    if (lower.includes('rate limit') || lower.includes('429')) {
      return {
        code: OpenCodeErrorCode.RATE_LIMITED,
        message: 'API rate limit exceeded',
        recoverable: true,
        suggestion: 'Wait a few minutes and try again',
      };
    }

    // Invalid model
    if (lower.includes('model not found') || lower.includes('invalid model')) {
      return {
        code: OpenCodeErrorCode.INVALID_MODEL,
        message: 'Invalid or unsupported model specified',
        recoverable: true,
        suggestion: 'Check available models with opencode --list-models',
      };
    }

    // Default error
    return {
      code: OpenCodeErrorCode.EXECUTION_FAILED,
      message: stderr || `OpenCode exited with code ${exitCode}`,
      recoverable: false,
    };
  }

  // ==========================================================================
  // Model Support
  // ==========================================================================

  async getAvailableModels(): Promise<ModelDefinition[]> {
    return Object.values(OPENCODE_MODEL_CONFIG_MAP).map((config) => ({
      id: config.id,
      name: config.label,
      description: config.description,
      contextWindow: 128000, // Default context window
      maxOutputTokens: 8192,
      supportsImages: config.supportsVision,
      supportsStreaming: true,
      provider: config.provider,
    }));
  }

  // ==========================================================================
  // Authentication
  // ==========================================================================

  async checkAuth(): Promise<{
    authenticated: boolean;
    method: string;
    providers: string[];
  }> {
    const providers: string[] = [];
    let authenticated = false;
    let method = 'none';

    // Check for API keys in environment
    if (process.env.OPENROUTER_API_KEY) {
      providers.push('openrouter');
      authenticated = true;
      method = 'env:OPENROUTER_API_KEY';
    }

    if (process.env.ANTHROPIC_API_KEY) {
      providers.push('anthropic');
      authenticated = true;
    }

    if (process.env.OPENAI_API_KEY) {
      providers.push('openai');
      authenticated = true;
    }

    return { authenticated, method, providers };
  }

  // ==========================================================================
  // CLI Path Access
  // ==========================================================================

  getCliPath(): string | null {
    return this.cliPath;
  }
}
