export const typography = {
  fontFamily: {
    sans: 'System',
    mono: 'SpaceMono',
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    display: 32,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export type Typography = typeof typography;
