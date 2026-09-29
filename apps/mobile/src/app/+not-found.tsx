import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components';
import { theme } from '@/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen does not exist.</Text>
        <Link href="/(auth)" asChild>
          <Button label="Go home" variant="secondary" />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface.canvas,
  },
  title: {
    fontSize: theme.typography.size.lg,
    color: theme.colors.text.primary,
  },
});
