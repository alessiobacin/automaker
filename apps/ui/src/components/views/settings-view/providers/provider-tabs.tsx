import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Terminal, Code2, Cpu } from 'lucide-react';
import { CursorSettingsTab } from './cursor-settings-tab';
import { ClaudeSettingsTab } from './claude-settings-tab';
import { OpenCodeSettingsTab } from './opencode-settings-tab';
import { CodexSettingsTab } from './codex-settings-tab';

interface ProviderTabsProps {
  defaultTab?: 'claude' | 'cursor' | 'opencode' | 'codex';
}

export function ProviderTabs({ defaultTab = 'claude' }: ProviderTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="claude" className="flex items-center gap-2">
          <Bot className="w-4 h-4" />
          Claude
        </TabsTrigger>
        <TabsTrigger value="cursor" className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Cursor
        </TabsTrigger>
        <TabsTrigger value="opencode" className="flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          OpenCode
        </TabsTrigger>
        <TabsTrigger value="codex" className="flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          Codex
        </TabsTrigger>
      </TabsList>

      <TabsContent value="claude">
        <ClaudeSettingsTab />
      </TabsContent>

      <TabsContent value="cursor">
        <CursorSettingsTab />
      </TabsContent>

      <TabsContent value="opencode">
        <OpenCodeSettingsTab />
      </TabsContent>

      <TabsContent value="codex">
        <CodexSettingsTab />
      </TabsContent>
    </Tabs>
  );
}

export default ProviderTabs;
