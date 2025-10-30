import TripInfo from "@/components/trip/TripInfo";
import { useLocalSearchParams } from "expo-router";
import { View, Text} from "react-native";

const TripInfoScreen = () => {
    const { trip_id, trip } = useLocalSearchParams();
    console.log("trip_json:", trip);
    const tripObject = trip ? JSON.parse(trip as string) : null;
    console.log("tripObject:", tripObject);
    return (
        <View>
            <TripInfo trip={tripObject} />
        </View>
    );
}
export default TripInfoScreen;