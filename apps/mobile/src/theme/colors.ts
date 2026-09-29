/**
 * SkillSwap mobile color tokens.
 *
 * SS-16 design-system files were not present in this repository at foundation
 * time. These values are a temporary mobile-local set (teal ink on cool stone).
 * Replace by importing shared tokens once SS-16 lands — do not diverge further.
 */
export const colors = {
  brand: {
    ink: '#0F3D3E',
    teal: '#1F6F70',
    mint: '#C8E6E3',
  },
  surface: {
    canvas: '#F2F5F5',
    raised: '#FFFFFF',
    muted: '#E2E8E8',
    inverse: '#0F3D3E',
  },
  text: {
    primary: '#142022',
    secondary: '#4A5859',
    inverse: '#F2F5F5',
    disabled: '#8A9596',
    link: '#1F6F70',
  },
  border: {
    subtle: '#CDD6D6',
    strong: '#0F3D3E',
    focus: '#1F6F70',
    danger: '#B42318',
  },
  state: {
    success: '#027A48',
    warning: '#B54708',
    danger: '#B42318',
    info: '#1F6F70',
  },
  overlay: 'rgba(15, 61, 62, 0.48)',
} as const;

export type Colors = typeof colors;
