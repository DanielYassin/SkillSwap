import { colors } from './colors';
import { radii } from './radii';
import { spacing, touchTarget } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  touchTarget,
} as const;

export type Theme = typeof theme;

export { colors, radii, spacing, touchTarget, typography };
