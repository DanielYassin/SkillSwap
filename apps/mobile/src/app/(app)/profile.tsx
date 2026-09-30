import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Screen } from '@/components';
import { useSession } from '@/lib/session';
import { theme } from '@/theme';

export default function ProfileScreen() {
  const { user, signOut } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  const onSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Avatar name={user?.displayName ?? 'Member'} uri={user?.avatarUrl} size="lg" />
        <Text style={styles.name}>{user?.displayName ?? 'Member'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>
      <Card style={styles.card}>
        <Text style={styles.cardBody}>
          Profile editing is out of scope for the mobile foundation. Sign out calls the API
          logout route and clears the in-memory session so the auth gate returns you to sign-in.
        </Text>
      </Card>
      <Button
        label="Sign out"
        variant="secondary"
        loading={signingOut}
        onPress={() => {
          void onSignOut();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  name: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  email: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  cardBody: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.size.sm * theme.typography.lineHeight.normal,
  },
});
