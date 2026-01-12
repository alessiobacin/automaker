/**
 * GET /opencode-status endpoint - Get OpenCode CLI installation and auth status
 */

import type { Request, Response } from 'express';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { getErrorMessage, logError } from '../common.js';

/**
 * Check if OpenCode CLI is installed
 */
async function checkOpenCodeInstalled(): Promise<{
  installed: boolean;
  path: string | null;
  version: string | null;
}> {
  try {
    // Try to find opencode in PATH
    const whichCommand = process.platform === 'win32' ? 'where opencode' : 'which opencode';
    const cliPath = execSync(whichCommand, { encoding: 'utf-8' }).trim().split('\n')[0];

    // Get version
    let version: string | null = null;
    try {
      version = execSync('opencode --version', { encoding: 'utf-8' }).trim();
    } catch {
      // Version command might fail
    }

    return {
      installed: true,
      path: cliPath,
      version,
    };
  } catch {
    return {
      installed: false,
      path: null,
      version: null,
    };
  }
}

/**
 * Check OpenCode authentication status
 */
async function checkOpenCodeAuth(): Promise<{
  authenticated: boolean;
  method: string;
  providers: string[];
}> {
  const providers: string[] = [];
  let authenticated = false;
  let method = 'none';

  // Check for OpenRouter API key
  if (process.env.OPENROUTER_API_KEY) {
    providers.push('openrouter');
    authenticated = true;
    method = 'env:OPENROUTER_API_KEY';
  }

  // Check for Anthropic API key
  if (process.env.ANTHROPIC_API_KEY) {
    providers.push('anthropic');
    authenticated = true;
    if (method === 'none') {
      method = 'env:ANTHROPIC_API_KEY';
    } else {
      method += ',env:ANTHROPIC_API_KEY';
    }
  }

  // Check for OpenAI API key
  if (process.env.OPENAI_API_KEY) {
    providers.push('openai');
    authenticated = true;
    if (method === 'none') {
      method = 'env:OPENAI_API_KEY';
    } else {
      method += ',env:OPENAI_API_KEY';
    }
  }

  // Check for OpenCode config file
  const configPath = path.join(os.homedir(), '.config', 'opencode', 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.providers) {
        for (const [provider, settings] of Object.entries(config.providers)) {
          if ((settings as any)?.apiKey) {
            providers.push(provider);
            authenticated = true;
            if (method === 'none') {
              method = 'config';
            }
          }
        }
      }
    } catch {
      // Config parsing failed
    }
  }

  return {
    authenticated,
    method,
    providers: [...new Set(providers)], // Remove duplicates
  };
}

/**
 * Creates handler for GET /api/setup/opencode-status
 * Returns OpenCode CLI installation and authentication status
 */
export function createOpenCodeStatusHandler() {
  return async (_req: Request, res: Response): Promise<void> => {
    try {
      const [installStatus, authStatus] = await Promise.all([
        checkOpenCodeInstalled(),
        checkOpenCodeAuth(),
      ]);

      res.json({
        success: true,
        installed: installStatus.installed,
        version: installStatus.version,
        path: installStatus.path,
        auth: authStatus,
      });
    } catch (error) {
      logError(error, 'Get OpenCode status failed');
      res.status(500).json({
        success: false,
        error: getErrorMessage(error),
      });
    }
  };
}
