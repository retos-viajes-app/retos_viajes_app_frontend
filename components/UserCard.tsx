
import { UserWithConnectionStatus } from "@/models/userConnections";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";


interface UserCardProps {
  user: UserWithConnectionStatus;
  onConnect: () => void;
  onCancelRequest: () => void;
  isConnecting: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onConnect,
  onCancelRequest,
  isConnecting,
}) => {
  const { name, username, profile_photo_url, connection_status } = user;

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            profile_photo_url ||
            "https://thumbs.dreamstime.com/b/imagen-del-placeholder-perfil-silueta-gris-ninguna-foto-127393523.jpg",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.username} numberOfLines={1}>
        @{username}
      </Text>

      {connection_status === "pending" ? (
        <TouchableOpacity
          style={[styles.button, styles.pendingButton]}
          onPress={onCancelRequest}
        >
          <Text style={styles.pendingButtonText}>Pendiente</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.connectButton]}
          onPress={onConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.connectButtonText}>Conectar</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  connectButton: {
    backgroundColor: "#007AFF",
  },
  connectButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  pendingButton: {
    backgroundColor: "#E0E0E0",
  },
  pendingButtonText: {
    color: "#555555",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default UserCard;