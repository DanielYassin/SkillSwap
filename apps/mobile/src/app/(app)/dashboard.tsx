import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge, Card, Screen } from '@/components';
import { useSession } from '@/lib/session';
import { theme } from '@/theme';

export default function DashboardScreen() {
  const { user } = useSession();

  return (
    <Screen>
      <View style={styles.header}>
        <Avatar name={user?.displayName ?? 'Member'} uri={user?.avatarUrl} size="lg" />
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.name}>{user?.displayName ?? 'Member'}</Text>
        </View>
        <Badge label="Placeholder" tone="info" />
      </View>
      <Card>
        <Text style={styles.cardTitle}>Your swaps</Text>
        <Text style={styles.cardBody}>
          Dashboard content will land with product tickets. This shell verifies navigation and
          theme wiring only.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  headerText: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
  greeting: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  name: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  cardTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  cardBody: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.size.sm * theme.typography.lineHeight.normal,
  },
});
