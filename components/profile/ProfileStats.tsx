import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileStatsProps {
  countries: number;
  missions: number;
  contacts: number;
}

export default function ProfileStats({ countries, missions, contacts }: ProfileStatsProps) {

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{countries}</Text>
        <Text style={styles.statLabel}>{t("profile.stats.countries")}</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{missions}</Text>
        <Text style={styles.statLabel}>{t("profile.stats.missions")}</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{contacts}</Text>
        <Text style={styles.statLabel}>{t("profile.stats.contacts")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    width: "100%",
    gap: 1,
    borderRadius: 16
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statNumber: {
    ...globalStyles.title,
    color: Colors.colors.text.primary
  },
  statLabel: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.secondary
  },
});