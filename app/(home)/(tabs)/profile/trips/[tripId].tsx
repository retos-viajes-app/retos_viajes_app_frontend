import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

// Hooks y Component
import CompletedChallengePost from '@/components/activity/CompletedChallengePost';
import { getCompletedChallengesForTrip, likeCompletedChallenge, unlikeCompletedChallenge } from "@/services/completedChallengesService";
import { CompletedChallenge } from '@/models/completedChallenge';
import { useAuth } from '@/hooks/useAuth';

// Estilos
import { Colors } from '@/constants/Colors';
import globalStyles from '@/styles/global';
import { usePaginatedFeed } from '@/hooks/usePaginatedFeed';


const TripFeedScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const { tripId, cityName, headerImageUrl, startDate, endDate, missionsCount } = 
    useLocalSearchParams<{ 
      tripId: string;
      cityName: string;
      headerImageUrl: string;
      startDate: string;
      endDate: string;
      missionsCount: string;
    }>();

  const tripIdNumber = parseInt(tripId, 10);

  const { 
    data: completedChallenges, 
    initialLoading, 
    isPaginating,
    isRefreshing,
    handleLoadMore,
    onRefresh,
    updateDataItem,
  } = usePaginatedFeed<CompletedChallenge>(
    useCallback((page) => getCompletedChallengesForTrip(tripIdNumber, page), [tripIdNumber])
  );

  const handleLike = async (post: CompletedChallenge) => {
    const updatedPost = {
      ...post,
      is_liked_by_me: !post.is_liked_by_me,
      likes_count: post.is_liked_by_me ? post.likes_count - 1 : post.likes_count + 1,
    };
    updateDataItem(updatedPost, 'id');

    try {
      if (updatedPost.is_liked_by_me) {
        await likeCompletedChallenge(post.id!);
      } else {
        await unlikeCompletedChallenge(post.id!);
      }
    } catch (err) {
      updateDataItem(post, 'id');
    }
  };

  const renderHeader = useCallback(() => {
    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

    return (
    <View style={styles.headerContainer}>
      <ImageBackground source={{ uri: headerImageUrl }} style={styles.headerImage}>
        <View style={styles.headerOverlay}>
          <View style={styles.tripDetails}>
            <Text style={styles.cityName}>{cityName}</Text>
            <View>
                <Text style={styles.tripDetailsText}>{`${formattedStartDate} - ${formattedEndDate}`}</Text>
                <Text style={styles.tripDetailsText}>{t('profile.challenges.completed', { count: parseInt(missionsCount) })}</Text>
            </View>
        </View>
        </View>
      </ImageBackground>
    </View>
    );
  }, [cityName, headerImageUrl, startDate, endDate, missionsCount, t]);

  if (initialLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: t('profile.tripScreen.title', { cityName: cityName, userName: user?.name ?? '' }), headerBackTitle: t('back') }} />
      <FlatList
        data={completedChallenges}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <CompletedChallengePost completedChallenge={item} onLikePress={() => handleLike(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id!.toString()}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        ListFooterComponent={isPaginating ? <ActivityIndicator style={{ margin: 20 }} /> : null}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1  }} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 32,
  },
  headerImage: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
tripDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
},
  cityName: {
    ...globalStyles.diplaySemiBold,
    color: Colors.colors.textWhite.primary,
  },
  tripDetailsText: {
    ...globalStyles.smallBodyRegular,
    color: Colors.colors.textWhite.secondary,
  },
});

export default TripFeedScreen;