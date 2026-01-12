import * as React from 'react';
import { Globe, ChevronDown, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';
import { useSetupStore } from '@/store/setup-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import type { ProviderPreset } from '@automaker/types';

interface ProviderOption {
  id: ProviderPreset | 'global';
  label: string;
  description: string;
}

const PROVIDER_OPTIONS: ProviderOption[] = [
  {
    id: 'global',
    label: 'Use Global Settings',
    description: 'Uses the models configured in Model Defaults',
  },
  { id: 'claude', label: 'Claude', description: 'Anthropic Claude models (Sonnet, Opus, Haiku)' },
  { id: 'cursor', label: 'Cursor', description: 'Cursor-optimized Claude models' },
  { id: 'codex', label: 'Codex', description: 'OpenAI Codex models (GPT-5 series)' },
  { id: 'opencode', label: 'OpenCode', description: 'Free OpenCode models' },
  { id: 'openrouter', label: 'OpenRouter', description: 'Best OpenRouter models (paid)' },
  {
    id: 'openrouter-free',
    label: 'OpenRouter FREE',
    description: 'Free OpenRouter models (zero cost)',
  },
];

export function ProjectProviderSection() {
  const currentProject = useAppStore((state) => state.currentProject);
  const setProjectProvider = useAppStore((state) => state.setProjectProvider);
  const getProjectProvider = useAppStore((state) => state.getProjectProvider);
  const apiKeys = useAppStore((state) => state.apiKeys);

  // Get provider installation status from setup store
  const claudeCliStatus = useSetupStore((state) => state.claudeCliStatus);
  const cursorCliStatus = useSetupStore((state) => state.cursorCliStatus);
  const codexCliStatus = useSetupStore((state) => state.codexCliStatus);
  const opencodeCliStatus = useSetupStore((state) => state.opencodeCliStatus);

  // Determine which providers are available
  const isClaudeAvailable = claudeCliStatus?.installed === true || !!apiKeys?.anthropic;
  const isCursorAvailable = cursorCliStatus?.installed === true;
  const isCodexAvailable = codexCliStatus?.installed === true && !!apiKeys?.openai;
  const isOpencodeAvailable = opencodeCliStatus?.installed === true;

  // Get current provider for this project
  const currentProvider = currentProject?.path
    ? getProjectProvider(currentProject.path)
    : undefined;

  const isProviderAvailable = (providerId: ProviderPreset | 'global'): boolean => {
    if (providerId === 'global') return true;
    switch (providerId) {
      case 'claude':
        return isClaudeAvailable;
      case 'cursor':
        return isCursorAvailable;
      case 'codex':
        return isCodexAvailable;
      case 'opencode':
      case 'openrouter':
      case 'openrouter-free':
        return isOpencodeAvailable;
      default:
        return false;
    }
  };

  const handleProviderChange = async (providerId: ProviderPreset | 'global') => {
    if (!currentProject?.path) return;

    const newProvider = providerId === 'global' ? undefined : providerId;
    setProjectProvider(currentProject.path, newProvider);

    const label = PROVIDER_OPTIONS.find((p) => p.id === providerId)?.label || providerId;
    toast.success(`Project provider set to ${label}`);
  };

  const getCurrentProviderLabel = () => {
    if (!currentProvider) return 'Global Settings';
    return PROVIDER_OPTIONS.find((p) => p.id === currentProvider)?.label || currentProvider;
  };

  if (!currentProject) {
    return (
      <div
        className={cn(
          'rounded-2xl overflow-hidden',
          'border border-border/50',
          'bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl',
          'shadow-sm shadow-black/5'
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Info className="w-5 h-5" />
            <p className="text-sm">Select a project to configure its provider</p>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-500/20">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                  Project Provider
                </h2>
                {currentProvider && (
                  <Badge variant="secondary" className="text-xs">
                    {getCurrentProviderLabel()}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground/80">
                Choose which AI provider to use for{' '}
                <span className="font-medium">{currentProject.name}</span>
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                {getCurrentProviderLabel()}
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Select Provider for this Project</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PROVIDER_OPTIONS.map((option) => {
                const isAvailable = isProviderAvailable(option.id);
                const isActive =
                  option.id === 'global' ? !currentProvider : currentProvider === option.id;

                return (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => isAvailable && handleProviderChange(option.id)}
                    disabled={!isAvailable}
                    className={cn(
                      'flex flex-col items-start py-2',
                      !isAvailable && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{option.label}</span>
                      {isActive && <Check className="w-4 h-4 text-green-500" />}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {!isAvailable ? 'Not configured' : option.description}
                    </span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-border/30 bg-muted/10">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>How it works:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Global Settings:</strong> Uses the models configured in Model Defaults
                section
              </li>
              <li>
                <strong>Specific Provider:</strong> Uses the preset models for that provider for all
                tasks in this project
              </li>
            </ul>
            <p className="mt-2 text-xs">
              This setting is saved per-project and persists across sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
