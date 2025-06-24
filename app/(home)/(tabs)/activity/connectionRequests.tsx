import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';

// Style Imports
import globalStyles from '@/styles/global';
import { Colors } from '@/constants/Colors';
import ErrorText from '@/components/text/ErrorText';
import { LoadingScreen } from '@/components/LoadingScreen';
import PaddingView from '@/components/views/PaddingView'; // Asumo que tienes este componente
import { useSuggestedUsers } from '@/hooks/useSuggestedUsers';
import { ConnectionRequestUser } from '@/context/SuggestedUsersContext';
import { useTranslation } from 'react-i18next';


// Usaremos la imagen de perfil de tus MOCK_NOTIFICATIONS como ejemplo
const MOCK_PROFILE_IMAGE_PERSON = 'https://randomuser.me/api/portraits/men/1.jpg'; // Imagen genérica para perfiles



export default function ConnectionRequestsScreen() {
  const { pendingConnectionRequests, loadingPendingRequests, getPendingConnectionRequests, acceptConnectionRequest, denyConnectionRequest} = useSuggestedUsers();
  const [actionLoading, setActionLoading] = useState<Record<number, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();
  const router = useRouter();

  const handleAcceptRequest = async (userId: number) => {
    console.log(`Solicitud aceptada para el usuario: ${userId}`);
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    const response = await acceptConnectionRequest(userId);
    if(!response.success){
      Alert.alert("Error", "No se puedo aceptar la solicitud")
    }
    setActionLoading(prev => ({ ...prev, [userId]: false }));
  };

  const handleDenyRequest = async (userId: number) => {
    console.log(`Solicitud denegada para el usuario: ${userId}`);
    setActionLoading(prev => ({ ...prev, [userId]: true }));
     const response = await denyConnectionRequest(userId);
    if (!response.success) {
      Alert.alert('Error', 'No se pudo denegar la solicitud.');
    }
    // La lista se actualiza automáticamente en el contexto
    setActionLoading(prev => ({ ...prev, [userId]: false }));
  };

  const renderConnectionRequestItem = ({ item }: { item: ConnectionRequestUser }) => {
    const profileImage = item.profile_photo_url|| 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
    const isLoadingAction = actionLoading[item.id] || false;
    return (
      <View style={styles.requestItemContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.usernameText}>@{item.username}</Text>
          <Text style={styles.fullNameText}>{item.name}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton, isLoadingAction && styles.buttonDisabled]}
            onPress={() => handleAcceptRequest(item.id)}
            activeOpacity={isLoadingAction ? 1 : 0.7}
            disabled={isLoadingAction}
          >
           {isLoadingAction && actionLoading[item.id] && <Text style={[styles.buttonText, styles.acceptButtonText]}>...</Text> }
            {!isLoadingAction && <Text style={[styles.buttonText, styles.acceptButtonText]}>Aceptar</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.denyButton, isLoadingAction && styles.buttonDisabled]}
            onPress={() => handleDenyRequest(item.id)}
            activeOpacity={isLoadingAction ? 1 : 0.7}
            disabled={isLoadingAction}
          >
            {isLoadingAction && actionLoading[item.id] && <Text style={[styles.buttonText, styles.denyButtonText]}>...</Text> }
            {!isLoadingAction && <Text style={[styles.buttonText, styles.denyButtonText]}>Denegar</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loadingPendingRequests) return <LoadingScreen />;

  if (errorMessage) {
    return (
      <View style={[styles.screenContainer, styles.centered]}>
        <ErrorText text={errorMessage} />
      </View>
    );
  }

  if (pendingConnectionRequests.length === 0 && !loadingPendingRequests) {
    return (
      <View style={[styles.screenContainer, styles.centered]}>
        <Text style={styles.noRequestsText}>{t("notifications.noNotifications")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <PaddingView>
        <FlatList
          data={pendingConnectionRequests}
          renderItem={renderConnectionRequestItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        />
      </PaddingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  centered: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  noRequestsText: {
    ...globalStyles.mediumBodyRegular,
    color: Colors.colors.gray[500],
    textAlign: 'center',
  },
  requestItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.colors.gray[200],
    marginRight: 8,
  },
  userInfoContainer: {
    flex: 1,
  },
  usernameText: {
    ...globalStyles.mediumBodyBold,
    fontSize: 14,
    lineHeight: 16,
    color: Colors.colors.neutral[500],
    marginBottom: 2,
  },
  fullNameText: {
    ...globalStyles.mediumBodyRegular,
    color: Colors.colors.gray[500],
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16, 
    marginLeft: 8,
    minWidth: 80, 
    alignItems: 'center', 
  },
  acceptButton: {
    backgroundColor: Colors.colors.primary[100],
  },
  denyButton: {
    backgroundColor: Colors.colors.primary[500],
  },
  buttonText: {
    ...globalStyles.smallBodySemiBold,
    fontWeight: '600',
  },
  acceptButtonText: {
    color: Colors.colors.neutral[100],
  },
  denyButtonText: {
    color: Colors.colors.primary[100],
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});