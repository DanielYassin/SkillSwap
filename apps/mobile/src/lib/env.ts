import { Platform } from 'react-native';
import Constants from 'expo-constants';
import {
  parseAppEnv,
  resolveApiUrl,
  type AppEnv,
} from './env-helpers';

export type { AppEnv } from './env-helpers';
export {
  defaultLocalApiUrl,
  parseAppEnv,
  resolveApiUrl,
  resolveLocalApiHost,
} from './env-helpers';

export type MobileEnv = {
  appEnv: AppEnv;
  apiUrl: string;
  scheme: 'skillswap';
  isDev: boolean;
};

function readPublic(name: 'EXPO_PUBLIC_API_URL' | 'EXPO_PUBLIC_APP_ENV'): string | undefined {
  const fromProcess =
    name === 'EXPO_PUBLIC_API_URL'
      ? process.env.EXPO_PUBLIC_API_URL
      : process.env.EXPO_PUBLIC_APP_ENV;
  if (typeof fromProcess === 'string' && fromProcess.length > 0) {
    return fromProcess;
  }
  const extra = Constants.expoConfig?.extra as Record<string, unknown> | undefined;
  const fromExtra = extra?.[name];
  if (typeof fromExtra === 'string' && fromExtra.length > 0) {
    return fromExtra;
  }
  return undefined;
}

export function getMobileEnv(): MobileEnv {
  const appEnv = parseAppEnv(readPublic('EXPO_PUBLIC_APP_ENV'));
  const apiUrl = resolveApiUrl({
    appEnv,
    configuredUrl: readPublic('EXPO_PUBLIC_API_URL'),
    platformOs: Platform.OS,
  });

  return {
    appEnv,
    apiUrl,
    scheme: 'skillswap',
    isDev: typeof __DEV__ !== 'undefined' ? __DEV__ : appEnv === 'local',
  };
}

export const env = getMobileEnv();
