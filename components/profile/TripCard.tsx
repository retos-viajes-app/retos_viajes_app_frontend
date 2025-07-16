import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardSize = (width - 60) / 2; // 20 padding left, 20 right, 20 gap

interface TripCardProps {
  trip: {
    city: string;
    tripCount: number;
    image: string;
  };
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <ImageBackground
      source={{ uri: trip.image }}
      style={styles.card}
      imageStyle={{ borderRadius: 15 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.city}>{trip.city}</Text>
        <Text style={styles.tripCount}>{trip.tripCount} {trip.tripCount === 1 ? 'Viaje' : 'Viajes'}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize * 1.25,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
  },
  city: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tripCount: {
    color: '#fff',
    fontSize: 14,
  },
});