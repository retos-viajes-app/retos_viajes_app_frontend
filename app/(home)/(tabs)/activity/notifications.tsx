import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, RefreshControl, AppState } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// Style Imports
import globalStyles from '@/styles/global'; 
import { Colors } from '@/constants/Colors'; 
import ErrorText from '@/components/text/ErrorText';
import { LoadingScreen } from '@/components/LoadingScreen';
import PaddingView from '@/components/views/PaddingView';
import { useSuggestedUsers } from '@/hooks/useSuggestedUsers';
import { useTranslation } from 'react-i18next';

export interface NotificationUser {
  id: string;
  username: string;
  profileImageUrl?: string; 
}

export type NotificationType = 'like' | 'achievement' | 'friend_request_accepted';

export interface Notification {
  id: string;
  type: NotificationType;
  user?: NotificationUser;
  missionName?: string;
  badgeName?: string; 
  timestamp: string;
  isRead?: boolean;
}

const MOCK_PROFILE_IMAGE_MOUNTAIN = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'; 
const MOCK_PROFILE_IMAGE_PERSON = 'https://content.nationalgeographic.com.es/medio/2025/01/18/himalaya_68c32f8b_250118135425_800x800.webp';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: { id: 'user1', username: 'username', profileImageUrl: MOCK_PROFILE_IMAGE_MOUNTAIN },
    missionName: 'tu misión',
    timestamp: 'hace 2h',
  },
  {
    id: '2',
    type: 'achievement',
    badgeName: 'Rey de las tapas',
    timestamp: 'hace 2h',
    user: { id: 'currentUser', username: 'Tú', profileImageUrl: MOCK_PROFILE_IMAGE_PERSON }
  },
  {
    id: '3',
    type: 'like',
    user: { id: 'user2', username: 'username', profileImageUrl: MOCK_PROFILE_IMAGE_MOUNTAIN },
    missionName: 'tu misión',
    timestamp: 'hace 2h',
  },
  {
    id: '4',
    type: 'like',
    user: { id: 'user3', username: 'username', profileImageUrl: MOCK_PROFILE_IMAGE_MOUNTAIN },
    missionName: 'tu misión',
    timestamp: 'hace 2h',
  },
  {
    id: '5',
    type: 'like',
    user: { id: 'user4', username: 'username', profileImageUrl: MOCK_PROFILE_IMAGE_MOUNTAIN },
    missionName: 'tu misión',
    timestamp: 'hace 2h',
  },
];


export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [errorNotifications, setErrorNotifications] = useState<string | null>(null);
  const { pendingConnectionRequests, getPendingConnectionRequests, loadingPendingRequests} = useSuggestedUsers();
  const [refreshing, setRefreshing] = useState(false);
  const pollingRef = useRef<number | null>(null);
  const { t } = useTranslation(); 
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data
    const fetchNotifications = async () => {
      setLoadingNotifications(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotifications(MOCK_NOTIFICATIONS);
        setErrorNotifications(null);
      } catch (e) {
        setErrorNotifications('No se pudieron cargar las notificaciones.');
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, []);

  useFocusEffect(
  useCallback(() => {
    getPendingConnectionRequests();

    const startPolling = () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      pollingRef.current = setInterval(getPendingConnectionRequests, 60000);
    };

    const stopPolling = () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };

    startPolling();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') startPolling();
      else stopPolling();
    });

    return () => {
      stopPolling();
      subscription.remove();
    };
  }, [getPendingConnectionRequests])
);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPendingConnectionRequests();
    setRefreshing(false);
  }, [getPendingConnectionRequests]);

  const handleFriendRequestPress = () => {
    router.push('/activity/connectionRequests');
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] | null = null;
    let iconColor = Colors.colors.error[400];
    let textContent: React.ReactNode;
    let profileImage = item.user?.profileImageUrl 
    || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

    switch (item.type) {
      case 'like':
        iconName = 'heart';
        iconColor = Colors.colors.error[200];
        textContent = (
          <Text style={styles.notificationText}>
            A <Text style={{color: Colors.colors.primary[100]}}>@{item.user?.username}</Text> le ha gustado {item.missionName}.
          </Text>
        );
        break;
      case 'achievement':
        iconName = 'check-decagram'; // Or 'shield-check', 'trophy'
        iconColor = Colors.colors.success[200];
        textContent = (
          <Text style={styles.notificationText}>
            Has conseguido la insignia <Text style={[globalStyles.mediumBodySemiBold, {color: Colors.colors.neutral[500]}]}>{item.badgeName}</Text>
          </Text>
        );
        break;
      // Add more cases for other notification types
      default:
        return null;
    }

    return (
      <TouchableOpacity style={styles.notificationItemContainer} activeOpacity={0.7}>
        <View>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          {iconName && (
            <View style={[styles.notificationIconOverlay, { backgroundColor: Colors.colors.neutral[100]}]}>
              <MaterialCommunityIcons name={iconName} size={16} color={iconColor} />
            </View>
          )}
        </View>
        <View style={styles.notificationTextContent}>
          {textContent}
          <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = useCallback(() => (
    <TouchableOpacity style={styles.connectionRequestsContainer} onPress={handleFriendRequestPress} activeOpacity={0.8}>
      <View style={styles.connectionRequestsIconWrapper}>
        <Feather name="users" size={24} color={Colors.colors.neutral[500]} />
      </View>
      <View style={styles.friendRequestTextContainer}>
        <Text style={styles.connectionRequestsTitle}>{t("notifications.connectionNotifications")}</Text>
        { pendingConnectionRequests.length > 0 ? (
          <Text style={styles.connectionRequestsSubtitle}>
            {`${pendingConnectionRequests.length} Pendiente${pendingConnectionRequests.length > 1 ? 's' : ''}`}
          </Text>
        ) : (
            <Text style={styles.connectionRequestsSubtitle}>{t("notifications.noNotifications")}</Text>
        )}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={28} color={Colors.colors.gray[500]} />
    </TouchableOpacity>
 ), [pendingConnectionRequests, handleFriendRequestPress]);

  if (loadingNotifications && !refreshing) return <LoadingScreen />
  
  if (errorNotifications && !refreshing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ErrorText text={errorNotifications} />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <PaddingView>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[Colors.colors.primary[300]]} // Android
            tintColor={Colors.colors.primary[300]} // iOS
          />
        }
        ListEmptyComponent={
            !loadingNotifications && notifications.length === 0 ? (
              <View style={styles.centeredMessage}>
                <Text style={styles.noDataText}>No tienes notificaciones.</Text>
              </View>
            ) : null
         }
      />
      </PaddingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContainer: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredMessage: { // Para ListEmptyComponent
    marginTop: 50,
    alignItems: 'center',
  },
  noDataText: { // Para ListEmptyComponent
    ...globalStyles.mediumBodyRegular,
    color: Colors.colors.gray[400],
  },
  connectionRequestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.colors.neutral[100],
    padding: 16,
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 16,
    // Shadow (optional, adjust for desired effect)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.00,
    elevation: 2,
  },
  connectionRequestsIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendRequestTextContainer: {
    flex: 1,
  },
  connectionRequestsTitle: {
    ...globalStyles.largeBodyBold,
    color: Colors.colors.neutral[500]
  },
  connectionRequestsSubtitle: {
    ...globalStyles.smallBodySemiBold,
    color: Colors.colors.primary[300]
  },
  // Notification Item
  notificationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.colors.gray[200],
  },
  notificationIconOverlay: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 24,
    height: 24,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.colors.neutral[100],
  },
  notificationTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    ...globalStyles.mediumBodyRegular,
    color: Colors.colors.neutral["500"]
  },
  notificationTimestamp: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.gray[500],
    marginTop: 2,
  },
  container: { // For loading/error states
    flex: 1,
    backgroundColor: Colors.colors.neutral[100],
  }
});
