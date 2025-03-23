import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import UserCard from "./UserCard";
import { useConnectUser } from "@/hooks/useConnectUser";
import { getUserSuggestions } from "@/services/user_connections_service";
import { UserWithConnectionStatus } from "@/models/userConnections";

const ConnectUsers: React.FC = () => {
  const [users, setUsers] = useState<UserWithConnectionStatus[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [connectingUserId, setConnectingUserId] = useState<number | null>(null);
  const { sendConnectionRequest, cancelConnectionRequest} = useConnectUser();
  const flatListRef = useRef<FlatList>(null);

  const fetchUsers = async (currentPage: number) => {
    if ((loading && currentPage > 1) || !hasMore) return;

    setLoading(true);
    try {
      const response = await getUserSuggestions(currentPage);
      const formattedUsers = response.users.map(
        (user: UserWithConnectionStatus) => ({
          ...user,
          connection_status: "none" as "none",
        })
      );
      setUsers((prevUsers: UserWithConnectionStatus[]) =>
        currentPage === 1 ? formattedUsers : [...prevUsers, ...formattedUsers]
      );
      setHasMore(response.pagination.has_more);
      setError(null);
    } catch (error) {
      setError("No se pudieron cargar los usuarios sugeridos");
      console.error("Error fetching user suggestions:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  const handleConnect = async (userId: number) => {
    if (!userId) return;
    setConnectingUserId(userId); 
    try {
      await sendConnectionRequest(userId);
      // Actualizar el estado local del usuario tras enviar la solicitud
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, connection_status: "pending" } : user
        )
      );
    } catch (error) {
      console.error("Error sending connection request:");
      setError("Error sending connection request:");
    }finally{
      setConnectingUserId(null);
    }
  };
  const handleCancelRequest = async (userId: number) => {
    if (!userId) return;
    setConnectingUserId(userId);
    try {
      await cancelConnectionRequest(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, connection_status: "none" } : user
        )
      );
    } catch (error) {
      console.error("Error canceling connection request:", error);
      setError("Error canceling connection request");
    } finally {
      setConnectingUserId(null);
    }
  };

  const handleRetry = () => {
    setError(null);
    setPage(1);
    fetchUsers(1);
  };

  const renderItem = ({ item }: { item: UserWithConnectionStatus }) => (
    <UserCard
      user={item}
      onConnect={() => item.id && handleConnect(item.id)}
      onCancelRequest={() => item.id && handleCancelRequest(item.id)}
      isConnecting={connectingUserId == item.id}
    />
  );

  // Mostrar estado de carga inicial
  if (initialLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conecta con otros viajeros</Text>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      </View>
    );
  }

  // Mostrar mensaje de error si ocurre
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conecta con otros viajeros</Text>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Si no hay usuarios, mostrar mensaje
  if (users.length === 0 && !loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conecta con otros viajeros</Text>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            No hay usuarios sugeridos disponibles
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conecta con otros viajeros</Text>

      <FlatList
        ref={flatListRef}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id!.toString()
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          loading && !initialLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0066CC" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  loaderContainer: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  centerContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#0066CC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
export default ConnectUsers;
