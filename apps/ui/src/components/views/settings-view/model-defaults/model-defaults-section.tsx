import * as React from 'react';
import { Workflow, RotateCcw, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';
import { useSetupStore } from '@/store/setup-store';
import { Button } from '@/components/ui/button';
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

  // Get provider installation status from setup store
  const claudeCliStatus = useSetupStore((state) => state.claudeCliStatus);
  const cursorCliStatus = useSetupStore((state) => state.cursorCliStatus);
  const codexCliStatus = useSetupStore((state) => state.codexCliStatus);
  const opencodeCliStatus = useSetupStore((state) => state.opencodeCliStatus);

  // Determine which providers are available
  const isClaudeAvailable = claudeCliStatus?.installed === true || !!apiKeys?.anthropic;
  const isCursorAvailable = cursorCliStatus?.installed === true;
  const isCodexAvailable = codexCliStatus?.installed === true;
  const isOpencodeAvailable = opencodeCliStatus?.installed === true;
  // OpenRouter is available through OpenCode CLI
  const isOpenRouterAvailable = isOpencodeAvailable;

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
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                Model Defaults
              </h2>
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
                  <DropdownMenuItem onClick={() => handlePresetChange('claude')}>
                    Reset to Claude Code Models
                  </DropdownMenuItem>
                )}
                {isCursorAvailable && (
                  <DropdownMenuItem onClick={() => handlePresetChange('cursor')}>
                    Reset to Cursor Models
                  </DropdownMenuItem>
                )}
                {isCodexAvailable && (
                  <DropdownMenuItem onClick={() => handlePresetChange('codex')}>
                    Reset to Codex Models
                  </DropdownMenuItem>
                )}
                {isOpencodeAvailable && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handlePresetChange('opencode')}>
                      Reset to OpenCode Models
                    </DropdownMenuItem>
                  </>
                )}
                {isOpenRouterAvailable && (
                  <>
                    <DropdownMenuItem onClick={() => handlePresetChange('openrouter')}>
                      Reset to OpenRouter Models
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePresetChange('openrouter-free')}>
                      Reset to OpenRouter FREE Models
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
      </div>
    </div>
  );
}
