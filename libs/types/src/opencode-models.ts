/**
 * OpenCode Model IDs
 * Models available via OpenCode CLI (opencode models command)
 */
export type OpencodeModelId =
  // OpenCode Free Tier Models
  | 'opencode/big-pickle'
  | 'opencode/glm-4.7-free'
  | 'opencode/gpt-5-nano'
  | 'opencode/grok-code'
  | 'opencode/minimax-m2.1-free'
  // OpenRouter - Anthropic Claude Models
  | 'openrouter/anthropic/claude-3.5-haiku'
  | 'openrouter/anthropic/claude-3.7-sonnet'
  | 'openrouter/anthropic/claude-haiku-4.5'
  | 'openrouter/anthropic/claude-opus-4'
  | 'openrouter/anthropic/claude-opus-4.1'
  | 'openrouter/anthropic/claude-opus-4.5'
  | 'openrouter/anthropic/claude-sonnet-4'
  | 'openrouter/anthropic/claude-sonnet-4.5'
  // OpenRouter - Cognitive Computations Models
  | 'openrouter/cognitivecomputations/dolphin3.0-mistral-24b'
  | 'openrouter/cognitivecomputations/dolphin3.0-r1-mistral-24b'
  // OpenRouter - DeepSeek Models
  | 'openrouter/deepseek/deepseek-chat-v3-0324'
  | 'openrouter/deepseek/deepseek-chat-v3.1'
  | 'openrouter/deepseek/deepseek-r1-0528-qwen3-8b:free'
  | 'openrouter/deepseek/deepseek-r1-0528:free'
  | 'openrouter/deepseek/deepseek-r1-distill-llama-70b'
  | 'openrouter/deepseek/deepseek-r1-distill-qwen-14b'
  | 'openrouter/deepseek/deepseek-r1:free'
  | 'openrouter/deepseek/deepseek-v3-base:free'
  | 'openrouter/deepseek/deepseek-v3.1-terminus'
  | 'openrouter/deepseek/deepseek-v3.1-terminus:exacto'
  | 'openrouter/deepseek/deepseek-v3.2'
  | 'openrouter/deepseek/deepseek-v3.2-speciale'
  // OpenRouter - Featherless Models
  | 'openrouter/featherless/qwerky-72b'
  // OpenRouter - Google Models
  | 'openrouter/google/gemini-2.0-flash-001'
  | 'openrouter/google/gemini-2.0-flash-exp:free'
  | 'openrouter/google/gemini-2.5-flash'
  | 'openrouter/google/gemini-2.5-flash-lite'
  | 'openrouter/google/gemini-2.5-flash-lite-preview-09-2025'
  | 'openrouter/google/gemini-2.5-flash-preview-09-2025'
  | 'openrouter/google/gemini-2.5-pro'
  | 'openrouter/google/gemini-2.5-pro-preview-05-06'
  | 'openrouter/google/gemini-2.5-pro-preview-06-05'
  | 'openrouter/google/gemini-3-flash-preview'
  | 'openrouter/google/gemini-3-pro-preview'
  | 'openrouter/google/gemma-2-9b-it:free'
  | 'openrouter/google/gemma-3-12b-it'
  | 'openrouter/google/gemma-3-27b-it'
  | 'openrouter/google/gemma-3n-e4b-it'
  | 'openrouter/google/gemma-3n-e4b-it:free'
  // OpenRouter - KwaiPilot Models
  | 'openrouter/kwaipilot/kat-coder-pro:free'
  // OpenRouter - Meta Llama Models
  | 'openrouter/meta-llama/llama-3.2-11b-vision-instruct'
  | 'openrouter/meta-llama/llama-3.3-70b-instruct:free'
  | 'openrouter/meta-llama/llama-4-scout:free'
  // OpenRouter - Microsoft Models
  | 'openrouter/microsoft/mai-ds-r1:free'
  // OpenRouter - Minimax Models
  | 'openrouter/minimax/minimax-01'
  | 'openrouter/minimax/minimax-m1'
  | 'openrouter/minimax/minimax-m2'
  | 'openrouter/minimax/minimax-m2.1'
  // OpenRouter - MistralAI Models
  | 'openrouter/mistralai/codestral-2508'
  | 'openrouter/mistralai/devstral-2512'
  | 'openrouter/mistralai/devstral-2512:free'
  | 'openrouter/mistralai/devstral-medium-2507'
  | 'openrouter/mistralai/devstral-small-2505'
  | 'openrouter/mistralai/devstral-small-2505:free'
  | 'openrouter/mistralai/devstral-small-2507'
  | 'openrouter/mistralai/mistral-7b-instruct:free'
  | 'openrouter/mistralai/mistral-medium-3'
  | 'openrouter/mistralai/mistral-medium-3.1'
  | 'openrouter/mistralai/mistral-nemo:free'
  | 'openrouter/mistralai/mistral-small-3.1-24b-instruct'
  | 'openrouter/mistralai/mistral-small-3.2-24b-instruct'
  | 'openrouter/mistralai/mistral-small-3.2-24b-instruct:free'
  // OpenRouter - Moonshot Models
  | 'openrouter/moonshotai/kimi-dev-72b:free'
  | 'openrouter/moonshotai/kimi-k2'
  | 'openrouter/moonshotai/kimi-k2-0905'
  | 'openrouter/moonshotai/kimi-k2-0905:exacto'
  | 'openrouter/moonshotai/kimi-k2-thinking'
  | 'openrouter/moonshotai/kimi-k2:free'
  // OpenRouter - NousResearch Models
  | 'openrouter/nousresearch/deephermes-3-llama-3-8b-preview'
  | 'openrouter/nousresearch/hermes-4-405b'
  | 'openrouter/nousresearch/hermes-4-70b'
  // OpenRouter - NVIDIA Models
  | 'openrouter/nvidia/nemotron-nano-9b-v2'
  // OpenRouter - OpenAI Models
  | 'openrouter/openai/gpt-4.1'
  | 'openrouter/openai/gpt-4.1-mini'
  | 'openrouter/openai/gpt-4o-mini'
  | 'openrouter/openai/gpt-5'
  | 'openrouter/openai/gpt-5-codex'
  | 'openrouter/openai/gpt-5-image'
  | 'openrouter/openai/gpt-5-mini'
  | 'openrouter/openai/gpt-5-nano'
  | 'openrouter/openai/gpt-5-pro'
  | 'openrouter/openai/gpt-5.1'
  | 'openrouter/openai/gpt-5.1-chat'
  | 'openrouter/openai/gpt-5.1-codex'
  | 'openrouter/openai/gpt-5.1-codex-mini'
  | 'openrouter/openai/gpt-5.2'
  | 'openrouter/openai/gpt-5.2-chat-latest'
  | 'openrouter/openai/gpt-5.2-pro'
  | 'openrouter/openai/gpt-oss-120b'
  | 'openrouter/openai/gpt-oss-120b:exacto'
  | 'openrouter/openai/gpt-oss-20b'
  | 'openrouter/openai/gpt-oss-safeguard-20b'
  | 'openrouter/openai/o4-mini'
  // OpenRouter - OpenRouter Models
  | 'openrouter/openrouter/sherlock-dash-alpha'
  | 'openrouter/openrouter/sherlock-think-alpha'
  // OpenRouter - Qwen Models
  | 'openrouter/qwen/qwen-2.5-coder-32b-instruct'
  | 'openrouter/qwen/qwen2.5-vl-32b-instruct:free'
  | 'openrouter/qwen/qwen2.5-vl-72b-instruct'
  | 'openrouter/qwen/qwen2.5-vl-72b-instruct:free'
  | 'openrouter/qwen/qwen3-14b:free'
  | 'openrouter/qwen/qwen3-235b-a22b-07-25'
  | 'openrouter/qwen/qwen3-235b-a22b-07-25:free'
  | 'openrouter/qwen/qwen3-235b-a22b-thinking-2507'
  | 'openrouter/qwen/qwen3-235b-a22b:free'
  | 'openrouter/qwen/qwen3-30b-a3b-instruct-2507'
  | 'openrouter/qwen/qwen3-30b-a3b-thinking-2507'
  | 'openrouter/qwen/qwen3-30b-a3b:free'
  | 'openrouter/qwen/qwen3-32b:free'
  | 'openrouter/qwen/qwen3-8b:free'
  | 'openrouter/qwen/qwen3-coder'
  | 'openrouter/qwen/qwen3-coder-flash'
  | 'openrouter/qwen/qwen3-coder:exacto'
  | 'openrouter/qwen/qwen3-coder:free'
  | 'openrouter/qwen/qwen3-max'
  | 'openrouter/qwen/qwen3-next-80b-a3b-instruct'
  | 'openrouter/qwen/qwen3-next-80b-a3b-thinking'
  | 'openrouter/qwen/qwq-32b:free'
  // OpenRouter - Reka Models
  | 'openrouter/rekaai/reka-flash-3'
  // OpenRouter - Sarvam Models
  | 'openrouter/sarvamai/sarvam-m:free'
  // OpenRouter - THUDM Models
  | 'openrouter/thudm/glm-z1-32b:free'
  // OpenRouter - TNG Models
  | 'openrouter/tngtech/deepseek-r1t2-chimera:free'
  // OpenRouter - X-AI Models
  | 'openrouter/x-ai/grok-3'
  | 'openrouter/x-ai/grok-3-beta'
  | 'openrouter/x-ai/grok-3-mini'
  | 'openrouter/x-ai/grok-3-mini-beta'
  | 'openrouter/x-ai/grok-4'
  | 'openrouter/x-ai/grok-4-fast'
  | 'openrouter/x-ai/grok-4.1-fast'
  | 'openrouter/x-ai/grok-code-fast-1'
  // OpenRouter - Z-AI Models
  | 'openrouter/z-ai/glm-4.5'
  | 'openrouter/z-ai/glm-4.5-air'
  | 'openrouter/z-ai/glm-4.5-air:free'
  | 'openrouter/z-ai/glm-4.5v'
  | 'openrouter/z-ai/glm-4.6'
  | 'openrouter/z-ai/glm-4.6:exacto'
  | 'openrouter/z-ai/glm-4.7'
  // Amazon Bedrock - Claude Models
  | 'amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0'
  | 'amazon-bedrock/anthropic.claude-opus-4-5-20251101-v1:0'
  | 'amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0'
  | 'amazon-bedrock/anthropic.claude-sonnet-4-20250514-v1:0'
  | 'amazon-bedrock/anthropic.claude-opus-4-20250514-v1:0'
  | 'amazon-bedrock/anthropic.claude-3-7-sonnet-20250219-v1:0'
  | 'amazon-bedrock/anthropic.claude-3-5-sonnet-20241022-v2:0'
  | 'amazon-bedrock/anthropic.claude-3-opus-20240229-v1:0'
  // Amazon Bedrock - DeepSeek Models
  | 'amazon-bedrock/deepseek.r1-v1:0'
  | 'amazon-bedrock/deepseek.v3-v1:0'
  // Amazon Bedrock - Amazon Nova Models
  | 'amazon-bedrock/amazon.nova-premier-v1:0'
  | 'amazon-bedrock/amazon.nova-pro-v1:0'
  | 'amazon-bedrock/amazon.nova-lite-v1:0'
  // Amazon Bedrock - Meta Llama Models
  | 'amazon-bedrock/meta.llama4-maverick-17b-instruct-v1:0'
  | 'amazon-bedrock/meta.llama3-3-70b-instruct-v1:0'
  // Amazon Bedrock - Mistral Models
  | 'amazon-bedrock/mistral.mistral-large-2402-v1:0'
  // Amazon Bedrock - Qwen Models
  | 'amazon-bedrock/qwen.qwen3-coder-480b-a35b-v1:0'
  | 'amazon-bedrock/qwen.qwen3-235b-a22b-2507-v1:0';

/**
 * Provider type for OpenCode models
 */
export type OpencodeProvider =
  | 'opencode'
  | 'openrouter'
  | 'openrouter-anthropic'
  | 'openrouter-deepseek'
  | 'openrouter-google'
  | 'openrouter-openai'
  | 'openrouter-mistral'
  | 'openrouter-qwen'
  | 'openrouter-xai'
  | 'amazon-bedrock-anthropic'
  | 'amazon-bedrock-deepseek'
  | 'amazon-bedrock-amazon'
  | 'amazon-bedrock-meta'
  | 'amazon-bedrock-mistral'
  | 'amazon-bedrock-qwen';

/**
 * Friendly aliases mapped to full model IDs
 */
export const OPENCODE_MODEL_MAP: Record<string, OpencodeModelId> = {
  // OpenCode free tier aliases
  'big-pickle': 'opencode/big-pickle',
  pickle: 'opencode/big-pickle',
  'glm-free': 'opencode/glm-4.7-free',
  'gpt-nano': 'opencode/gpt-5-nano',
  nano: 'opencode/gpt-5-nano',
  'grok-code': 'opencode/grok-code',
  grok: 'opencode/grok-code',
  minimax: 'opencode/minimax-m2.1-free',

  // OpenRouter Claude aliases
  'openrouter-sonnet-4.5': 'openrouter/anthropic/claude-sonnet-4.5',
  'openrouter-opus-4.5': 'openrouter/anthropic/claude-opus-4.5',
  'openrouter-haiku-4.5': 'openrouter/anthropic/claude-haiku-4.5',

  // OpenRouter DeepSeek aliases
  'openrouter-deepseek': 'openrouter/deepseek/deepseek-chat-v3.1',
  'openrouter-r1': 'openrouter/deepseek/deepseek-r1:free',

  // Claude aliases (via Bedrock)
  'claude-sonnet-4.5': 'amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0',
  'sonnet-4.5': 'amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0',
  sonnet: 'amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0',
  'claude-opus-4.5': 'amazon-bedrock/anthropic.claude-opus-4-5-20251101-v1:0',
  'opus-4.5': 'amazon-bedrock/anthropic.claude-opus-4-5-20251101-v1:0',
  opus: 'amazon-bedrock/anthropic.claude-opus-4-5-20251101-v1:0',
  'claude-haiku-4.5': 'amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0',
  'haiku-4.5': 'amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0',
  haiku: 'amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0',

  // DeepSeek aliases
  'deepseek-r1': 'amazon-bedrock/deepseek.r1-v1:0',
  r1: 'amazon-bedrock/deepseek.r1-v1:0',
  'deepseek-v3': 'amazon-bedrock/deepseek.v3-v1:0',

  // Nova aliases
  'nova-premier': 'amazon-bedrock/amazon.nova-premier-v1:0',
  'nova-pro': 'amazon-bedrock/amazon.nova-pro-v1:0',
  nova: 'amazon-bedrock/amazon.nova-pro-v1:0',

  // Llama aliases
  llama4: 'amazon-bedrock/meta.llama4-maverick-17b-instruct-v1:0',
  'llama-4': 'amazon-bedrock/meta.llama4-maverick-17b-instruct-v1:0',
  llama3: 'amazon-bedrock/meta.llama3-3-70b-instruct-v1:0',

  // Qwen aliases
  qwen: 'amazon-bedrock/qwen.qwen3-coder-480b-a35b-v1:0',
  'qwen-coder': 'amazon-bedrock/qwen.qwen3-coder-480b-a35b-v1:0',
} as const;

/**
 * OpenCode model metadata
 */
export interface OpencodeModelConfig {
  id: OpencodeModelId;
  label: string;
  description: string;
  supportsVision: boolean;
  provider: OpencodeProvider;
  tier: 'free' | 'standard' | 'premium';
}

/**
 * Complete list of OpenCode model configurations
 */
export const OPENCODE_MODELS: OpencodeModelConfig[] = [
  // OpenCode Free Tier Models
  {
    id: 'opencode/big-pickle',
    label: 'Big Pickle',
    description: 'OpenCode free tier model - great for general coding',
    supportsVision: false,
    provider: 'opencode',
    tier: 'free',
  },
  {
    id: 'opencode/glm-4.7-free',
    label: 'GLM 4.7 Free',
    description: 'OpenCode free tier GLM model',
    supportsVision: false,
    provider: 'opencode',
    tier: 'free',
  },
  {
    id: 'opencode/gpt-5-nano',
    label: 'GPT-5 Nano',
    description: 'OpenCode free tier nano model - fast and lightweight',
    supportsVision: false,
    provider: 'opencode',
    tier: 'free',
  },
  {
    id: 'opencode/grok-code',
    label: 'Grok Code',
    description: 'OpenCode free tier Grok model for coding',
    supportsVision: false,
    provider: 'opencode',
    tier: 'free',
  },
  {
    id: 'opencode/minimax-m2.1-free',
    label: 'MiniMax M2.1 Free',
    description: 'OpenCode free tier MiniMax model',
    supportsVision: false,
    provider: 'opencode',
    tier: 'free',
  },

  // OpenRouter - Anthropic Claude Models
  {
    id: 'openrouter/anthropic/claude-sonnet-4.5',
    label: 'Claude Sonnet 4.5 (OpenRouter)',
    description: 'Claude Sonnet 4.5 via OpenRouter - fast and intelligent',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'premium',
  },
  {
    id: 'openrouter/anthropic/claude-opus-4.5',
    label: 'Claude Opus 4.5 (OpenRouter)',
    description: 'Most capable Claude via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'premium',
  },
  {
    id: 'openrouter/anthropic/claude-haiku-4.5',
    label: 'Claude Haiku 4.5 (OpenRouter)',
    description: 'Fastest Claude via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'standard',
  },
  {
    id: 'openrouter/anthropic/claude-sonnet-4',
    label: 'Claude Sonnet 4 (OpenRouter)',
    description: 'Claude Sonnet 4 via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'premium',
  },
  {
    id: 'openrouter/anthropic/claude-opus-4',
    label: 'Claude Opus 4 (OpenRouter)',
    description: 'Claude Opus 4 via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'premium',
  },
  {
    id: 'openrouter/anthropic/claude-3.7-sonnet',
    label: 'Claude 3.7 Sonnet (OpenRouter)',
    description: 'Claude 3.7 Sonnet via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'standard',
  },
  {
    id: 'openrouter/anthropic/claude-3.5-haiku',
    label: 'Claude 3.5 Haiku (OpenRouter)',
    description: 'Claude 3.5 Haiku via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-anthropic',
    tier: 'standard',
  },

  // OpenRouter - DeepSeek Models
  {
    id: 'openrouter/deepseek/deepseek-chat-v3.1',
    label: 'DeepSeek Chat V3.1 (OpenRouter)',
    description: 'DeepSeek Chat V3.1 via OpenRouter',
    supportsVision: false,
    provider: 'openrouter-deepseek',
    tier: 'standard',
  },
  {
    id: 'openrouter/deepseek/deepseek-r1:free',
    label: 'DeepSeek R1 Free (OpenRouter)',
    description: 'DeepSeek R1 reasoning model via OpenRouter - free tier',
    supportsVision: false,
    provider: 'openrouter-deepseek',
    tier: 'free',
  },
  {
    id: 'openrouter/deepseek/deepseek-r1-distill-llama-70b',
    label: 'DeepSeek R1 Distill Llama 70B (OpenRouter)',
    description: 'DeepSeek R1 distilled to Llama 70B via OpenRouter',
    supportsVision: false,
    provider: 'openrouter-deepseek',
    tier: 'standard',
  },
  {
    id: 'openrouter/deepseek/deepseek-v3.1-terminus',
    label: 'DeepSeek V3.1 Terminus (OpenRouter)',
    description: 'DeepSeek V3.1 Terminus via OpenRouter',
    supportsVision: false,
    provider: 'openrouter-deepseek',
    tier: 'standard',
  },

  // OpenRouter - Google Models
  {
    id: 'openrouter/google/gemini-2.5-flash',
    label: 'Gemini 2.5 Flash (OpenRouter)',
    description: 'Google Gemini 2.5 Flash via OpenRouter - fast and efficient',
    supportsVision: true,
    provider: 'openrouter-google',
    tier: 'standard',
  },
  {
    id: 'openrouter/google/gemini-2.5-pro',
    label: 'Gemini 2.5 Pro (OpenRouter)',
    description: 'Google Gemini 2.5 Pro via OpenRouter - most capable Gemini',
    supportsVision: true,
    provider: 'openrouter-google',
    tier: 'premium',
  },

  // OpenRouter - OpenAI Models
  {
    id: 'openrouter/openai/gpt-5',
    label: 'GPT-5 (OpenRouter)',
    description: 'OpenAI GPT-5 via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-openai',
    tier: 'premium',
  },
  {
    id: 'openrouter/openai/gpt-5.1',
    label: 'GPT-5.1 (OpenRouter)',
    description: 'OpenAI GPT-5.1 via OpenRouter',
    supportsVision: true,
    provider: 'openrouter-openai',
    tier: 'premium',
  },

  // Amazon Bedrock - Claude Models
  {
    id: 'amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0',
    label: 'Claude Sonnet 4.5 (Bedrock)',
    description: 'Latest Claude Sonnet via AWS Bedrock - fast and intelligent (default)',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-opus-4-5-20251101-v1:0',
    label: 'Claude Opus 4.5 (Bedrock)',
    description: 'Most capable Claude model via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-haiku-4-5-20251001-v1:0',
    label: 'Claude Haiku 4.5 (Bedrock)',
    description: 'Fastest Claude model via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'standard',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-sonnet-4-20250514-v1:0',
    label: 'Claude Sonnet 4 (Bedrock)',
    description: 'Claude Sonnet 4 via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-opus-4-20250514-v1:0',
    label: 'Claude Opus 4 (Bedrock)',
    description: 'Claude Opus 4 via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-3-7-sonnet-20250219-v1:0',
    label: 'Claude 3.7 Sonnet (Bedrock)',
    description: 'Claude 3.7 Sonnet via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'standard',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-3-5-sonnet-20241022-v2:0',
    label: 'Claude 3.5 Sonnet (Bedrock)',
    description: 'Claude 3.5 Sonnet v2 via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'standard',
  },
  {
    id: 'amazon-bedrock/anthropic.claude-3-opus-20240229-v1:0',
    label: 'Claude 3 Opus (Bedrock)',
    description: 'Claude 3 Opus via AWS Bedrock',
    supportsVision: true,
    provider: 'amazon-bedrock-anthropic',
    tier: 'premium',
  },

  // Amazon Bedrock - DeepSeek Models
  {
    id: 'amazon-bedrock/deepseek.r1-v1:0',
    label: 'DeepSeek R1 (Bedrock)',
    description: 'DeepSeek R1 reasoning model via AWS Bedrock - excellent for coding',
    supportsVision: false,
    provider: 'amazon-bedrock-deepseek',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/deepseek.v3-v1:0',
    label: 'DeepSeek V3 (Bedrock)',
    description: 'DeepSeek V3 via AWS Bedrock',
    supportsVision: false,
    provider: 'amazon-bedrock-deepseek',
    tier: 'standard',
  },

  // Amazon Bedrock - Amazon Nova Models
  {
    id: 'amazon-bedrock/amazon.nova-premier-v1:0',
    label: 'Amazon Nova Premier (Bedrock)',
    description: 'Amazon Nova Premier - most capable Nova model',
    supportsVision: true,
    provider: 'amazon-bedrock-amazon',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/amazon.nova-pro-v1:0',
    label: 'Amazon Nova Pro (Bedrock)',
    description: 'Amazon Nova Pro - balanced performance',
    supportsVision: true,
    provider: 'amazon-bedrock-amazon',
    tier: 'standard',
  },
  {
    id: 'amazon-bedrock/amazon.nova-lite-v1:0',
    label: 'Amazon Nova Lite (Bedrock)',
    description: 'Amazon Nova Lite - fast and efficient',
    supportsVision: true,
    provider: 'amazon-bedrock-amazon',
    tier: 'standard',
  },

  // Amazon Bedrock - Meta Llama Models
  {
    id: 'amazon-bedrock/meta.llama4-maverick-17b-instruct-v1:0',
    label: 'Llama 4 Maverick 17B (Bedrock)',
    description: 'Meta Llama 4 Maverick via AWS Bedrock',
    supportsVision: false,
    provider: 'amazon-bedrock-meta',
    tier: 'standard',
  },
  {
    id: 'amazon-bedrock/meta.llama3-3-70b-instruct-v1:0',
    label: 'Llama 3.3 70B (Bedrock)',
    description: 'Meta Llama 3.3 70B via AWS Bedrock',
    supportsVision: false,
    provider: 'amazon-bedrock-meta',
    tier: 'standard',
  },

  // Amazon Bedrock - Mistral Models
  {
    id: 'amazon-bedrock/mistral.mistral-large-2402-v1:0',
    label: 'Mistral Large (Bedrock)',
    description: 'Mistral Large via AWS Bedrock',
    supportsVision: false,
    provider: 'amazon-bedrock-mistral',
    tier: 'standard',
  },

  // Amazon Bedrock - Qwen Models
  {
    id: 'amazon-bedrock/qwen.qwen3-coder-480b-a35b-v1:0',
    label: 'Qwen3 Coder 480B (Bedrock)',
    description: 'Qwen3 Coder 480B via AWS Bedrock - excellent for coding',
    supportsVision: false,
    provider: 'amazon-bedrock-qwen',
    tier: 'premium',
  },
  {
    id: 'amazon-bedrock/qwen.qwen3-235b-a22b-2507-v1:0',
    label: 'Qwen3 235B (Bedrock)',
    description: 'Qwen3 235B via AWS Bedrock',
    supportsVision: false,
    provider: 'amazon-bedrock-qwen',
    tier: 'premium',
  },
] as OpencodeModelConfig[];

// Auto-generate and add remaining OpenRouter models
(() => {
  const definedIds = new Set(OPENCODE_MODELS.map((m) => m.id));

  // All OpenRouter model IDs from the type
  const allOpenRouterIds = [
    'openrouter/anthropic/claude-3.5-haiku',
    'openrouter/anthropic/claude-3.7-sonnet',
    'openrouter/anthropic/claude-opus-4.1',
    'openrouter/cognitivecomputations/dolphin3.0-mistral-24b',
    'openrouter/cognitivecomputations/dolphin3.0-r1-mistral-24b',
    'openrouter/deepseek/deepseek-chat-v3-0324',
    'openrouter/deepseek/deepseek-r1-0528-qwen3-8b:free',
    'openrouter/deepseek/deepseek-r1-0528:free',
    'openrouter/deepseek/deepseek-r1-distill-qwen-14b',
    'openrouter/deepseek/deepseek-v3-base:free',
    'openrouter/deepseek/deepseek-v3.1-terminus:exacto',
    'openrouter/deepseek/deepseek-v3.2',
    'openrouter/deepseek/deepseek-v3.2-speciale',
    'openrouter/featherless/qwerky-72b',
    'openrouter/google/gemini-2.0-flash-001',
    'openrouter/google/gemini-2.0-flash-exp:free',
    'openrouter/google/gemini-2.5-flash-lite',
    'openrouter/google/gemini-2.5-flash-lite-preview-09-2025',
    'openrouter/google/gemini-2.5-flash-preview-09-2025',
    'openrouter/google/gemini-2.5-pro-preview-05-06',
    'openrouter/google/gemini-2.5-pro-preview-06-05',
    'openrouter/google/gemini-3-flash-preview',
    'openrouter/google/gemini-3-pro-preview',
    'openrouter/google/gemma-2-9b-it:free',
    'openrouter/google/gemma-3-12b-it',
    'openrouter/google/gemma-3-27b-it',
    'openrouter/google/gemma-3n-e4b-it',
    'openrouter/google/gemma-3n-e4b-it:free',
    'openrouter/kwaipilot/kat-coder-pro:free',
    'openrouter/meta-llama/llama-3.2-11b-vision-instruct',
    'openrouter/meta-llama/llama-3.3-70b-instruct:free',
    'openrouter/meta-llama/llama-4-scout:free',
    'openrouter/microsoft/mai-ds-r1:free',
    'openrouter/minimax/minimax-01',
    'openrouter/minimax/minimax-m1',
    'openrouter/minimax/minimax-m2',
    'openrouter/minimax/minimax-m2.1',
    'openrouter/mistralai/codestral-2508',
    'openrouter/mistralai/devstral-2512',
    'openrouter/mistralai/devstral-2512:free',
    'openrouter/mistralai/devstral-medium-2507',
    'openrouter/mistralai/devstral-small-2505',
    'openrouter/mistralai/devstral-small-2505:free',
    'openrouter/mistralai/devstral-small-2507',
    'openrouter/mistralai/mistral-7b-instruct:free',
    'openrouter/mistralai/mistral-medium-3',
    'openrouter/mistralai/mistral-medium-3.1',
    'openrouter/mistralai/mistral-nemo:free',
    'openrouter/mistralai/mistral-small-3.1-24b-instruct',
    'openrouter/mistralai/mistral-small-3.2-24b-instruct',
    'openrouter/mistralai/mistral-small-3.2-24b-instruct:free',
    'openrouter/moonshotai/kimi-dev-72b:free',
    'openrouter/moonshotai/kimi-k2',
    'openrouter/moonshotai/kimi-k2-0905',
    'openrouter/moonshotai/kimi-k2-0905:exacto',
    'openrouter/moonshotai/kimi-k2-thinking',
    'openrouter/moonshotai/kimi-k2:free',
    'openrouter/nousresearch/deephermes-3-llama-3-8b-preview',
    'openrouter/nousresearch/hermes-4-405b',
    'openrouter/nousresearch/hermes-4-70b',
    'openrouter/nvidia/nemotron-nano-9b-v2',
    'openrouter/openai/gpt-4.1',
    'openrouter/openai/gpt-4.1-mini',
    'openrouter/openai/gpt-4o-mini',
    'openrouter/openai/gpt-5-codex',
    'openrouter/openai/gpt-5-image',
    'openrouter/openai/gpt-5-mini',
    'openrouter/openai/gpt-5-nano',
    'openrouter/openai/gpt-5-pro',
    'openrouter/openai/gpt-5.1-chat',
    'openrouter/openai/gpt-5.1-codex',
    'openrouter/openai/gpt-5.1-codex-mini',
    'openrouter/openai/gpt-5.2',
    'openrouter/openai/gpt-5.2-chat-latest',
    'openrouter/openai/gpt-5.2-pro',
    'openrouter/openai/gpt-oss-120b',
    'openrouter/openai/gpt-oss-120b:exacto',
    'openrouter/openai/gpt-oss-20b',
    'openrouter/openai/gpt-oss-safeguard-20b',
    'openrouter/openai/o4-mini',
    'openrouter/openrouter/sherlock-dash-alpha',
    'openrouter/openrouter/sherlock-think-alpha',
    'openrouter/qwen/qwen-2.5-coder-32b-instruct',
    'openrouter/qwen/qwen2.5-vl-32b-instruct:free',
    'openrouter/qwen/qwen2.5-vl-72b-instruct',
    'openrouter/qwen/qwen2.5-vl-72b-instruct:free',
    'openrouter/qwen/qwen3-14b:free',
    'openrouter/qwen/qwen3-235b-a22b-07-25',
    'openrouter/qwen/qwen3-235b-a22b-07-25:free',
    'openrouter/qwen/qwen3-235b-a22b-thinking-2507',
    'openrouter/qwen/qwen3-235b-a22b:free',
    'openrouter/qwen/qwen3-30b-a3b-instruct-2507',
    'openrouter/qwen/qwen3-30b-a3b-thinking-2507',
    'openrouter/qwen/qwen3-30b-a3b:free',
    'openrouter/qwen/qwen3-32b:free',
    'openrouter/qwen/qwen3-8b:free',
    'openrouter/qwen/qwen3-coder',
    'openrouter/qwen/qwen3-coder-flash',
    'openrouter/qwen/qwen3-coder:exacto',
    'openrouter/qwen/qwen3-coder:free',
    'openrouter/qwen/qwen3-max',
    'openrouter/qwen/qwen3-next-80b-a3b-instruct',
    'openrouter/qwen/qwen3-next-80b-a3b-thinking',
    'openrouter/qwen/qwq-32b:free',
    'openrouter/rekaai/reka-flash-3',
    'openrouter/sarvamai/sarvam-m:free',
    'openrouter/thudm/glm-z1-32b:free',
    'openrouter/tngtech/deepseek-r1t2-chimera:free',
    'openrouter/x-ai/grok-3',
    'openrouter/x-ai/grok-3-beta',
    'openrouter/x-ai/grok-3-mini',
    'openrouter/x-ai/grok-3-mini-beta',
    'openrouter/x-ai/grok-4',
    'openrouter/x-ai/grok-4-fast',
    'openrouter/x-ai/grok-4.1-fast',
    'openrouter/x-ai/grok-code-fast-1',
    'openrouter/z-ai/glm-4.5',
    'openrouter/z-ai/glm-4.5-air',
    'openrouter/z-ai/glm-4.5-air:free',
    'openrouter/z-ai/glm-4.5v',
    'openrouter/z-ai/glm-4.6',
    'openrouter/z-ai/glm-4.6:exacto',
    'openrouter/z-ai/glm-4.7',
  ] as const;

  allOpenRouterIds.forEach((id) => {
    if (definedIds.has(id)) return;

    const name = id.split('/').pop() || id;
    const label = name
      .split('-')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .replace(':free', ' (Free)')
      .replace(':exacto', ' (Exacto)');

    let provider: OpencodeProvider = 'openrouter';
    if (id.includes('/anthropic/')) provider = 'openrouter-anthropic';
    else if (id.includes('/deepseek/')) provider = 'openrouter-deepseek';
    else if (id.includes('/google/')) provider = 'openrouter-google';
    else if (id.includes('/openai/')) provider = 'openrouter-openai';
    else if (id.includes('/mistralai/')) provider = 'openrouter-mistral';
    else if (id.includes('/qwen/')) provider = 'openrouter-qwen';
    else if (id.includes('/x-ai/')) provider = 'openrouter-xai';

    const tier: 'free' | 'standard' | 'premium' = id.includes(':free')
      ? 'free'
      : id.includes('opus') ||
          id.includes('gpt-5') ||
          id.includes('gemini-2.5-pro') ||
          id.includes('o4')
        ? 'premium'
        : 'standard';

    OPENCODE_MODELS.push({
      id: id as OpencodeModelId,
      label,
      description: 'Model via OpenRouter',
      supportsVision: false,
      provider,
      tier,
    });
  });
})();

/**
 * Complete model configuration map indexed by model ID
 */
export const OPENCODE_MODEL_CONFIG_MAP: Record<OpencodeModelId, OpencodeModelConfig> =
  OPENCODE_MODELS.reduce(
    (acc, config) => {
      acc[config.id] = config;
      return acc;
    },
    {} as Record<OpencodeModelId, OpencodeModelConfig>
  );

/**
 * Default OpenCode model - Claude Sonnet 4.5 via Bedrock
 */
export const DEFAULT_OPENCODE_MODEL: OpencodeModelId =
  'amazon-bedrock/anthropic.claude-sonnet-4-5-20250929-v1:0';

/**
 * Helper: Get display name for model
 */
export function getOpencodeModelLabel(modelId: OpencodeModelId): string {
  return OPENCODE_MODEL_CONFIG_MAP[modelId]?.label ?? modelId;
}

/**
 * Helper: Get all OpenCode model IDs
 */
export function getAllOpencodeModelIds(): OpencodeModelId[] {
  return OPENCODE_MODELS.map((config) => config.id);
}

/**
 * Helper: Check if OpenCode model supports vision
 */
export function opencodeModelSupportsVision(modelId: OpencodeModelId): boolean {
  return OPENCODE_MODEL_CONFIG_MAP[modelId]?.supportsVision ?? false;
}

/**
 * Helper: Get the provider for a model
 */
export function getOpencodeModelProvider(modelId: OpencodeModelId): OpencodeProvider {
  return OPENCODE_MODEL_CONFIG_MAP[modelId]?.provider ?? 'opencode';
}

/**
 * Helper: Resolve an alias or partial model ID to a full model ID
 */
export function resolveOpencodeModelId(input: string): OpencodeModelId | undefined {
  // Check if it's already a valid model ID
  if (OPENCODE_MODEL_CONFIG_MAP[input as OpencodeModelId]) {
    return input as OpencodeModelId;
  }

  // Check alias map
  const normalized = input.toLowerCase();
  return OPENCODE_MODEL_MAP[normalized];
}

/**
 * Helper: Check if a string is a valid OpenCode model ID
 */
export function isOpencodeModelId(value: string): value is OpencodeModelId {
  return value in OPENCODE_MODEL_CONFIG_MAP;
}

/**
 * Helper: Get models filtered by provider
 */
export function getOpencodeModelsByProvider(provider: OpencodeProvider): OpencodeModelConfig[] {
  return OPENCODE_MODELS.filter((config) => config.provider === provider);
}

/**
 * Helper: Get models filtered by tier
 */
export function getOpencodeModelsByTier(
  tier: 'free' | 'standard' | 'premium'
): OpencodeModelConfig[] {
  return OPENCODE_MODELS.filter((config) => config.tier === tier);
}

/**
 * Helper: Get free tier models
 */
export function getOpencodeFreeModels(): OpencodeModelConfig[] {
  return getOpencodeModelsByTier('free');
}
