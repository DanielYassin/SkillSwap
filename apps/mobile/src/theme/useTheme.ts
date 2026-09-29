import { useMemo } from 'react';
import { theme, type Theme } from './index';

/** Typed theme accessor for components (swap for ThemeProvider later if needed). */
export function useTheme(): Theme {
  return useMemo(() => theme, []);
}
