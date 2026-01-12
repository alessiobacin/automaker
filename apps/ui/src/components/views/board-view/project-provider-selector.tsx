import * as React from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';
import { useSetupStore } from '@/store/setup-store';
import { Button } from '@/components/ui/button';
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
  shortLabel?: string;
}

const PROVIDER_OPTIONS: ProviderOption[] = [
  { id: 'global', label: 'Global Settings', shortLabel: 'Global' },
  { id: 'claude', label: 'Claude Code', shortLabel: 'Claude' },
  { id: 'cursor', label: 'Cursor', shortLabel: 'Cursor' },
  { id: 'codex', label: 'Codex', shortLabel: 'Codex' },
  { id: 'opencode', label: 'OpenCode', shortLabel: 'OpenCode' },
  { id: 'openrouter', label: 'OpenRouter', shortLabel: 'OpenRouter' },
  { id: 'openrouter-free', label: 'OpenRouter FREE', shortLabel: 'OR Free' },
];

export function ProjectProviderSelector() {
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
    toast.success(`Provider changed to ${label}`);
  };

  const getCurrentProviderOption = () => {
    if (!currentProvider) return PROVIDER_OPTIONS[0]; // global
    return PROVIDER_OPTIONS.find((p) => p.id === currentProvider) || PROVIDER_OPTIONS[0];
  };

  if (!currentProject) return null;

  const currentOption = getCurrentProviderOption();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-8 px-3"
          data-testid="project-provider-selector"
        >
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{currentOption.shortLabel || currentOption.label}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          AI Provider for this project
        </DropdownMenuLabel>
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
                'flex items-center justify-between py-1.5',
                !isAvailable && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className={cn(isActive && 'font-medium')}>{option.label}</span>
              {isActive && <Check className="w-4 h-4 text-green-500" />}
              {!isAvailable && (
                <span className="text-xs text-muted-foreground">Not configured</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
