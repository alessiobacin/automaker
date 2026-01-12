import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getHttpApiClient } from '@/lib/http-api-client';
import { OpenCodeCliStatus, OpenCodeCliStatusSkeleton } from '../cli-status/opencode-cli-status';

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

export function OpenCodeSettingsTab() {
  const [status, setStatus] = useState<OpenCodeStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const api = getHttpApiClient();
      const result = await api.setup.getOpenCodeStatus();
      if (result.success) {
        setStatus({
          installed: result.installed ?? false,
          version: result.version,
          path: result.path,
          auth: result.auth,
        });
      }
    } catch (error) {
      console.error('Failed to load OpenCode status:', error);
      toast.error('Failed to load OpenCode status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <OpenCodeCliStatusSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CLI Status */}
      <OpenCodeCliStatus status={status} isChecking={isLoading} onRefresh={loadData} />

      {/* Provider Info */}
      {status?.installed && status?.auth?.authenticated && (
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl shadow-sm shadow-black/5">
          <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              Available Providers
            </h3>
            <p className="text-sm text-muted-foreground/80">
              Configure models in Model Defaults section
            </p>
          </div>
          <div className="p-6">
            <div className="grid gap-3">
              {status.auth.providers.map((provider) => (
                <div
                  key={provider}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-muted/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground capitalize">{provider}</p>
                    <p className="text-sm text-muted-foreground">
                      {provider === 'anthropic' && 'Claude models available'}
                      {provider === 'openai' && 'GPT models available'}
                      {provider === 'openrouter' && 'Multiple providers via OpenRouter'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Installation Instructions */}
      {!status?.installed && (
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl shadow-sm shadow-black/5">
          <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">Installation</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              OpenCode is a multi-provider CLI that supports Anthropic, OpenAI, and OpenRouter.
            </p>
            <div className="p-4 rounded-xl border border-border/30 bg-muted/10">
              <p className="text-sm font-medium text-foreground mb-2">Install via Go:</p>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                go install github.com/opencode-ai/opencode@latest
              </code>
            </div>
            <div className="p-4 rounded-xl border border-border/30 bg-muted/10">
              <p className="text-sm font-medium text-foreground mb-2">Or via Homebrew:</p>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                brew install opencode-ai/tap/opencode
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenCodeSettingsTab;
