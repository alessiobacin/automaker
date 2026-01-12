import { Button } from '@/components/ui/button';
import { Code2, CheckCircle2, AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            {!isInstalled && (
              <p className="text-sm text-muted-foreground">
                Install via:{' '}
                <code className="text-xs bg-muted px-1 rounded">
                  go install github.com/opencode-ai/opencode@latest
                </code>
              </p>
            )}
          </div>
        </div>

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
