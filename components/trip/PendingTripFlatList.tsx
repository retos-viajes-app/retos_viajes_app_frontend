import Trip from "@/models/trip";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native";
import PendingTripCard from "@/components/trip/PendingTripCard";
import { useTranslation } from "react-i18next";
import flatListStyles from "@/styles/flatList";
import globalStyles from "@/styles/global";
import { View } from "lucide-react-native";
const PendingTripFlatList = () => {
    const mockedPendingTrips: Trip[] = [];
    const {t} = useTranslation();

    for (let i = 0; i < 5; i++){
    mockedPendingTrips.push({
        id: i + 1,
        destination_name: "París",
        completed_challenges_count: 5,
        destination_image_url: "https://example.com/paris.jpg",
        is_ongoing: true,
        extra_participants: 2,
      });
    }

    
  return (
    <>
      <Text style={[globalStyles.title,{"paddingLeft": 16, "paddingBottom": 16}]}>{t('pendingTrips.title')}</Text>
      <FlatList
        data={mockedPendingTrips}
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