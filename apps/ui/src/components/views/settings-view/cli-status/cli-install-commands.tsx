import { Copy, Check, Terminal, Apple, Monitor } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface InstallCommand {
  label: string;
  command: string;
  platform?: 'all' | 'macos' | 'windows' | 'linux';
}

export interface CliInstallCommandsProps {
  providerName: string;
  description?: string;
  commands: InstallCommand[];
  authCommand?: string;
  docsUrl?: string;
}

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
      className="h-6 w-6 shrink-0 opacity-70 hover:opacity-100"
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
    case 'linux':
      return <Terminal className="w-3.5 h-3.5" />;
    default:
      return <Terminal className="w-3.5 h-3.5" />;
  }
}

export function CliInstallCommands({
  providerName,
  description,
  commands,
  authCommand,
  docsUrl,
}: CliInstallCommandsProps) {
  const currentOS = getOS();

  // Filter and sort commands - show current OS first, then 'all', then others
  const sortedCommands = [...commands].sort((a, b) => {
    const aMatch = a.platform === currentOS || a.platform === 'all';
    const bMatch = b.platform === currentOS || b.platform === 'all';
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        'border border-amber-500/30',
        'bg-gradient-to-br from-amber-500/5 via-card/70 to-card/80 backdrop-blur-xl',
        'shadow-sm shadow-black/5'
      )}
    >
      <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
            <Terminal className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              Install {providerName}
            </h3>
            {description && <p className="text-sm text-muted-foreground/80">{description}</p>}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Install Commands */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-foreground/80 uppercase tracking-wider">
            Installation Commands
          </p>
          <div className="space-y-2">
            {sortedCommands.map((cmd, idx) => {
              const isCurrentOS = cmd.platform === currentOS || cmd.platform === 'all';
              return (
                <div
                  key={idx}
                  className={cn(
                    'p-3 rounded-xl border',
                    isCurrentOS ? 'bg-accent/40 border-primary/30' : 'bg-accent/20 border-border/30'
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
        </div>

        {/* Auth Command */}
        {authCommand && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground/80 uppercase tracking-wider">
              Then Authenticate
            </p>
            <div className="p-3 rounded-xl bg-accent/30 border border-border/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  Command
                </span>
                <CopyButton text={authCommand} />
              </div>
              <code className="text-xs text-foreground/80 font-mono block">{authCommand}</code>
            </div>
          </div>
        )}

        {/* Docs Link */}
        {docsUrl && (
          <p className="text-xs text-muted-foreground">
            For more info, see the{' '}
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              official documentation →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

// Pre-configured install commands for each provider
export const CLAUDE_INSTALL_COMMANDS: InstallCommand[] = [
  {
    label: 'npm (All Platforms)',
    command: 'npm install -g @anthropic-ai/claude-code',
    platform: 'all',
  },
];

export const CURSOR_INSTALL_COMMANDS: InstallCommand[] = [
  { label: 'macOS', command: 'Download from https://cursor.sh', platform: 'macos' },
  { label: 'Windows', command: 'Download from https://cursor.sh', platform: 'windows' },
  { label: 'Linux', command: 'Download from https://cursor.sh', platform: 'linux' },
];

export const CODEX_INSTALL_COMMANDS: InstallCommand[] = [
  { label: 'npm (All Platforms)', command: 'npm install -g @openai/codex', platform: 'all' },
];

export const OPENCODE_INSTALL_COMMANDS: InstallCommand[] = [
  {
    label: 'macOS (Homebrew)',
    command: 'brew install opencode-ai/tap/opencode',
    platform: 'macos',
  },
  {
    label: 'Go Install',
    command: 'go install github.com/opencode-ai/opencode@latest',
    platform: 'all',
  },
  {
    label: 'Windows (Scoop)',
    command:
      'scoop bucket add opencode https://github.com/opencode-ai/scoop-bucket.git && scoop install opencode',
    platform: 'windows',
  },
];
