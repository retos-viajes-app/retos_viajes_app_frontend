import { getDestinationsPaginated } from '@/services/destinationService';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Destination } from '@/models/destination';
import DestinationCard from '@/components/destination/DestinationCard';
import { useTranslation } from "react-i18next";
type ItemProps = { country: string };



const DestinationsFlatList = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const { t } = useTranslation();
  const fetchDestinations = async (currentPage: number) => {
    if (loading || !hasMore) return;

    console.log('Fetching destinations for page:', currentPage);
    setLoading(true);
    try {
      const res = await getDestinationsPaginated(currentPage);
      const data = res.destinations;
      console.log('Fetched destinations:', data);
      setDestinations((prev)=>[...prev, ...data]); // Agregar un primer elemento para mostrar "Todos los destinos"
      setHasMore(res.pagination.has_more);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching destinations for page:', page);
    fetchDestinations(page);
  }, []);

const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchDestinations(nextPage);
    }
  };


  return (
    <View style={styles.container} >
        <Text >{t("destinations.tittle")}</Text>
        <FlatList
          style={{ height:285}}
          ref={flatListRef}
          data={destinations}
          renderItem={({ item }) => <DestinationCard destination={item}/>}
          keyExtractor={item => item.id!.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContentContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16, 
    paddingVertical: 20,
  },
  separator: {
    width: 10, // Gap de 10 entre cada tarjeta
  },
  listContentContainer: {
    paddingVertical: 4, // Pequeño padding vertical para las cards
  },
  
});

export default DestinationsFlatList;
