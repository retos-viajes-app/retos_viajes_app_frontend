import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

interface TripCardProps {
  imageUri: string;
  city: string;
  tripCount: number;
}

export default function TripCard({ imageUri, city, tripCount }: TripCardProps) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.cardContainer}>
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.imageBackground}
      imageStyle={{ borderRadius: 16 }} 
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0.5)']}
        style={styles.gradientOverlay}
      />
       <View style={styles.textContainer}>
          <Text style={styles.cityText}>{city}</Text>
          <Text style={styles.tripsText}>{t('profile.trip', { count: tripCount })}</Text>
        </View>
    </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    //flex: 1,
    width: 173,
    height: 152,
    borderRadius: 16,
    marginBottom: 16,
    // Sombra para iOS
    shadowColor: '#2C3E50',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    borderRadius: 16,
  },
  textContainer: {
    padding: 10,
  },
  cityText: {
    ...globalStyles.mediumBodyBold,
    color: Colors.colors.textWhite.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  tripsText: {
    ...globalStyles.mediumBodyRegular,
    color: Colors.colors.textWhite.secondary,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
});