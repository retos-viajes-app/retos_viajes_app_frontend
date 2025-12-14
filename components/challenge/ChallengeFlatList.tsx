import { getChallengesForDestinationPaginated } from '@/services/destinationService';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from "react-i18next";
import ChallengeCard from './ChallengeCard';
import Challenge from '@/models/challenge';

interface  ChallengesFlatListProps {
  destination_id?: number;
  challenges?: Challenge[];
  paginated?: boolean;
  completedChallengesIds?: number[];
  isForTripInfo?: boolean;
}

const ChallengesFlatList = (
  {destination_id, 
    challenges, 
    paginated = true, 
    completedChallengesIds = [], 
    isForTripInfo}: ChallengesFlatListProps
) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [challengesPaginated, setChallengesPaginated] = useState<Challenge[]>([]);
    const { t } = useTranslation();

    const fetchChallengesForDestination = async (currentPage: number) => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await getChallengesForDestinationPaginated(currentPage,10,destination_id!);
        const data = res.challenges;
        setChallengesPaginated((prev)=>[...prev, ...data]);
        setHasMore(res.pagination!.has_more);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (!paginated) return;
      fetchChallengesForDestination(page);
    }, []);

    const handleLoadMore = () => {
      if (!loading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchChallengesForDestination(nextPage);
      }
    };


  return (
        <FlatList
          ref={flatListRef}
          data={challenges? challenges : challengesPaginated}
          renderItem={({ item }) => 
            <ChallengeCard  
              challenge={item} 
              completed={completedChallengesIds.includes(item.id!)}  
              isForTripInfo={isForTripInfo}
            />
          }
          keyExtractor={item => item.id!.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          onEndReached={challenges?handleLoadMore:undefined}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 24,
  },
  listContentContainer: {
    paddingBottom:10 , 
  },
  
});

export default ChallengesFlatList;