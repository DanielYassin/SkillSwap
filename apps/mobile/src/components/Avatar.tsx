import { Image, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '@/theme';

export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = {
  name: string;
  uri?: string | null;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
};

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 44,
  lg: 64,
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0]?.[0] ?? '';
  const second = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return `${first}${second}`.toUpperCase();
}

export function Avatar({ name, uri, size = 'md', style }: AvatarProps) {
  const dimension = sizeMap[size];

  return (
    <View
      accessibilityLabel={`${name} avatar`}
      style={[
        styles.base,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: dimension, height: dimension }} />
      ) : (
        <Text style={[styles.initials, { fontSize: dimension * 0.36 }]}>
          {initials(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand.mint,
  },
  initials: {
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.brand.ink,
  },
});
