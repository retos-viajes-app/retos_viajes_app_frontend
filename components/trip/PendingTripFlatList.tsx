import Trip from "@/models/trip";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import PendingTripCard from "@/components/trip/PendingTripCard";
import { useTranslation } from "react-i18next";
import flatListStyles from "@/styles/flatList";
import globalStyles from "@/styles/global";
import { getPendingTripsShortInfo } from "@/services/tripService";
import { useEffect, useState } from "react";
const PendingTripFlatList = () => {

    const [pendingTrips, setPendingTrips] = useState<Trip[]>([]);
    
    const fetchPendingTrips = async () => {
      const response = await getPendingTripsShortInfo();

      if (response.error) {
        console.error('Error fetching pending trips:', response.error);
        return;
      } 
      response.data = response.data!.map((t: any) => ({
      ...t,
      start_date: new Date(t.start_date), 
      end_date: new Date(t.end_date),
    }));
      setPendingTrips(response.data || []);
    };


    useEffect(() => {
      fetchPendingTrips();
    }, []);

    const {t} = useTranslation();
    const sortedPendingTrips = [...pendingTrips].sort((a, b) => {
      if (a.is_ongoing && !b.is_ongoing) return -1
      if (!a.is_ongoing && b.is_ongoing) return 1
      return 0
    })
    
  return (
    <>
      <Text style={[globalStyles.title,{"paddingLeft": 16, "paddingBottom": 16}]}>{t('pendingTrips.title')}</Text>
      <FlatList
        data={sortedPendingTrips}
        renderItem={({ item }) => <PendingTripCard trip={item} />}
        horizontal
        keyExtractor={item => item.id!.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={flatListStyles.container}
        
      />
    </>
  )
}

export default PendingTripFlatList;