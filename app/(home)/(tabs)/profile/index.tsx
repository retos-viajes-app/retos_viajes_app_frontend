// React & React Native Imports
import { View, Button, StyleSheet, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

// Components imports
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import XPProgressBar from '@/components/profile/XPProgressBar';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import BadgeCard from '@/components/profile/BadgeCard';
import TripCard from '@/components/profile/TripCard';

// Hook Imports
import { useAuth } from '@/hooks/useAuth';

// Style Imports
import globalStyles from '@/styles/global';
import { Colors } from '@/constants/Colors';

// Model Imports
import { ActiveTab, BadgeFilter, BadgeGridItem, DestinationProfileShort, ProfileListItem } from '@/models/profileData';
import { useUserProfile } from '@/hooks/useUserProfile';



export const MOCK_BADGES: BadgeGridItem[] = [
  { id: '1', type: 'badge', title: 'Catador Internacional', description: 'Completa misiones gastronómicas', currentProgress: 1, totalProgress: 15, icon: "hola" },
  { id: '2', type: 'badge', title: 'Aventurero nato', description: 'Completa 10 misiones de Naturaleza', currentProgress: 10, totalProgress: 10, icon: "hola" },
  { id: '3', type: 'badge', title: 'Nómada Urbano', description: 'Visita 5 capitales', currentProgress: 3, totalProgress: 5, icon: "hola"},
  { id: '4', type: 'badge', title: 'Amante del Arte', description: 'Completa 20 misiones de cultura', currentProgress: 18, totalProgress: 20, icon: "hola" },
];


export default function ProfileScreen() {
  const router = useRouter();
  const {user, logout } = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ActiveTab>('trips');
  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>('all');

  const { profile, destinations, isLoading, isLoadingMore, isRefreshing,
    error, loadMoreDestinations, handleRefresh } = useUserProfile(user?.id);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error de Conexión',
        text2: error,
      });
    }
  }, [error]);
  
  const tabs: { key: ActiveTab; label: string }[] = [
    { key: 'trips', label: t('profile.myTrips') },
    { key: 'badges', label: t('profile.myBadges') },
  ];
  
  const handleLogout = async () => {
    logout();
    router.replace("/login"); 
  };

  const listData: ProfileListItem[] = useMemo(() => {
    if (activeTab === 'trips') {
      return destinations;
    }
    if (activeTab === 'badges') {
      switch (badgeFilter) {
        case 'completed':
          return MOCK_BADGES.filter(badge => badge.currentProgress >= badge.totalProgress);
        case 'incomplete':
          return MOCK_BADGES.filter(badge => badge.currentProgress < badge.totalProgress);
        default:
          return MOCK_BADGES;
      }
    }
    return [];
  }, [activeTab, destinations, badgeFilter]);

  if (isLoading) {
    return (
       <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.colors.primary[400]} />
      </View>
    );
  }

  
  const renderListHeader = () => (
    <>
      <View style={{gap: 24}}>
        <ProfileHeader
          name={profile?.name ?? user?.name ?? 'Nombre...'}
          username={profile?.username ?? user?.username ?? 'Nombre de usuario...'}
          location={"Málaga, España"}
          bio={profile?.bio ?? user?.bio ?? null}
          profileImage={profile?.profile_photo_url ?? user?.profile_photo_url ?? null}
        />
        <XPProgressBar
          title="Viajero experto"
          currentXp={500}
          totalXp={1540}
        />
        <ProfileStats
          countries={profile?.stats.countries_visited ?? 0}
          missions={profile?.stats.completed_challenges ?? 0}
          contacts={profile?.stats.contacts ?? 0}
        />
        <PrimaryButton
          title={t("profile.editProfile")}
          onPress={() => console.log("edit")}
          style={globalStyles.largeBodySemiBold}
          variant='secondary'
        />
        <View style={styles.logoutContainer}>
          <Button title="Cerrar sesión" onPress={handleLogout} color="#FF3B30" />
        </View>

        {/* My Trips/My Badges Tabs */}
        <View style={styles.tabSelector}>
          {tabs.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveTab(key)}
              style={[styles.tabButton, activeTab === key && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === key && styles.activeTabText]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Badges filter */}
      {activeTab === 'badges' && (
        <View style={styles.filterContainer}>
          {(['all', 'completed', 'incomplete'] as const).map(key => (
            <TouchableOpacity
              key={key}
              onPress={() => setBadgeFilter(key)}
              style={[styles.filterButton, badgeFilter === key && styles.activeFilterButton]}
            >
              <Text style={[styles.filterButtonText, badgeFilter === key && styles.activeFilterButtonText]}>
                {t(`profile.badges.${key}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );

   const renderItem = ({ item }: { item: ProfileListItem }) => {
    if (activeTab === 'trips') {
      const tripItem = item as DestinationProfileShort;
      return (
        <TripCard
          id={tripItem.id}
          city={tripItem.city}
          imageUri={tripItem.image_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsnllDGL0RKDLU0BToL0PubWcudzVTQtMr3Q&s"}
          tripCount={tripItem.trip_count}
        />
      );
    }
    if (activeTab === 'badges') {
      const badgeItem = item as BadgeGridItem;
      return (
        <BadgeCard
          icon={badgeItem.icon}
          title={badgeItem.title}
          description={badgeItem.description}
          currentProgress={badgeItem.currentProgress}
          totalProgress={badgeItem.totalProgress}
        />
      );
    }
    return null;
  };
  
  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      key={activeTab} 
      style={{ backgroundColor: Colors.colors.textWhite.primary }}
      ListHeaderComponent={renderListHeader}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator style={{ marginVertical: 20 }} color={Colors.colors.primary[400]} />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.colors.primary[400]}
        />
      }
      numColumns={2}
      contentContainerStyle={styles.listContentContainer}
      columnWrapperStyle={styles.columnWrapper}
      onEndReached={loadMoreDestinations}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colors.textWhite.primary,
    paddingHorizontal: 20,
  },
  headerContainer: {
    gap: 24,
    paddingBottom: 24,
  },
  logoutContainer: {
    marginHorizontal: 20
  },
  listContentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 120
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
  },
  tabSelector: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.colors.primary[200],
    marginBottom: 24
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    ...globalStyles.largeBodyMedium,
    color: Colors.colors.primary[300]
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.colors.primary[400],
  },
  activeTabText: {
    ...globalStyles.largeBodyBold,
    color: Colors.colors.primary[400]
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24
  },
  filterButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.colors.primary[300],
    backgroundColor: Colors.colors.primary[50]
  },
  filterButtonText: {
    ...globalStyles.largeBodyMedium,
    color: Colors.colors.primary[300],
  },
  activeFilterButton: {
    backgroundColor: Colors.colors.primary[300],
  },
  activeFilterButtonText: {
    ...globalStyles.largeBodySemiBold,
    color: Colors.colors.textWhite.primary,
  },
});
