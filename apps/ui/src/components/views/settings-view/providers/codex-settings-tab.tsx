import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getHttpApiClient } from '@/lib/http-api-client';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, RefreshCw, Key, Terminal, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const apiKeys = useAppStore((state) => state.apiKeys);
  const setApiKeys = useAppStore((state) => state.setApiKeys);

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

  const handleSaveApiKey = async () => {
    if (!apiKeyInput.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setIsSaving(true);
    try {
      const api = getHttpApiClient();
      await api.setup.storeApiKey('openai', apiKeyInput.trim());
      setApiKeys({ openai: apiKeyInput.trim() });
      setApiKeyInput('');
      toast.success('OpenAI API key saved successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to save API key:', error);
      toast.error('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveApiKey = async () => {
    setIsSaving(true);
    try {
      const api = getHttpApiClient();
      await api.setup.deleteApiKey('openai');
      setApiKeys({ openai: '' });
      toast.success('OpenAI API key removed');
      await loadData();
    } catch (error) {
      console.error('Failed to remove API key:', error);
      toast.error('Failed to remove API key');
    } finally {
      setIsSaving(false);
    }
  };

  const hasApiKey = !!apiKeys?.openai || status?.hasApiKey;

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
      <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl shadow-sm shadow-black/5">
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                hasApiKey ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
              )}
            >
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                OpenAI API Key
              </h3>
              <p className="text-sm text-muted-foreground/80">
                {hasApiKey ? 'API key configured' : 'Required for Codex CLI'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {hasApiKey ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">OpenAI API key is configured</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveApiKey}
                disabled={isSaving}
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              >
                Remove API Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="openai-api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSaveApiKey} disabled={isSaving || !apiKeyInput.trim()}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Get your API key from{' '}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  OpenAI Platform <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Installation Instructions */}
      {!status?.installed && (
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl shadow-sm shadow-black/5">
          <div className="p-6 border-b border-border/50 bg-gradient-to-r from-transparent via-accent/5 to-transparent">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">Installation</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Codex is OpenAI&apos;s official CLI for agentic coding with GPT models.
            </p>
            <div className="p-4 rounded-xl border border-border/30 bg-muted/10">
              <p className="text-sm font-medium text-foreground mb-2">Install via npm:</p>
              <code className="text-xs bg-muted px-2 py-1 rounded block">
                npm install -g @openai/codex
              </code>
            </div>
            <div className="p-4 rounded-xl border border-border/30 bg-muted/10">
              <p className="text-sm font-medium text-foreground mb-2">Then authenticate:</p>
              <code className="text-xs bg-muted px-2 py-1 rounded block">codex login</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodexSettingsTab;
