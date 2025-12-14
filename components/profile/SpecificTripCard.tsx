import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface SpecificTripCardProps {
  imageUrl: string;
  startDate: string;
  endDate: string;
  missionsCompleted: number;
  userAvatarUrl: string; 
  extraParticipantsCount: number;
  onPress: () => void;
}

export default function SpecificTripCard({ imageUrl, startDate, endDate, missionsCompleted, userAvatarUrl, extraParticipantsCount, onPress }: SpecificTripCardProps) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={styles.imageChallengeWrapper}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.imageChallenge} 
        />
        </View>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: userAvatarUrl }} style={styles.userAvatar} />
          {extraParticipantsCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>+{extraParticipantsCount}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{`5 May - 9 May 2025`}</Text>
        <Text style={styles.missionsText}>{t('profile.challenges.completed', { count: missionsCompleted })}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 177,
    gap: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 135,
  },
  imageChallengeWrapper: {
    width: 120,
    height: 132,
    left: 29.04
  },
  imageChallenge: {
    width: 118.53,
    height: 118.53,
    borderRadius: 11.85,
    top: 11.85
  },
  avatarWrapper: {
    position: 'absolute',
    top: 9,
    left: 119,
    flexDirection: 'row',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.colors.background.card,
  },
  badgeContainer: {
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: Colors.colors.primary[900],
    borderWidth: 1,
    borderColor: Colors.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...globalStyles.extraSmallSemiBold,
    color: Colors.colors.textWhite.primary,
  },
  textContainer: {
    gap: 4,
    alignItems: 'center',
  },
  dateText: {
    ...globalStyles.smallBodySemiBold,
    color: Colors.colors.text.secondary,
  },
  missionsText: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.tertiary,
  },
});