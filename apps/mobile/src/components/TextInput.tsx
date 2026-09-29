import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { theme } from '@/theme';

export type TextInputProps = RNTextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function TextInput({
  label,
  error,
  editable = true,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const disabled = editable === false;

  const borderColor = error
    ? theme.colors.border.danger
    : focused
      ? theme.colors.border.focus
      : theme.colors.border.subtle;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <RNTextInput
        editable={editable}
        placeholderTextColor={theme.colors.text.disabled}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          styles.input,
          {
            borderColor,
            backgroundColor: disabled
              ? theme.colors.surface.muted
              : theme.colors.surface.raised,
            color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
          },
          style,
        ]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.secondary,
  },
  input: {
    minHeight: theme.touchTarget,
    borderWidth: 1,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.size.md,
  },
  error: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.state.danger,
  },
});
