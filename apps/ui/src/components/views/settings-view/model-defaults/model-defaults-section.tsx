import * as React from 'react';
import { Workflow, RotateCcw, ChevronDown, Check, Save } from 'lucide-react';
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
import { PhaseModelSelector } from './phase-model-selector';
import type { PhaseModelKey } from '@automaker/types';
import { DEFAULT_PHASE_MODELS } from '@automaker/types';

interface PhaseConfig {
  key: PhaseModelKey;
  label: string;
  description: string;
}

const QUICK_TASKS: PhaseConfig[] = [
  {
    key: 'enhancementModel',
    label: 'Feature Enhancement',
    description: 'Improves feature names and descriptions',
  },
  {
    key: 'fileDescriptionModel',
    label: 'File Descriptions',
    description: 'Generates descriptions for context files',
  },
  {
    key: 'imageDescriptionModel',
    label: 'Image Descriptions',
    description: 'Analyzes and describes context images',
  },
];

const VALIDATION_TASKS: PhaseConfig[] = [
  {
    key: 'validationModel',
    label: 'GitHub Issue Validation',
    description: 'Validates and improves GitHub issues',
  },
];

const GENERATION_TASKS: PhaseConfig[] = [
  {
    key: 'specGenerationModel',
    label: 'App Specification',
    description: 'Generates full application specifications',
  },
  {
    key: 'featureGenerationModel',
    label: 'Feature Generation',
    description: 'Creates features from specifications',
  },
  {
    key: 'backlogPlanningModel',
    label: 'Backlog Planning',
    description: 'Reorganizes and prioritizes backlog',
  },
  {
    key: 'projectAnalysisModel',
    label: 'Project Analysis',
    description: 'Analyzes project structure for suggestions',
  },
  {
    key: 'suggestionsModel',
    label: 'AI Suggestions',
    description: 'Model for feature, refactoring, security, and performance suggestions',
  },
];

function PhaseGroup({
  title,
  subtitle,
  phases,
}: {
  title: string;
  subtitle: string;
  phases: PhaseConfig[];
}) {
  const phaseModels = useAppStore((state) => state.phaseModels);
  const setPhaseModel = useAppStore((state) => state.setPhaseModel);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="space-y-3">
        {phases.map((phase) => (
          <PhaseModelSelector
            key={phase.key}
            label={phase.label}
            description={phase.description}
            value={phaseModels[phase.key] ?? DEFAULT_PHASE_MODELS[phase.key]}
            onChange={(model) => setPhaseModel(phase.key, model)}
          />
        ))}
      </div>
    </div>
  );
}

export function ModelDefaultsSection() {
  const resetToProviderPreset = useAppStore((state) => state.resetToProviderPreset);
  const apiKeys = useAppStore((state) => state.apiKeys);
  const phaseModels = useAppStore((state) => state.phaseModels);

  // Track the active preset and if models have been modified
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  const [savedModels, setSavedModels] = React.useState<Record<string, { model: string }> | null>(
    null
  );

  // Get provider installation status from setup store
  const claudeCliStatus = useSetupStore((state) => state.claudeCliStatus);
  const cursorCliStatus = useSetupStore((state) => state.cursorCliStatus);
  const codexCliStatus = useSetupStore((state) => state.codexCliStatus);
  const opencodeCliStatus = useSetupStore((state) => state.opencodeCliStatus);

  // Determine which providers are available
  const isClaudeAvailable = claudeCliStatus?.installed === true || !!apiKeys?.anthropic;
  const isCursorAvailable = cursorCliStatus?.installed === true;
  // Codex requires OpenAI API key
  const isCodexAvailable = codexCliStatus?.installed === true && !!apiKeys?.openai;
  const isOpencodeAvailable = opencodeCliStatus?.installed === true;
  // OpenRouter is available through OpenCode CLI
  const isOpenRouterAvailable = isOpencodeAvailable;

  // Check if models have been modified from the saved state
  const hasModifications = React.useMemo(() => {
    if (!savedModels) return false;
    return Object.keys(savedModels).some((key) => {
      const saved = savedModels[key]?.model;
      const current = phaseModels[key as PhaseModelKey]?.model;
      return saved !== current;
    });
  }, [savedModels, phaseModels]);

  // Debug logging
  React.useEffect(() => {
    console.log('[ModelDefaults] Provider Status:', {
      claude: { status: claudeCliStatus, available: isClaudeAvailable },
      cursor: { status: cursorCliStatus, available: isCursorAvailable },
      codex: { status: codexCliStatus, available: isCodexAvailable },
      opencode: { status: opencodeCliStatus, available: isOpencodeAvailable },
      openrouter: { available: isOpenRouterAvailable },
      apiKeys: { anthropic: !!apiKeys?.anthropic },
    });
  }, [claudeCliStatus, cursorCliStatus, codexCliStatus, opencodeCliStatus, apiKeys]);

  const handlePresetChange = async (
    preset: 'claude' | 'cursor' | 'codex' | 'opencode' | 'openrouter' | 'openrouter-free'
  ) => {
    await resetToProviderPreset(preset);
    setActivePreset(preset);
    // Save the current state after applying preset
    setSavedModels(JSON.parse(JSON.stringify(phaseModels)));
    toast.success(`Switched to ${preset.charAt(0).toUpperCase() + preset.slice(1)} preset`);
  };

  const handleSaveAsDefault = () => {
    // Save current models as the new baseline
    setSavedModels(JSON.parse(JSON.stringify(phaseModels)));
    setActivePreset('custom');
    toast.success('Model configuration saved as default');
  };

  // Get preset display name
  const getPresetDisplayName = (preset: string | null) => {
    if (!preset) return null;
    const names: Record<string, string> = {
      claude: 'Claude',
      cursor: 'Cursor',
      codex: 'Codex',
      opencode: 'OpenCode',
      openrouter: 'OpenRouter',
      'openrouter-free': 'OpenRouter FREE',
      custom: 'Custom',
    };
    return names[preset] || preset;
  };

  // Check if any provider is available
  const hasAnyProvider =
    isClaudeAvailable || isCursorAvailable || isCodexAvailable || isOpencodeAvailable;

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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center border border-brand-500/20">
              <Workflow className="w-5 h-5 text-brand-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                  Model Defaults
                </h2>
                {activePreset && (
                  <Badge variant="secondary" className="text-xs">
                    {getPresetDisplayName(activePreset)}
                    {hasModifications && ' (modified)'}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground/80">
                Configure which AI model to use for each application task
              </p>
            </div>
          </div>
          {hasAnyProvider && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Provider
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Choose Provider Preset</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isClaudeAvailable && (
                  <DropdownMenuItem
                    onClick={() => handlePresetChange('claude')}
                    className="flex items-center justify-between"
                  >
                    <span>Reset to Claude Code Models</span>
                    {activePreset === 'claude' && <Check className="w-4 h-4 text-green-500" />}
                  </DropdownMenuItem>
                )}
                {isCursorAvailable && (
                  <DropdownMenuItem
                    onClick={() => handlePresetChange('cursor')}
                    className="flex items-center justify-between"
                  >
                    <span>Reset to Cursor Models</span>
                    {activePreset === 'cursor' && <Check className="w-4 h-4 text-green-500" />}
                  </DropdownMenuItem>
                )}
                {isCodexAvailable && (
                  <DropdownMenuItem
                    onClick={() => handlePresetChange('codex')}
                    className="flex items-center justify-between"
                  >
                    <span>Reset to Codex Models</span>
                    {activePreset === 'codex' && <Check className="w-4 h-4 text-green-500" />}
                  </DropdownMenuItem>
                )}
                {isOpencodeAvailable && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handlePresetChange('opencode')}
                      className="flex items-center justify-between"
                    >
                      <span>Reset to OpenCode Models</span>
                      {activePreset === 'opencode' && <Check className="w-4 h-4 text-green-500" />}
                    </DropdownMenuItem>
                  </>
                )}
                {isOpenRouterAvailable && (
                  <>
                    <DropdownMenuItem
                      onClick={() => handlePresetChange('openrouter')}
                      className="flex items-center justify-between"
                    >
                      <span>Reset to OpenRouter Models</span>
                      {activePreset === 'openrouter' && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handlePresetChange('openrouter-free')}
                      className="flex items-center justify-between"
                    >
                      <span>Reset to OpenRouter FREE Models</span>
                      {activePreset === 'openrouter-free' && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Quick Tasks */}
        <PhaseGroup
          title="Quick Tasks"
          subtitle="Fast models recommended for speed and cost savings"
          phases={QUICK_TASKS}
        />

        {/* Validation Tasks */}
        <PhaseGroup
          title="Validation Tasks"
          subtitle="Smart models recommended for accuracy"
          phases={VALIDATION_TASKS}
        />

        {/* Generation Tasks */}
        <PhaseGroup
          title="Generation Tasks"
          subtitle="Powerful models recommended for quality output"
          phases={GENERATION_TASKS}
        />

        {/* Save as Default Button */}
        {hasModifications && (
          <div className="pt-4 border-t border-border/50">
            <Button onClick={handleSaveAsDefault} className="gap-2">
              <Save className="w-4 h-4" />
              Save as Default
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Save your current model configuration as the new default
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
