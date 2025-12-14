import globalStyles from '@/styles/global';
import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

interface AvatarWithBadgeProps {
  imageUri: string | ImageSourcePropType; // acepta URL o require()
  badgeNumber?: number;
}

export default function AvatarWithBadge({ imageUri, badgeNumber = 0 }: AvatarWithBadgeProps) {
  // No mostrar el badge si el número es 0 o menor
  const showBadge = badgeNumber > 0;
  const badgeText = `+${badgeNumber}`;

  // Determinar tipo de fuente (uri vs require)
  const source =
    typeof imageUri === 'string'
      ? { uri: imageUri }
      : (imageUri as ImageSourcePropType);

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.avatar} resizeMode="cover" />
      {showBadge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 44,
    height: 44,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1A3C7C', // azul oscuro
    borderRadius: 20,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff', // borde blanco
  },
  badgeText: {
    ...globalStyles.smallBodySemiBold,
    color: '#fff',

  },
});
