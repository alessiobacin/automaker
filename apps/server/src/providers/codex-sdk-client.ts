/**
 * Codex SDK client - STUB VERSION
 *
 * The @openai/codex-sdk package is not installed.
 * This stub throws an error if SDK mode is used.
 * Use CLI mode instead.
 */

import type { ExecuteOptions, ProviderMessage } from './types.js';

/**
 * Execute Codex query via SDK - STUB
 * @throws Error - SDK not available
 */
export async function* executeCodexSdkQuery(
  _options: ExecuteOptions,
  _systemPrompt: string | null
): AsyncGenerator<ProviderMessage> {
  yield {
    type: 'error',
    content:
      '@openai/codex-sdk package is not installed. Please use CLI mode or install the SDK: npm install @openai/codex-sdk',
  };
}
