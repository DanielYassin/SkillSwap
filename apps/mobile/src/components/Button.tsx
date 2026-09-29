import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { theme } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantStyles: Record<
  ButtonVariant,
  { bg: string; bgPressed: string; text: string; border?: string }
> = {
  primary: {
    bg: theme.colors.brand.teal,
    bgPressed: theme.colors.brand.ink,
    text: theme.colors.text.inverse,
  },
  secondary: {
    bg: theme.colors.surface.raised,
    bgPressed: theme.colors.surface.muted,
    text: theme.colors.text.primary,
    border: theme.colors.border.subtle,
  },
  ghost: {
    bg: 'transparent',
    bgPressed: theme.colors.surface.muted,
    text: theme.colors.brand.teal,
  },
  danger: {
    bg: theme.colors.state.danger,
    bgPressed: '#912018',
    text: theme.colors.text.inverse,
  },
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const palette = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed ? palette.bgPressed : palette.bg,
          borderColor: palette.border ?? 'transparent',
          borderWidth: palette.border ? 1 : 0,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <Text style={[styles.label, { color: palette.text }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: theme.touchTarget,
    minWidth: theme.touchTarget,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
  },
});
