import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Screen, TextInput } from '@/components';
import { useSession } from '@/lib/session';
import { ApiError } from '@/services/api';
import { theme } from '@/theme';

/** Cookie-session registration — same session cookie contract as login. */
export default function RegisterScreen() {
  const { signUp } = useSession();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signUp({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to reach the API. Check EXPO_PUBLIC_API_URL and try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <View style={styles.form}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Creates an account and establishes the API session cookie.
        </Text>
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
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          label="Create account"
          onPress={() => {
            void onSubmit();
          }}
          loading={submitting}
          disabled={!displayName.trim() || !email.trim() || !password}
        />
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
  error: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.state.danger,
  },
});
