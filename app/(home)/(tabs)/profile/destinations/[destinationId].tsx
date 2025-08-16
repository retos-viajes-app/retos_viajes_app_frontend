import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

// Hooks y Componentes
import SpecificTripCard from '@/components/profile/SpecificTripCard';
import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import { useDestinationTrips } from '@/hooks/useDestinationTrips';
import { useAuth } from '@/hooks/useAuth';
import { Check } from 'lucide-react-native';
import PaddingView from '@/components/views/PaddingView';
import { UserProfileTripItem } from '@/models/profileData';


export default function DestinationDetailScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
   const router = useRouter();
  const { destinationId, cityName, headerImageUrl } = useLocalSearchParams<{ 
    destinationId: string;
    cityName: string;
    headerImageUrl: string;
  }>();

  const destinationIdNumber = parseInt(destinationId ?? '0', 10);

  const { trips, isLoading, isLoadingMore, error, loadMoreTrips } = useDestinationTrips(user?.id, destinationIdNumber);

  const handleTripPress = (trip: UserProfileTripItem) => {
    router.push({
      pathname: "/profile/trips/[tripId]",
      params: {
        tripId: trip.id.toString(),
        cityName,
        headerImageUrl,
        startDate: trip.start_date,
        endDate: trip.end_date,
        missionsCount: trip.completed_challenges_count.toString(),
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.colors.primary[400]} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error}</Text>
      </View>
    );
  }


  const renderHeader = () => (
    <View>
      <ImageBackground
        source={{ uri: headerImageUrl }}
        style={styles.headerImage}
      >
         <View style={styles.headerOverlay}>
          <Text style={styles.cityName}>{cityName}</Text>
          
          {/* Componente "Visitado" */}
          <View style={styles.visitedContainer}>
            <View style={styles.visitedIconWrapper}>
             <Check size={16} color={Colors.colors.success[800]} />
            </View>
            <Text style={styles.visitedText}>{t('profile.visited')}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('profile.destinationScreen.title', { userName: user?.name ?? '' }), headerBackTitle: t('back'),}} />
      {renderHeader()}
      <PaddingView>
      <FlatList
        data={trips}
        renderItem={({ item }) => {
            const formattedStartDate = new Date(item.start_date).toLocaleDateString();
            const formattedEndDate = new Date(item.end_date).toLocaleDateString();
            return (
            <SpecificTripCard
                imageUrl={item.last_challenge_image_url ?? 'URL_POR_DEFECTO_SI_ES_NULL'}
                startDate={formattedStartDate}
                endDate={formattedEndDate}
                missionsCompleted={item.completed_challenges_count}
                userAvatarUrl={user?.profile_photo_url ?? 'URL_AVATAR_POR_DEFECTO'} 
                extraParticipantsCount={4}
                onPress={() => handleTripPress(item)}
            />
            )
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator style={{ margin: 20 }} /> : null}
        onEndReached={loadMoreTrips}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
      </PaddingView>
    </>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.colors.background.default,
  },
  headerImage: {
    width: '100%',
    justifyContent: 'center',
  },
  headerOverlay: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  cityName: {
    ...globalStyles.diplaySemiBold, 
    color: Colors.colors.textWhite.primary,
  },
  visitedContainer: {
    borderRadius: 50,
    backgroundColor: Colors.colors.secondary[50],
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitedIconWrapper: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: Colors.colors.secondary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitedText: {
    ...globalStyles.mediumBodyMedium,
    color: Colors.colors.success[800],
    padding: 8
  },
  listContainer: {
    gap: 8,
    paddingBottom: 120
  },
  columnWrapper: {
    justifyContent: 'space-between',
    columnGap: 8,
  },
});