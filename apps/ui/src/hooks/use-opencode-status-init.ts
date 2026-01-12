import { useEffect, useRef } from 'react';
import { useSetupStore } from '@/store/setup-store';
import { getHttpApiClient } from '@/lib/http-api-client';

/**
 * Hook to initialize OpenCode CLI status on app startup.
 * This ensures the opencodeCliStatus is available in the setup store
 * before the user opens feature dialogs or settings.
 */
export function useOpencodeStatusInit() {
  const { setOpencodeCliStatus, opencodeCliStatus } = useSetupStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once per session
    if (initialized.current || opencodeCliStatus !== null) {
      return;
    }
    initialized.current = true;

    const initOpencodeStatus = async () => {
      try {
        const api = getHttpApiClient();
        const statusResult = await api.setup.getOpenCodeStatus();

        if (statusResult.success) {
          setOpencodeCliStatus({
            installed: statusResult.installed ?? false,
            version: statusResult.version ?? null,
            path: statusResult.path ?? null,
            method: statusResult.auth?.authenticated
              ? `authenticated via ${statusResult.auth.method}`
              : 'none',
          });
        }
      } catch (error) {
        // Silently fail - OpenCode is optional
        console.debug('[OpencodeStatusInit] Failed to check OpenCode status:', error);
      }
    };

    initOpencodeStatus();
  }, [setOpencodeCliStatus, opencodeCliStatus]);
}
