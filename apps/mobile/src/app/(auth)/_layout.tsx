import { Stack } from 'expo-router';
import { theme } from '@/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface.canvas },
        headerTintColor: theme.colors.brand.ink,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.surface.canvas },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'SkillSwap' }} />
      <Stack.Screen name="login" options={{ title: 'Sign in' }} />
      <Stack.Screen name="register" options={{ title: 'Create account' }} />
    </Stack>
  );
}
