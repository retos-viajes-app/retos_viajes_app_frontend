import TripInfo from "@/components/trip/TripInfo";
import { useLocalSearchParams } from "expo-router";
import { View, Text} from "react-native";

const TripInfoScreen = () => {
    const { trip_id, trip } = useLocalSearchParams();
    const tripObject = trip ? JSON.parse(trip as string) : null;
    return (
        <View style={{flex:1}}>
            <TripInfo trip={tripObject} />
        </View>
    );
}
export default TripInfoScreen;