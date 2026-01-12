import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { useSetupStore } from '@/store/setup-store';
import { getElectronAPI } from '@/lib/electron';
import { toast } from 'sonner';
import { Key, Eye, EyeOff, Loader2, CheckCircle2, Trash2, ExternalLink } from 'lucide-react';

interface ProviderApiKeyFieldProps {
  provider: 'anthropic' | 'openai' | 'openrouter';
  label: string;
  placeholder: string;
  description?: string;
  linkHref?: string;
  linkText?: string;
}

export function ProviderApiKeyField({
  provider,
  label,
  placeholder,
  description,
  linkHref,
  linkText,
}: ProviderApiKeyFieldProps) {
  const { apiKeys, setApiKeys } = useAppStore();
  const { claudeAuthStatus, setClaudeAuthStatus } = useSetupStore();

  const storedKey = apiKeys[provider as keyof typeof apiKeys] || '';
  const [inputValue, setInputValue] = useState('');
  const [showValue, setShowValue] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasStoredKey = !!storedKey;
  const displayValue = hasStoredKey ? '••••••••••••••••' : inputValue;

  // Save API key
  const handleSave = useCallback(async () => {
    if (!inputValue) return;

    setIsSaving(true);
    try {
      const api = getElectronAPI();
      if (!api.setup?.storeApiKey) {
        toast.error('Save API not available');
        return;
      }

      const result = await api.setup.storeApiKey(inputValue, provider);
      if (result.success) {
        setApiKeys({ ...apiKeys, [provider]: inputValue });
        setInputValue('');
        toast.success(`${label} saved`);

        // Update auth status for anthropic
        if (provider === 'anthropic') {
          setClaudeAuthStatus({
            authenticated: true,
            method: 'api_key',
            hasCredentialsFile: claudeAuthStatus?.hasCredentialsFile || false,
          });
        }
      } else {
        toast.error(result.error || 'Failed to save API key');
      }
    } catch {
      toast.error('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  }, [inputValue, provider, label, apiKeys, setApiKeys, claudeAuthStatus, setClaudeAuthStatus]);

  // Delete API key
  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      const api = getElectronAPI();
      if (!api.setup?.deleteApiKey) {
        toast.error('Delete API not available');
        return;
      }

      const result = await api.setup.deleteApiKey(provider);
      if (result.success) {
        setApiKeys({ ...apiKeys, [provider]: '' });
        toast.success(`${label} deleted`);

        // Update auth status for anthropic
        if (provider === 'anthropic') {
          setClaudeAuthStatus({
            authenticated: false,
            method: 'none',
            hasCredentialsFile: claudeAuthStatus?.hasCredentialsFile || false,
          });
        }
      } else {
        toast.error(result.error || 'Failed to delete API key');
      }
    } catch {
      toast.error('Failed to delete API key');
    } finally {
      setIsDeleting(false);
    }
  }, [provider, label, apiKeys, setApiKeys, claudeAuthStatus, setClaudeAuthStatus]);

  return (
    <div className="space-y-3 p-4 rounded-xl border border-border/50 bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-muted-foreground" />
          <Label className="text-sm font-medium">{label}</Label>
          {hasStoredKey && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Configured
            </span>
          )}
        </div>
        {hasStoredKey && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showValue ? 'text' : 'password'}
            placeholder={hasStoredKey ? displayValue : placeholder}
            value={hasStoredKey ? '' : inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={hasStoredKey}
            className="pr-10"
          />
          {!hasStoredKey && inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowValue(!showValue)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              {showValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {!hasStoredKey && (
          <Button
            onClick={handleSave}
            disabled={!inputValue || isSaving}
            size="sm"
            className="min-w-[80px]"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
          </Button>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}{' '}
          {linkHref && linkText && (
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 hover:underline inline-flex items-center gap-1"
            >
              {linkText}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </p>
      )}
    </div>
  );
}
