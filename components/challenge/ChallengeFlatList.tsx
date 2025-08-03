import { getChallengesForDestination, getDestinationsPaginated } from '@/services/destinationService';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Destination } from '@/models/destination';
import { useTranslation } from "react-i18next";
import ChallengeCard from './ChallengeCard';
type ItemProps = { country: string };



const ChallengesFlatList = ({destination_id}:{destination_id: number}) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState<Destination[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const { t } = useTranslation();
  const fetchChallengesForDestination = async (currentPage: number) => {
    if (loading || !hasMore) return;

    console.log('Fetching challenges for destination for page:', currentPage);
    setLoading(true);
    try {
      const res = await getChallengesForDestination(currentPage,10,destination_id);
      const data = res.challenges;
      console.log('Fetched challenges :', data);
      setChallenges((prev)=>[...prev, ...data]); // Agregar un primer elemento para mostrar "Todos los destinos"
      setHasMore(res.pagination.has_more);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching challenges for page:', page);
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
    <View style={styles.container} >
        <FlatList
          ref={flatListRef}
          data={challenges}
          renderItem={({ item }) => <ChallengeCard  challenge={item}/>}
          keyExtractor={item => item.id!.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  separator: {
    height: 24,
  },
  listContentContainer: {
    paddingBottom:10 , 
  },
  
});

export default ChallengesFlatList;