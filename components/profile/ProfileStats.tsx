import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileStatsProps {
  stats: {
    countries: number;
    missions: number;
    contacts: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{stats.countries}</Text>
        <Text style={styles.statLabel}>PAÍSES</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{stats.missions}</Text>
        <Text style={styles.statLabel}>MISIONES</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{stats.contacts}</Text>
        <Text style={styles.statLabel}>CONTACTOS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1DD',
    borderTopWidth: 1,
    borderTopColor: '#E0E1DD',
    marginHorizontal: 20,
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D1B2A',
  },
  statLabel: {
    fontSize: 12,
    color: '#778DA9',
    marginTop: 4,
  },
});