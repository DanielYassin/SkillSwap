import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';

export type ScreenProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  padded?: boolean;
};

export function Screen({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  padded = true,
  ...rest
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={styles.safe} {...rest}>
      <View style={[styles.inner, padded && styles.padded, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.surface.canvas,
  },
  inner: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
});
