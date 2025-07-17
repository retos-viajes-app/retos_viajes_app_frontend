// React & React Native Imports
import { View, Button, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

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
import { ActiveTab, BadgeData, TripData, TripOrBadgeItem } from '@/models/profileData';

export const PROFILE_DATA = {
  name: 'Ángel Moreno',
  username: 'angeelmoreno',
  location: 'Málaga, España',
  bio: 'El mundo es como un libro, y los que no viajan, solo leen una página ✈️',
  avatar: 'https://images.ecestaticos.com/VzYB6ne-gX80XGJsWpepmPSLWr0=/0x0:2272x1514/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fff0%2Fae0%2Ff92%2Fff0ae0f926a0fd7e615f18e180b9b09d.jpg',
  level: 'Viajero experto',
  xp: 500,
  xpGoal: 1540,
  stats: {
    countries: 12,
    missions: 158,
    contacts: 4512,
  },
};

export const TRIPS_DATA: TripData[] = [
  { id: '1', type: 'trip', city: 'Málaga', tripCount: 2, image: 'https://xior.es/wp-content/uploads/2020/08/Malaga.max-2000x1000_kwQtHaD.jpg' },
  { id: '2', type: 'trip', city: 'Madrid', tripCount: 1, image: 'https://images.unsplash.com/photo-1543786653-7323c24b6f7a?q=80&w=2835&auto=format&fit=crop' },
  { id: '3', type: 'trip', city: 'Barcelona', tripCount: 2, image: 'https://images.unsplash.com/photo-1528742842631-4a18246a6318?q=80&w=2940&auto=format&fit=crop' },
  { id: '4', type: 'trip', city: 'Roma', tripCount: 3, image: 'https://content-viajes.nationalgeographic.com.es/medio/2024/09/13/coliseo_37c26845_240913142611_1200x800.jpg' },
];

export const MOCK_BADGES: BadgeData[] = [
  { id: '1', type: 'badge', title: 'Catador Internacional', description: 'Completa misiones gastronómicas', currentProgress: 1, totalProgress: 15, icon: "hola" },
  { id: '2', type: 'badge', title: 'Aventurero nato', description: 'Completa 10 misiones de Naturaleza', currentProgress: 10, totalProgress: 10, icon: "hola" },
  { id: '3', type: 'badge', title: 'Nómada Urbano', description: 'Visita 5 capitales', currentProgress: 3, totalProgress: 5, icon: "hola"},
  { id: '4', type: 'badge', title: 'Amante del Arte', description: 'Completa 20 misiones de cultura', currentProgress: 18, totalProgress: 20, icon: "hola" },
];


export default function ProfileScreen() {
  const router = useRouter();
  const {logout, user} = useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'trips' | 'badges'>('trips');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const tabs: { key: ActiveTab; label: string }[] = [
    { key: 'trips', label: t('profile.myTrips') },
    { key: 'badges', label: t('profile.myBadges') },
  ];
  
  const handleLogout = async () => {
    logout();
    router.replace("/login"); 
  };

  const filteredData = useMemo(() => {
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
    return TRIPS_DATA;
  }, [activeTab, badgeFilter]);
  
  
  const renderListHeader = () => (
    <>
      <View style={{gap: 24}}>
        <ProfileHeader
          name={PROFILE_DATA.name}
          username={PROFILE_DATA.username}
          location={PROFILE_DATA.location}
          bio={PROFILE_DATA.bio}
          profileImage={PROFILE_DATA.avatar}
        />
        <XPProgressBar
          title="Viajero experto"
          currentXp={500}
          totalXp={1540}
        />
        <ProfileStats
          countries={PROFILE_DATA.stats.countries}
          missions={PROFILE_DATA.stats.missions}
          contacts={PROFILE_DATA.stats.contacts}
        />
        <PrimaryButton
          title={t("profile.editProfile")}
          onPress={() => console.log("edit")}
          style={globalStyles.largeBodySemiBold}
          variant='secondary'
        />
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

   const renderListFooter = () => (
      <View style={styles.logoutContainer}>
          <Button title="Cerrar sesión" onPress={handleLogout} color="#FF3B30" />
      </View>
  );

   const renderItem = ({ item }: { item: TripOrBadgeItem }) => {
    if (item.type === 'trip') {
      return (
        <TripCard
          city={item.city}
          imageUri={item.image}
          tripCount={item.tripCount}
        />
      );
    } else {
      return <BadgeCard {...item} />;
    }
  };
  
  return (
    <FlatList<TripOrBadgeItem>
      style={{ backgroundColor: Colors.colors.textWhite.primary }}
      ListHeaderComponent={renderListHeader}
      ListFooterComponent={renderListFooter}
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      key={activeTab} 
      contentContainerStyle={styles.listContentContainer}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 24,
    paddingBottom: 24,
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingBottom: 100
  },
  listContentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
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
