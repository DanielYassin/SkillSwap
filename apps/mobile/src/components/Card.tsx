import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { theme } from '@/theme';

export type CardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

export function Card({ style, children, ...rest }: CardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    padding: theme.spacing.lg,
  },
});
