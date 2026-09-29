import { ActivityIndicator, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '@/theme';

export type LoadingStateProps = {
  message?: string;
  style?: StyleProp<ViewStyle>;
};

export function LoadingState({ message = 'Loading…', style }: LoadingStateProps) {
  return (
    <View accessibilityRole="progressbar" style={[styles.container, style]}>
      <ActivityIndicator size="large" color={theme.colors.brand.teal} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
  message: {
    fontSize: theme.typography.size.md,
    color: theme.colors.text.secondary,
  },
});
