// React & React Native Imports
import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

// Component Imports
import UserCard from "@/components/UserCard";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Model Imports
import { UserWithConnectionStatus } from "@/models/userConnections";

// Service Imports
import { cancelConnectionRequest, getSuggestedUsers, sendConnectionRequest } from "@/services/suggestedUsersService";

// Third-Party Imports
import Toast from "react-native-toast-message";


const SuggestedUsers: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<UserWithConnectionStatus[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const [connectingUserIds, setConnectingUserIds] = useState<number[]>([]);
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
    setSuggestedUsers((prevSuggestedUsers) =>
      prevSuggestedUsers.map((u) =>
        u.id === userId ? { ...u, connection_status: newStatus } : u
      )
    );
  };

  const fetchSuggestedUsers = async (currentPage: number) => {
    if ((loading && currentPage > 1) || !hasMore) return;
    setLoading(true);
    const response = await getSuggestedUsers(currentPage);

    setSuggestedUsers((prevSuggestedUsers: UserWithConnectionStatus[]) =>
      currentPage === 1 ? response.users : [...prevSuggestedUsers, ...response.users]
    );
    setHasMore(response.pagination.has_more);
    setLoading(false);
    setInitialLoading(false);
  };

  useEffect(() => {
    fetchSuggestedUsers(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSuggestedUsers(nextPage);
    }
  };
  
  const handleConnectRequest = async (userId: number) => {
    if (isUserConnecting(userId)) return;
    addConnectingUserId(userId);
    updateUserStatus(userId, "pending");
    const {success, error} = await sendConnectionRequest(userId);
    if (!success){
       updateUserStatus(userId, "none");
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
    }
    removeConnectingUserId(userId);
   
  };

  const handleCancelRequest = async (userId: number) => {
    if (isUserConnecting(userId)) return;
    addConnectingUserId(userId);
    updateUserStatus(userId, "none");
    const {success, error} = await cancelConnectionRequest(userId);
    if(!success){
      updateUserStatus(userId, "pending");
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
    }
    removeConnectingUserId(userId);
  };

  const renderItem = ({ item }: { item: UserWithConnectionStatus }) => (
    <UserCard
      user={item}
      onConnect={() => item.id && handleConnectRequest(item.id)}
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

  // Si no hay usuarios, mostrar mensaje
  if (suggestedUsers.length === 0 && !loading) {
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
        data={suggestedUsers}
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
