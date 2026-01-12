import { useEffect, useRef } from 'react';
import { useSetupStore } from '@/store/setup-store';
import { getHttpApiClient } from '@/lib/http-api-client';

/**
 * Hook to initialize Codex CLI status on app startup.
 * This ensures the codexCliStatus is available in the setup store
 * before the user opens feature dialogs or settings.
 */
export function useCodexStatusInit() {
  const { setCodexCliStatus, codexCliStatus } = useSetupStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once per session
    if (initialized.current || codexCliStatus !== null) {
      return;
    }
    initialized.current = true;

    const initCodexStatus = async () => {
      try {
        const api = getHttpApiClient();
        const statusResult = await api.setup.getCodexStatus();

        if (statusResult.success) {
          setCodexCliStatus({
            installed: statusResult.installed ?? false,
            version: statusResult.version ?? null,
            path: statusResult.path ?? null,
            method: statusResult.auth?.authenticated
              ? `authenticated via ${statusResult.auth.method}`
              : 'none',
          });
        }
      } catch (error) {
        // Silently fail - Codex is optional
        console.debug('[CodexStatusInit] Failed to check Codex status:', error);
      }
    };

    initCodexStatus();
  }, [setCodexCliStatus, codexCliStatus]);
}
