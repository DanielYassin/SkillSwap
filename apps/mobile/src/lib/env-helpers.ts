export type AppEnv = 'local' | 'preview' | 'production';

const DEFAULT_API_PORT = 4000;

export function parseAppEnv(raw: string | undefined): AppEnv {
  if (raw === 'preview' || raw === 'production' || raw === 'local') {
    return raw;
  }
  return 'local';
}

/**
 * Android emulator cannot reach the host via 127.0.0.1.
 * iOS simulator can. Physical devices need a LAN IP via EXPO_PUBLIC_API_URL.
 */
export function resolveLocalApiHost(platformOs: string): string {
  if (platformOs === 'android') {
    return '10.0.2.2';
  }
  return '127.0.0.1';
}

export function defaultLocalApiUrl(platformOs: string): string {
  return `http://${resolveLocalApiHost(platformOs)}:${DEFAULT_API_PORT}`;
}

/**
 * Resolve the API origin from public env + platform.
 * Kept free of react-native so Node unit tests can import the API client.
 */
export function resolveApiUrl(options: {
  appEnv: AppEnv;
  configuredUrl?: string;
  platformOs: string;
}): string {
  const configured = options.configuredUrl?.trim();
  if (configured) {
    return configured.replace(/\/$/, '');
  }
  if (options.appEnv === 'local') {
    return defaultLocalApiUrl(options.platformOs);
  }
  throw new Error(
    `EXPO_PUBLIC_API_URL is required when EXPO_PUBLIC_APP_ENV=${options.appEnv}`,
  );
}
