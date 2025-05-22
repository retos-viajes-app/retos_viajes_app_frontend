// React & React Native Imports
import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from "react-native";

// Component Imports
import UserCard from "@/components/UserCard";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Model Imports
import { UserWithConnectionStatus } from "@/models/userConnections";


// Third-Party Imports
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useSuggestedUsers } from "@/hooks/useSuggestedUsers";


const SuggestedUsers: React.FC = () => {
  const {
  suggestedUsers,
  updateUserStatus,
  addConnectingUserId,
  removeConnectingUserId,
  isUserConnecting,
  sendConnectionRequest,
  cancelConnectionRequest,
  getSuggestedUsers,
  hasMore,
  loading,
  page,
  setPage
} = useSuggestedUsers();

  const [initialLoading, setInitialLoading] = useState(true);
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);


  useEffect(() => {
    getSuggestedUsers(1).then((res) => {
      if (res.success) setPage(1);
      setInitialLoading(false);
    });
  }, []);

 const handleLoadMore = async () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      const result = await getSuggestedUsers(nextPage);
      if (result.success) {
        setPage(nextPage);
      }
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
         text2: error,
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
        text2: error,
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
        <Text style={styles.title}>{t("suggestedUsers.title")}</Text>
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
        <Text style={styles.title}>{t("suggestedUsers.title")}</Text>
        <View>
          <Text>
            {t("suggestedUsers.noUsers")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("suggestedUsers.title")}</Text>

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
