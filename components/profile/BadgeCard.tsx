import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Check } from "lucide-react-native";
import globalStyles from '@/styles/global';

interface BadgeCardProps {
  icon: string;
  title: string;
  description: string;
  currentProgress: number;
  totalProgress: number;
}

export default function BadgeCard({ icon, title, description, currentProgress, totalProgress }: BadgeCardProps) {
  const isCompleted = currentProgress >= totalProgress;
  const progressPercent = (currentProgress / totalProgress) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.topInfoContainer}>
      <View style={[styles.iconContainer, isCompleted && styles.iconContainerCompleted]}>
        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3PBXnED3H-tgxSbrI-9mR3b3UK_9tuM84GQ&s" }} style={styles.badgeImage} />
        {isCompleted && (
            <View style={styles.checkContainer}>
                <Check width={20}/>
            </View>
        )}
      </View>

      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
      
    <View style={styles.progressContainer}>
        <View style={[styles.progressFilled, { width: `${progressPercent}%`,  borderBottomRightRadius: isCompleted ? 8 : 0  }]} />
        <Text style={styles.progressText}>{currentProgress}/{totalProgress}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    //flex: 1,
    width: 176,
    marginBottom: 16,
    paddingTop: 8,
    gap: 18,
    borderRadius: 8,
    backgroundColor: Colors.colors.backgroundButton.white,
    justifyContent: "space-between",
    alignItems: 'center',
    shadowColor: '#2C3E50',
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  topInfoContainer:{
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8
  },
  iconContainer: {
    width: 80,
    height: 80,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerCompleted: {
    backgroundColor: '#D9F3E9',
    opacity: 1,
  },
  checkContainer:{
    position: 'absolute',
    padding: 4,
    top: 52,
    left: 52,
    gap: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.colors.backgroundButton.white,
    backgroundColor: Colors.colors.success[100]
  },
  title: {
    ...globalStyles.mediumBodyBold,
    color: Colors.colors.text.primary,
    textAlign: 'center',
  },
  description: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.secondary,
    textAlign: 'center',
  },
  progressContainer: {
    height: 16,
    width: '100%',
    backgroundColor: Colors.colors.success[50],
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
  },
  progressFilled: {
    height: '100%',
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.colors.success[200]
   
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    ...globalStyles.smallBodySemiBold,
    color: Colors.colors.text.secondary[900]
  },
  badgeImage: {
    width: 72,
    height: 72,
  },
  
});