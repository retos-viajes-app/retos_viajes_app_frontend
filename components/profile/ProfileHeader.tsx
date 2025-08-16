import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  name: string;
  username: string;
  location: string;
  bio: string | null;
  profileImage: string | null;
}

export default function ProfileHeader({ name, username, location, bio, profileImage }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: profileImage ? profileImage : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} style={styles.profileImage} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.userInfoTop}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.atUsername}>
              <Text style={styles.username}>@</Text>
              <Text style={styles.username}>{username}</Text>
            </View>
          </View>
          <Text style={styles.location}>{location}</Text>
        </View>
        { bio && (
          <Text style={styles.bio}>{bio}</Text>
        )}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  imageWrapper:{
    width: 122,
    alignItems: "center"
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  userInfoTop:{
    gap: 8
  },
  atUsername:{
    flexDirection: 'row',
    gap: 2
  },
  name: {
    ...globalStyles.title,
    color: Colors.colors.primary[900]
  },
  username: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.primary
  },
  location: {
    ...globalStyles.mediumBodyMedium,
    color: Colors.colors.text.secondary
  },
  bio: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.secondary
  },
});