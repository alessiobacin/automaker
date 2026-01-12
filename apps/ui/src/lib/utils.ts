import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ModelAlias } from '@/store/app-store';
import type { ModelProvider } from '@automaker/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determine if the current model supports extended thinking controls
 */
export function modelSupportsThinking(_model?: ModelAlias | string): boolean {
  // All Claude models support thinking
  return true;
}

/**
 * Determine the provider from a model string
 * Mirrors the logic in apps/server/src/providers/provider-factory.ts
 */
export function getProviderFromModel(model?: string): ModelProvider {
  if (!model) return 'claude';

  // Check for Cursor models (cursor- prefix)
  if (model.startsWith('cursor-') || model.startsWith('cursor:')) {
    return 'cursor';
  }

  // Check for Codex/OpenAI models (codex- prefix, gpt- prefix, or o-series)
  if (
    model.startsWith('codex-') ||
    model.startsWith('codex:') ||
    model.startsWith('gpt-') ||
    /^o\d/.test(model)
  ) {
    return 'codex';
  }

  // Check for OpenCode models (opencode/, amazon-bedrock/, openrouter/, etc.)
  if (
    model.startsWith('opencode/') ||
    model.startsWith('amazon-bedrock/') ||
    model.startsWith('openrouter/') ||
    model.startsWith('google/') ||
    model.startsWith('github-copilot/')
  ) {
    return 'opencode';
  }

  // Default to Claude
  return 'claude';
}

/**
 * Get display name for a model
 */
export function getModelDisplayName(model: ModelAlias | string): string {
  const displayNames: Record<string, string> = {
    haiku: 'Claude Haiku',
    sonnet: 'Claude Sonnet',
    opus: 'Claude Opus',
  };
  return displayNames[model] || model;
}

/**
 * Truncate a description string with ellipsis
 */
export function truncateDescription(description: string, maxLength = 50): string {
  if (description.length <= maxLength) {
    return description;
  }
  return `${description.slice(0, maxLength)}...`;
}

/**
 * Normalize a file path to use forward slashes consistently.
 * This is important for cross-platform compatibility (Windows uses backslashes).
 */
export function normalizePath(p: string): string {
  return p.replace(/\\/g, '/');
}

/**
 * Compare two paths for equality, handling cross-platform differences.
 * Normalizes both paths to forward slashes before comparison.
 */
export function pathsEqual(p1: string | undefined | null, p2: string | undefined | null): boolean {
  if (!p1 || !p2) return p1 === p2;
  return normalizePath(p1) === normalizePath(p2);
}

/**
 * Detect if running on macOS.
 * Checks Electron process.platform first, then falls back to navigator APIs.
 */
export const isMac =
  typeof process !== 'undefined' && process.platform === 'darwin'
    ? true
    : typeof navigator !== 'undefined' &&
      (/Mac/.test(navigator.userAgent) ||
        (navigator.platform ? navigator.platform.toLowerCase().includes('mac') : false));
