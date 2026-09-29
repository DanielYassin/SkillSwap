import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Screen, TextInput } from '@/components';
import { useSession } from '@/lib/session';
import { theme } from '@/theme';

/** Placeholder register — mock session only until cookie auth is wired. */
export default function RegisterScreen() {
  const { mockSignIn } = useSession();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      mockSignIn({
        id: 'mock-user-new',
        email: email || 'new@skillswap.local',
        displayName: displayName || 'New Member',
        avatarUrl: null,
      });
      setSubmitting(false);
    }, 250);
  };

  return (
    <Screen>
      <View style={styles.form}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Placeholder screen — no network calls yet.</Text>
        <TextInput
          label="Display name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Alex"
          autoComplete="name"
        />
        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
        />
        <TextInput
          label="Password"
          secureTextEntry
          autoComplete="new-password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
        />
        <Button label="Create account" onPress={onSubmit} loading={submitting} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    marginTop: -theme.spacing.sm,
  },
});
