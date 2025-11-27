import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, RefreshControl, AppState, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// Style Imports
import globalStyles from '@/styles/global'; 
import { Colors } from '@/constants/Colors'; 
import ErrorText from '@/components/text/ErrorText';
import { LoadingScreen } from '@/components/LoadingScreen';
import PaddingView from '@/components/views/PaddingView';
import { useSuggestedUsers } from '@/hooks/useSuggestedUsers';
import { Trans, useTranslation } from 'react-i18next';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from '@/models/notification';
import { useAuth } from '@/hooks/useAuth';
import { useTimeAgo } from '@/hooks/useTimeAgo';


export default function NotificationsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const getTimeAgo = useTimeAgo();
  const { pendingConnectionRequests, getPendingConnectionRequests } = useSuggestedUsers();
  const { 
    notifications, 
    loading, 
    error, 
    pagination, 
    fetchNotifications, 
    markAllAsRead 
  } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await fetchNotifications(1);
          await markAllAsRead();
          getPendingConnectionRequests();
        } catch (e) {
          console.error("Error initializing notifications screen:", e);
        }
      })();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    try {
      await fetchNotifications(1);
      await markAllAsRead();
      await getPendingConnectionRequests();
    } catch (e) {
      console.error("Error refreshing notifications:", e);
    }
  }, [fetchNotifications, getPendingConnectionRequests]);

  const handleFriendRequestPress = () => {
    router.push('/activity/connectionRequests');
  };

  const loadMore = () => {
    if (loading || !pagination?.has_more) return;
    fetchNotifications((pagination?.page || 1) + 1);
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => {
    console.log("Rendering notification item:", item);
    let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] | null = null;
    let iconColor = Colors.colors.error[400];
    let textContent: React.ReactNode;
    let profileImage = item.actor?.profile_photo_url || 'URL_A_TU_IMAGEN_POR_DEFECTO';

    if (item.type === 'badge') {
      profileImage = user?.profile_photo_url || 'URL_A_TU_IMAGEN_POR_DEFECTO';
    }

    const isUnread = !item.is_read;

    const itemStyle = [
      styles.notificationItemContainer,
      isUnread && styles.unreadNotification
    ];

    switch (item.type) {
      case 'like':
        iconName = 'heart';
        iconColor = Colors.colors.error[500];
        textContent = (
          <Text style={styles.notificationText}>
            <Trans
              i18nKey="activity.notifications.like"
              components={{
                username: (
                  <Text style={{ color: Colors.colors.primary[500] }}>
                    @{item.actor?.username}
                  </Text>
                ),
                title: (
                  <Text style={styles.boldText}>
                    {item.completed_challenge?.challenge_title}
                  </Text>
                )
              }}
            />
          </Text>
        );
        break;

      case 'badge':
        iconName = 'check-decagram';
        iconColor = Colors.colors.success[500];
        textContent = (
          <Text style={styles.notificationText}>
            <Trans
              i18nKey="activity.notifications.badge"
              components={{
                badge: (
                  <Text style={styles.boldText}>
                    {item.badge_name}
                  </Text>
                )
              }}
            />
          </Text>
        );
        break;

      case 'connection_request_accepted':
        iconName = 'account-check';
        iconColor = Colors.colors.primary[500];
        textContent = (
          <Text style={styles.notificationText}>
            <Trans
              i18nKey="activity.notifications.connectionAccepted"
              components={{
                username: (
                  <Text style={styles.usernameText}>
                    @{item.actor.username}
                  </Text>
                )
              }}
            />
          </Text>
        );
        break;

      default:
        return null;
    }

    return (
      <TouchableOpacity style={itemStyle} activeOpacity={0.7}>
        <View>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          {iconName && (
            <View style={[styles.notificationIconOverlay, { backgroundColor: Colors.colors.textWhite.primary }]}>
              <MaterialCommunityIcons name={iconName} size={16} color={iconColor} />
            </View>
          )}
        </View>

        <View style={styles.notificationTextContent}>
          {textContent}
          <Text style={styles.notificationTimestamp}>
            {getTimeAgo(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = useCallback(() => {
    const pendingCount = pendingConnectionRequests.length;
    return(
      <TouchableOpacity 
        style={styles.connectionRequestsContainer} 
        onPress={pendingCount > 0 ? handleFriendRequestPress : undefined}
        activeOpacity={pendingCount > 0 ? 0.8 : 1}
      >
        <View style={styles.connectionRequestsIconWrapper}>
          <Feather name="users" size={24} color={Colors.colors.neutral[500]} />
        </View>
        <View style={styles.friendRequestTextContainer}>
          <Text style={styles.connectionRequestsTitle}>{t("activity.notifications.requestsButton")}</Text>
          {pendingCount > 0 ? (
            <Text style={styles.connectionRequestsSubtitle}>
              {t("activity.notifications.pendingRequest", { count: pendingCount })}
            </Text>
          ) : (
            <Text style={styles.connectionRequestsSubtitle}>
              {t("activity.notifications.noPendingRequests")}
            </Text>
          )}
        </View>
        {pendingCount > 0 ? (
          <MaterialCommunityIcons name="chevron-right" size={28} color={Colors.colors.text.primary} />
        ) : null}
      </TouchableOpacity>
    )
  }, [pendingConnectionRequests, handleFriendRequestPress, t]);

  const ListFooter = () => {
    if (loading && notifications.length > 0) {
      return <ActivityIndicator style={{ marginVertical: 20 }} color={Colors.colors.primary[300]} />;
    }
    return null;
  };

  if (loading && notifications.length === 0) return <LoadingScreen />;
  if (error && notifications.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ErrorText text={error} />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <PaddingView>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => String(item.id)}
        style={styles.listContainer}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        onRefresh={onRefresh}
        refreshing={loading} 
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={
          !loading && notifications.length === 0 ? (
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
  centeredMessage: {
    marginTop: 50,
    alignItems: 'center',
  },
  noDataText: {
    ...globalStyles.mediumBodyRegular,
    color: Colors.colors.text.secondary,
  },
  connectionRequestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.colors.textWhite.primary,
    padding: 16,
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.00,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: 'rgba(102, 112, 133, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.colors.primary[300],
    paddingLeft: 13,
  },
  usernameText: {
    color: Colors.colors.primary[500],
    fontWeight: '600'
  },
  boldText: {
    color: Colors.colors.neutral[500],
    fontWeight: '600'
  },
  connectionRequestsIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.colors.background.default,
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
    backgroundColor: Colors.colors.border.default,
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
    borderColor: Colors.colors.textWhite.primary,
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
    color: Colors.colors.text.secondary, 
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.colors.textWhite.primary,
  }
});