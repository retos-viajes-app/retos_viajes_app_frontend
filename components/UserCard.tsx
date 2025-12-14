// React & React Native Imports
import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Model Imports
import { UserWithConnectionStatus } from "@/models/userConnections";
import ConnectButton from "./buttons/ConnectButton";

interface UserCardProps {
  user: UserWithConnectionStatus;
  onConnect: () => void;
  onCancelRequest: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onConnect,
  onCancelRequest,
}) => {
  const { name, username, profile_photo_url, connection_status } = user;

  return (
    <View style={styles.card}>
      <View style={styles.userData}>
        <View style={styles.profileImageWrapper}>
        <Image
          source={{
            uri:
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Frandom-person&psig=AOvVaw3VZNnD33skWOwdA12TYqTs&ust=1752762853190000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCV4MvMwY4DFQAAAAAdAAAAABAE"
          }}
          style={styles.profileImage}
        />
        </View>
        <View>
          <Text style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>

          <Text style={styles.usernameText} numberOfLines={1}>
            @{username}
          </Text>
        </View>
        
      </View>
      <ConnectButton
        connectionStatus={connection_status}
        onConnect={onConnect}
        onCancelRequest={onCancelRequest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 172,
    backgroundColor: Colors.colors.textWhite.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.colors.border.default,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    shadowColor: "#2C3E5026",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  userData:{
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  profileImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  nameText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.colors.text.primary,
    textAlign: "center",
  },
  usernameText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "400",
    color: Colors.colors.text.secondary,
    textAlign: "center",
  },
});

export default UserCard;