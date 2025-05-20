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
      <View style={styles.userInfoContainer}>
        <Image
          source={{
            uri:
              profile_photo_url ||
              "https://thumbs.dreamstime.com/b/imagen-del-placeholder-perfil-silueta-gris-ninguna-foto-127393523.jpg",
          }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              globalStyles.mediumBodySemiBold,
              { color: Colors.colors.gray[500] },
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={[
              globalStyles.extraSmallRegular,
              { color: Colors.colors.gray[500] },
            ]}
            numberOfLines={1}
          >
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
    backgroundColor: Colors.colors.neutral[100],
    borderRadius: 16,
    padding: 8,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Espacio entre la foto y el texto
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
});

export default UserCard;