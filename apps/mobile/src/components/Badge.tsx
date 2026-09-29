import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '@/theme';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
};

const toneStyles: Record<BadgeTone, { bg: string; text: string }> = {
  neutral: { bg: theme.colors.surface.muted, text: theme.colors.text.secondary },
  success: { bg: '#DCFAE6', text: theme.colors.state.success },
  warning: { bg: '#FEF0C7', text: theme.colors.state.warning },
  danger: { bg: '#FEE4E2', text: theme.colors.state.danger },
  info: { bg: theme.colors.brand.mint, text: theme.colors.brand.ink },
};

export function Badge({ label, tone = 'neutral', style }: BadgeProps) {
  const palette = toneStyles[tone];
  return (
    <View style={[styles.base, { backgroundColor: palette.bg }, style]}>
      <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    minHeight: 24,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.full,
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.medium,
  },
});
