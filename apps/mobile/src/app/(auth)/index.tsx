import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button, Screen } from '@/components';
import { theme } from '@/theme';

export default function AuthWelcomeScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.brand}>SkillSwap</Text>
        <Text style={styles.tagline}>
          Trade skills with people nearby. Teach what you know, learn what you need.
        </Text>
      </View>
      <View style={styles.actions}>
        <Link href="/(auth)/login" asChild>
          <Button label="Sign in" />
        </Link>
        <Link href="/(auth)/register" asChild>
          <Button label="Create account" variant="secondary" />
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  brand: {
    fontSize: theme.typography.size.display,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.brand.ink,
  },
  tagline: {
    fontSize: theme.typography.size.lg,
    lineHeight: theme.typography.size.lg * theme.typography.lineHeight.snug,
    color: theme.colors.text.secondary,
    maxWidth: 340,
  },
  actions: {
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
});
