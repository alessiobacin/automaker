import { Button } from '@/components/ui/button';
import { Terminal, CheckCircle2, AlertCircle, RefreshCw, XCircle, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { CliStatus } from '../shared/types';
import type { ClaudeAuthStatus } from '@/store/setup-store';

// Default install commands for Claude CLI
const DEFAULT_CLAUDE_INSTALL_COMMANDS = {
  npm: 'npm install -g @anthropic-ai/claude-code',
  macos: 'brew install anthropics/claude/claude-code',
  windows: 'npm install -g @anthropic-ai/claude-code',
};

interface CliStatusProps {
  status: CliStatus | null;
  authStatus?: ClaudeAuthStatus | null;
  isChecking: boolean;
  onRefresh: () => void;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-5 w-5 shrink-0 opacity-60 hover:opacity-100"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
    </Button>
  );
}

function getAuthMethodLabel(method: string): string {
  switch (method) {
    case 'oauth_token':
      return 'OAuth Token (Subscription)';
    case 'oauth_token_env':
      return 'OAuth Token (Environment)';
    case 'api_key':
      return 'API Key';
    case 'api_key_env':
      return 'API Key (Environment)';
    case 'credentials_file':
      return 'Credentials File';
    case 'cli_authenticated':
      return 'CLI Authentication';
    default:
      return method || 'Unknown';
  }
}

function SkeletonPulse({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-muted/50 rounded', className)} />;
}

function ClaudeCliStatusSkeleton() {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        'border border-border/50',
        'bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl',
        'shadow-sm shadow-black/5'
      )}
    >
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <SkeletonPulse className="w-9 h-9 rounded-xl" />
            <SkeletonPulse className="h-6 w-36" />
          </div>
          <SkeletonPulse className="w-9 h-9 rounded-lg" />
        </div>
        <div className="ml-12">
          <SkeletonPulse className="h-4 w-80" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        {/* Installation status skeleton */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-muted/10">
          <SkeletonPulse className="w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-40" />
            <SkeletonPulse className="h-3 w-32" />
            <SkeletonPulse className="h-3 w-48" />
          </div>
        </div>
        {/* Auth status skeleton */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-muted/10">
          <SkeletonPulse className="w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-28" />
            <SkeletonPulse className="h-3 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClaudeCliStatus({ status, authStatus, isChecking, onRefresh }: CliStatusProps) {
  if (!status) return <ClaudeCliStatusSkeleton />;

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        'border border-border/50',
        'bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl',
        'shadow-sm shadow-black/5'
      )}
    >
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center border border-brand-500/20">
              <Terminal className="w-5 h-5 text-brand-500" />
            </div>
            <h2 className="text-lg font-semibold text-foreground tracking-tight">
              Claude Code CLI
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={isChecking}
            data-testid="refresh-claude-cli"
            title="Refresh Claude CLI detection"
            className={cn(
              'h-9 w-9 rounded-lg',
              'hover:bg-accent/50 hover:scale-105',
              'transition-all duration-200'
            )}
          >
            <RefreshCw className={cn('w-4 h-4', isChecking && 'animate-spin')} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground/80 ml-12">
          Claude Code CLI provides better performance for long-running tasks, especially with
          ultrathink.
        </p>
      </div>
      <div className="p-6 space-y-4">
        {status.success && status.status === 'installed' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20 shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-emerald-400">Claude Code CLI Installed</p>
                <div className="text-xs text-emerald-400/70 mt-1.5 space-y-0.5">
                  {status.method && (
                    <p>
                      Method: <span className="font-mono">{status.method}</span>
                    </p>
                  )}
                  {status.version && (
                    <p>
                      Version: <span className="font-mono">{status.version}</span>
                    </p>
                  )}
                  {status.path && (
                    <p className="truncate" title={status.path}>
                      Path: <span className="font-mono text-[10px]">{status.path}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Authentication Status */}
            {authStatus?.authenticated ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-400">Authenticated</p>
                  <div className="text-xs text-emerald-400/70 mt-1.5">
                    <p>
                      Method:{' '}
                      <span className="font-mono">{getAuthMethodLabel(authStatus.method)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center border border-amber-500/20 shrink-0 mt-0.5">
                  <XCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-400">Not Authenticated</p>
                  <p className="text-xs text-amber-400/70 mt-1">
                    Run <code className="font-mono bg-amber-500/10 px-1 rounded">claude login</code>{' '}
                    or set an API key to authenticate.
                  </p>
                </div>
              </div>
            )}

            {status.recommendation && (
              <p className="text-xs text-muted-foreground/70 ml-1">{status.recommendation}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center border border-amber-500/20 shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-400">Claude Code CLI Not Detected</p>
                <p className="text-xs text-amber-400/70 mt-1">
                  {status.recommendation ||
                    'Consider installing Claude Code CLI for optimal performance with ultrathink.'}
                </p>
              </div>
            </div>
            {/* Use provided commands or fallback to defaults */}
            {(() => {
              const commands = status.installCommands || DEFAULT_CLAUDE_INSTALL_COMMANDS;
              return (
                <div className="space-y-3">
                  <p className="text-xs font-medium text-foreground/80">Installation Commands:</p>
                  <div className="space-y-2">
                    {commands.npm && (
                      <div className="p-3 rounded-xl bg-accent/30 border border-border/50">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            npm (All Platforms)
                          </p>
                          <CopyButton text={commands.npm} />
                        </div>
                        <code className="text-xs text-foreground/80 font-mono break-all">
                          {commands.npm}
                        </code>
                      </div>
                    )}
                    {commands.macos && (
                      <div className="p-3 rounded-xl bg-accent/30 border border-border/50">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            macOS (Homebrew)
                          </p>
                          <CopyButton text={commands.macos} />
                        </div>
                        <code className="text-xs text-foreground/80 font-mono break-all">
                          {commands.macos}
                        </code>
                      </div>
                    )}
                    {commands.windows && (
                      <div className="p-3 rounded-xl bg-accent/30 border border-border/50">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            Windows
                          </p>
                          <CopyButton text={commands.windows} />
                        </div>
                        <code className="text-xs text-foreground/80 font-mono break-all">
                          {commands.windows}
                        </code>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Then authenticate:{' '}
                    <code className="font-mono bg-muted px-1 rounded">claude login</code>
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
