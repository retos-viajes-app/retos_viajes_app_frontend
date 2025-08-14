import { Colors } from "@/constants/Colors";
import globalStyles from "@/styles/global";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

//Icons
import { UserRoundPlus } from "lucide-react-native";

interface UserCardProps {
  name: string;
  username: string;
  profile_photo_url: string;
  onPressAdd: () => void;
}

export default function UserCard({ name, username, profile_photo_url, onPressAdd }: UserCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: profile_photo_url || "https://via.placeholder.com/50" }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.nickname}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
        <UserRoundPlus size={24} color={Colors.colors.primary['900']} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",          // ✅ Ocupar ancho completo
    alignSelf: "stretch",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#e0e0e0",
  },
  nickname: {
    ...globalStyles.largeBodySemiBold
  },
  username: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.text.secondary,
  },
  addButton: {
    padding: 8,
    backgroundColor: Colors.colors.primary['50'],
    borderRadius: 20,
  },
});
