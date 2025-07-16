import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  name: string;
  username: string;
  location: string;
  bio: string;
  avatar: string;
}

export default function ProfileHeader({ name, username, location, bio, avatar }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
        <View style={styles.imageWrapper}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      </View>
      <View styles={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userInfo:{
    flexDirection: "column",
  },
  imageWrapper:{
    width: 122,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D1B2A',
  },
  username: {
    fontSize: 16,
    color: '#778DA9',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#778DA9',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#415A77',
    textAlign: 'center',
  },
});