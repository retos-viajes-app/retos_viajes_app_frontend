import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';

// Style Imports
import globalStyles from '@/styles/global';
import { Colors } from '@/constants/Colors';

// Components Imports
import ErrorText from '@/components/text/ErrorText';
import { LoadingScreen } from '@/components/LoadingScreen';
import PaddingView from '@/components/views/PaddingView';

// Hooks Imports
import { useSuggestedUsers } from '@/hooks/useSuggestedUsers';

// Models imports
import User from '@/models/user';
import { useTranslation } from 'react-i18next';


const DEFAULT_PROFILE_IMAGE = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';


export default function ConnectionRequestsScreen() {
  const { pendingConnectionRequests, loadingPendingRequests, acceptConnectionRequest, denyConnectionRequest} = useSuggestedUsers();
  const [actionLoading, setActionLoading] = useState<Record<number, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleAcceptRequest = async (userId: number) => {
    console.log(`Solicitud aceptada para el usuario: ${userId}`);
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    const response = await acceptConnectionRequest(userId);
    if (!response.success) {
      setErrorMessage(response.error || "No se pudo completar la acción.");
    } else {
      setErrorMessage(null);
    }
    setActionLoading(prev => ({ ...prev, [userId]: false }));
  };

  const handleDenyRequest = async (userId: number) => {
    console.log(`Solicitud denegada para el usuario: ${userId}`);
    setActionLoading(prev => ({ ...prev, [userId]: true }));
     const response = await denyConnectionRequest(userId);
    if (!response.success) {
      setErrorMessage(response.error || "No se pudo completar la acción.");
    } else {
      setErrorMessage(null);
    }
    setActionLoading(prev => ({ ...prev, [userId]: false }));
  };

  const renderConnectionRequestItem = ({ item }: { item: User }) => {
    const profileImage = item.profile_photo_url|| DEFAULT_PROFILE_IMAGE;
    const isLoadingAction = (item.id !== undefined && actionLoading[item.id]) || false;
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
            onPress={() => { if (item.id !== undefined) handleAcceptRequest(item.id); }}
            activeOpacity={isLoadingAction ? 1 : 0.7}
            disabled={isLoadingAction || item.id === undefined}
          >
            <Text style={[styles.buttonText, styles.acceptButtonText]}>
              {isLoadingAction ? "..." : t("activity.connections.accept")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.denyButton, isLoadingAction && styles.buttonDisabled]}
            onPress={() => { if (item.id !== undefined) handleDenyRequest(item.id); }}
            activeOpacity={isLoadingAction ? 1 : 0.7}
            disabled={isLoadingAction}
          >
            <Text style={[styles.buttonText, styles.denyButtonText]}>
              {isLoadingAction ? "..." : t("activity.connections.deny")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loadingPendingRequests) return <LoadingScreen />;

  if (errorMessage && !loadingPendingRequests) {
    return (
      <View style={[styles.screenContainer, styles.centered]}>
        <ErrorText text={errorMessage} />
      </View>
    );
  }

  if (pendingConnectionRequests.length === 0 && !loadingPendingRequests) {
    return (
      <View style={[styles.screenContainer, styles.centered]}>
        <Text style={styles.noRequestsText}>{t("activity.connections.noPending")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <PaddingView>
        <FlatList
          data={pendingConnectionRequests}
          renderItem={renderConnectionRequestItem}
          keyExtractor={(item) => item.id!.toString()}
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