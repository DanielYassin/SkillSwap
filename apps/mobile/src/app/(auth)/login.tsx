import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Screen, TextInput } from '@/components';
import { useSession } from '@/lib/session';
import { ApiError } from '@/services/api';
import { theme } from '@/theme';

/**
 * Cookie-session login. Auth source is the API httpOnly session cookie
 * (`credentials: 'include'`). Do not add Bearer/JWT or AsyncStorage tokens.
 */
export default function LoginScreen() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signIn({ email: email.trim(), password });
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
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>
          Uses the same httpOnly cookie session as web. No local token storage.
        </Text>
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
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          label="Continue"
          onPress={() => {
            void onSubmit();
          }}
          loading={submitting}
          disabled={!email.trim() || !password}
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
