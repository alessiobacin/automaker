import { Button } from '@/components/ui/button';
import {
  Code2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  XCircle,
  Copy,
  Check,
  Terminal,
  Apple,
  Monitor,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Default install commands for OpenCode CLI
const OPENCODE_INSTALL_COMMANDS = [
  {
    label: 'macOS (Homebrew)',
    command: 'brew install opencode-ai/tap/opencode',
    platform: 'macos' as const,
  },
  {
    label: 'Go Install (All)',
    command: 'go install github.com/opencode-ai/opencode@latest',
    platform: 'all' as const,
  },
  {
    label: 'Windows (Scoop)',
    command:
      'scoop bucket add opencode https://github.com/opencode-ai/scoop-bucket.git && scoop install opencode',
    platform: 'windows' as const,
  },
];

// Detect OS
function getOS(): 'macos' | 'windows' | 'linux' | 'unknown' {
  if (typeof navigator === 'undefined') return 'unknown';
  const platform = navigator.platform?.toLowerCase() || '';
  const userAgent = navigator.userAgent?.toLowerCase() || '';

  if (platform.includes('mac') || userAgent.includes('mac')) return 'macos';
  if (platform.includes('win') || userAgent.includes('win')) return 'windows';
  if (platform.includes('linux') || userAgent.includes('linux')) return 'linux';
  return 'unknown';
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

function PlatformIcon({ platform }: { platform?: string }) {
  switch (platform) {
    case 'macos':
      return <Apple className="w-3.5 h-3.5" />;
    case 'windows':
      return <Monitor className="w-3.5 h-3.5" />;
    default:
      return <Terminal className="w-3.5 h-3.5" />;
  }
}

interface OpenCodeStatus {
  installed: boolean;
  version?: string;
  path?: string;
  auth?: {
    authenticated: boolean;
    method: string;
    providers: string[];
  };
}

interface OpenCodeCliStatusProps {
  status: OpenCodeStatus | null;
  isChecking: boolean;
  onRefresh: () => void;
}

function SkeletonPulse({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-muted/50 rounded', className)} />;
}

export function OpenCodeCliStatusSkeleton() {
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
            <SkeletonPulse className="h-6 w-28" />
          </div>
          <SkeletonPulse className="w-9 h-9 rounded-lg" />
        </div>
        <div className="ml-12">
          <SkeletonPulse className="h-4 w-72" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        {/* Installation status skeleton */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-muted/10">
          <SkeletonPulse className="w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-36" />
            <SkeletonPulse className="h-3 w-28" />
          </div>
        </div>
        {/* Auth status skeleton */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-muted/10">
          <SkeletonPulse className="w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <SkeletonPulse className="h-4 w-28" />
            <SkeletonPulse className="h-3 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OpenCodeCliStatus({ status, isChecking, onRefresh }: OpenCodeCliStatusProps) {
  const isInstalled = status?.installed ?? false;
  const isAuthenticated = status?.auth?.authenticated ?? false;
  const providers = status?.auth?.providers ?? [];

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        'border border-border/50',
        'bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl',
        'shadow-sm shadow-black/5'
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center border border-green-500/20">
              <Code2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground tracking-tight">OpenCode CLI</h2>
              <p className="text-sm text-muted-foreground/80">
                Multi-provider CLI for AI coding assistance
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={isChecking}
            className="h-9 w-9"
          >
            <RefreshCw className={cn('w-4 h-4', isChecking && 'animate-spin')} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Installation Status */}
        <div
          className={cn(
            'flex items-center gap-3 p-4 rounded-xl border',
            isInstalled
              ? 'border-green-500/30 bg-green-500/5'
              : 'border-destructive/30 bg-destructive/5'
          )}
        >
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              isInstalled ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'
            )}
          >
            {isInstalled ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">
              {isInstalled ? 'Installed' : 'Not Installed'}
            </p>
            {status?.version && (
              <p className="text-sm text-muted-foreground">Version: {status.version}</p>
            )}
          </div>
        </div>

        {/* Installation Commands when not installed */}
        {!isInstalled && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground/80">Installation Commands:</p>
            <div className="space-y-2">
              {OPENCODE_INSTALL_COMMANDS.map((cmd, idx) => {
                const currentOS = getOS();
                const isCurrentOS = cmd.platform === currentOS || cmd.platform === 'all';
                return (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 rounded-xl border',
                      isCurrentOS
                        ? 'bg-accent/40 border-primary/30'
                        : 'bg-accent/20 border-border/30'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                        <PlatformIcon platform={cmd.platform} />
                        <span className="font-medium">{cmd.label}</span>
                        {isCurrentOS && currentOS !== 'unknown' && (
                          <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px]">
                            Your OS
                          </span>
                        )}
                      </div>
                      <CopyButton text={cmd.command} />
                    </div>
                    <code className="text-xs text-foreground/80 font-mono block break-all">
                      {cmd.command}
                    </code>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Then authenticate:{' '}
              <code className="font-mono bg-muted px-1 rounded">opencode auth login</code>
            </p>
          </div>
        )}

        {/* Authentication Status */}
        {isInstalled && (
          <div
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl border',
              isAuthenticated
                ? 'border-green-500/30 bg-green-500/5'
                : 'border-yellow-500/30 bg-yellow-500/5'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                isAuthenticated
                  ? 'bg-green-500/10 text-green-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              )}
            >
              {isAuthenticated ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </p>
              {isAuthenticated && providers.length > 0 && (
                <p className="text-sm text-muted-foreground">Providers: {providers.join(', ')}</p>
              )}
              {!isAuthenticated && (
                <p className="text-sm text-muted-foreground">
                  Set ANTHROPIC_API_KEY, OPENAI_API_KEY, or OPENROUTER_API_KEY
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
