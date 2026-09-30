import 'react-native-gesture-handler';
import { useEffect, type ReactNode } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SessionProvider, useSession } from '@/lib/session';
import { configureApiSessionHooks } from '@/services/api';
import { theme } from '@/theme';

function AuthGate({ children }: { children: ReactNode }) {
  const { isLoggedIn, isHydrated, clearSession } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    configureApiSessionHooks({
      onUnauthorized: () => {
        clearSession();
      },
    });
  }, [clearSession]);

  useEffect(() => {
    if (!isHydrated) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(app)/dashboard');
    }
  }, [isLoggedIn, isHydrated, segments, router]);

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
