import 'react-native-gesture-handler';
import { useEffect, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SessionProvider, useSession } from '@/lib/session';
import { theme } from '@/theme';

function AuthGate({ children }: { children: ReactNode }) {
  const { isLoggedIn, isHydrated } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(app)/dashboard');
    }
  }, [isLoggedIn, isHydrated, segments, router]);

  if (!isHydrated) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={theme.colors.brand.teal} size="large" />
      </View>
    );
  }

  return children;
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar style="dark" />
      <AuthGate>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.surface.canvas },
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </AuthGate>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface.canvas,
  },
});
