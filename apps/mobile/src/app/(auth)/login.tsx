import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Screen, TextInput } from '@/components';
import { useSession } from '@/lib/session';
import { theme } from '@/theme';

/**
 * Placeholder login. Mock session only — real cookie login lands after SS-26
 * backend pairing. Do not add a parallel token/AsyncStorage auth path.
 */
export default function LoginScreen() {
  const { mockSignIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    setSubmitting(true);
    // Simulated latency for loading-state coverage; replace with api.post('/auth/login').
    setTimeout(() => {
      mockSignIn({
        id: 'mock-user-1',
        email: email || 'demo@skillswap.local',
        displayName: 'Demo Learner',
        avatarUrl: null,
      });
      setSubmitting(false);
    }, 250);
  };

  return (
    <Screen>
      <View style={styles.form}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Placeholder screen — session is mocked locally.</Text>
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
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
        />
        <Button label="Continue" onPress={onSubmit} loading={submitting} />
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
