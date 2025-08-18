import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TripCard from './TripCard';

interface Trip {
  id: string;
  city: string;
  tripCount: number;
  image: string;
}

interface TripGridProps {
  trips: Trip[];
}

export default function TripGrid({ trips }: TripGridProps) {
  return (
    <FlatList
      data={trips}
      renderItem={({ item }) => <TripCard trip={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});