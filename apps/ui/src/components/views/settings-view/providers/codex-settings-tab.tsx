import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getHttpApiClient } from '@/lib/http-api-client';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Check, X, RefreshCw, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CliInstallCommands, CODEX_INSTALL_COMMANDS } from '../cli-status/cli-install-commands';
import { ProviderApiKeyField } from './provider-api-key-field';

interface CodexStatus {
  installed: boolean;
  version?: string;
  path?: string;
  hasApiKey?: boolean;
  auth?: {
    authenticated: boolean;
    method: string;
  };
}

export function CodexSettingsTab() {
  const [status, setStatus] = useState<CodexStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKeys = useAppStore((state) => state.apiKeys);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const api = getHttpApiClient();
      const result = await api.setup.getCodexStatus();
      if (result.success) {
        setStatus({
          installed: result.installed ?? false,
          version: result.version,
          path: result.path,
          hasApiKey: !!apiKeys?.openai,
          auth: result.auth,
        });
      }
    } catch (error) {
      console.error('Failed to load Codex status:', error);
      toast.error('Failed to load Codex status');
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
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl shadow-sm shadow-black/5 animate-pulse">
          <div className="p-6 space-y-4">
            <div className="h-6 bg-muted/50 rounded w-1/3" />
            <div className="h-4 bg-muted/30 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CLI Status Card */}
      <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl shadow-sm shadow-black/5">
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  status?.installed
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                )}
              >
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  Codex CLI Status
                </h3>
                <p className="text-sm text-muted-foreground/80">
                  {status?.installed ? `Version ${status.version}` : 'Not installed'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={loadData} disabled={isLoading}>
              <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {status?.installed ? (
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">
                Codex CLI installed at{' '}
                <code className="text-xs bg-muted px-1 rounded">{status.path}</code>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">Codex CLI not found</span>
            </div>
          )}

          {status?.auth?.authenticated && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-muted-foreground">Authenticated via {status.auth.method}</span>
            </div>
          )}
        </div>
      </div>

      {/* API Key Configuration */}
      <ProviderApiKeyField
        provider="openai"
        label="OpenAI API Key"
        placeholder="sk-..."
        description="Required for Codex CLI. Get your key at"
        linkHref="https://platform.openai.com/api-keys"
        linkText="OpenAI Platform"
      />

      {/* Installation Instructions */}
      {!status?.installed && (
        <CliInstallCommands
          providerName="Codex CLI"
          description="OpenAI's official CLI for agentic coding with GPT models"
          commands={CODEX_INSTALL_COMMANDS}
          authCommand="codex login"
          docsUrl="https://github.com/openai/codex"
        />
      )}
    </div>
  );
}

export default CodexSettingsTab;
