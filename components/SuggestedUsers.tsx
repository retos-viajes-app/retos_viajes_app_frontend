// React & React Native Imports
import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

// Component Imports
import UserCard from "./UserCard";

// Hook Imports
import { useConnectUser } from "@/hooks/useConnectUser";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/ColoresPropios";

// Model Imports
import { UserWithConnectionStatus } from "@/models/userConnections";

// Service Imports
import { getUserSuggestions } from "@/services/user_connections_service";

// Third-Party Imports
import Toast from "react-native-toast-message";


const SuggestedUsers: React.FC = () => {
  const [users, setUsers] = useState<UserWithConnectionStatus[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [connectingUserIds, setConnectingUserIds] = useState<number[]>([]);
  const { sendConnectionRequest, cancelConnectionRequest} = useConnectUser();
  const flatListRef = useRef<FlatList>(null);

  const addConnectingUserId = (userId: number) =>
    setConnectingUserIds((prev) => [...prev, userId]);

  const removeConnectingUserId = (userId: number) =>
    setConnectingUserIds((prev) => prev.filter((id) => id !== userId));

  const isUserConnecting = (userId: number) => connectingUserIds.includes(userId);

  const updateUserStatus = (
    userId: number,
    newStatus: UserWithConnectionStatus["connection_status"]
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId ? { ...u, connection_status: newStatus } : u
      )
    );
  };

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
    if (isUserConnecting(userId)) return;
    addConnectingUserId(userId);
    const previousStatus = users.find((u) => u.id === userId)?.connection_status;
    updateUserStatus(userId, "pending");
    try {
      await sendConnectionRequest(userId);
    } catch (error : any) {
       updateUserStatus(userId, previousStatus);
       Toast.show({
         type: "error",
         text1: "Error",
         text2: error.message,
         position: "bottom",
         bottomOffset: 80,
       });
       
       /* Creo que solo funciona en móvil
       Alert.alert(
         "Error",
         "No se pudo completar la acción. Revisa tu conexión"
       );
       */
    }finally{
      removeConnectingUserId(userId);
    }
  };
  const handleCancelRequest = async (userId: number) => {
    if (isUserConnecting(userId)) return;
    addConnectingUserId(userId);
    const previousStatus = users.find((u) => u.id === userId)?.connection_status;
    updateUserStatus(userId, "none");
    try {
      await cancelConnectionRequest(userId);
     
    } catch (error : any) {
      updateUserStatus(userId, previousStatus);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "bottom",
        bottomOffset: 80,
      });

      /* Solo funciona en móvil
      Alert.alert(
        "Error",
        error.message
      );
      */
    } finally {
      removeConnectingUserId(userId);
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
    />
  );

  // Mostrar estado de carga inicial
  if (initialLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conecta con otros viajeros</Text>
        <View>
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
        <View>
          <Text>{error}</Text>
          <TouchableOpacity onPress={handleRetry}>
            <Text>Reintentar</Text>
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
        <View>
          <Text>
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
        keyExtractor={(item) => item.id!.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={
          loading && !initialLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={"#0066CC"} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.colors.primary[500],
    paddingHorizontal: 16, 
    paddingVertical: 20,
  },
  title: {
    width: "100%",
    height: 29,
    ...globalStyles.title,
    color: Colors.colors.gray[500],
    textAlign: "left",
    marginBottom: 16, // Gap de 16 entre título y cards
  },
  separator: {
    width: 10, // Gap de 10 entre cada tarjeta
  },
  listContentContainer: {
    paddingVertical: 4, // Pequeño padding vertical para las cards
  },
  loaderContainer: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
export default SuggestedUsers;
