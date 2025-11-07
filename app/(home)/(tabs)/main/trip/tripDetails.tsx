import TripInfo from "@/components/trip/TripInfo";
import { useLocalSearchParams } from "expo-router";
import { View, Text} from "react-native";
import { Colors } from "@/constants/Colors";

const TripDetailsScreen = () => {
    const {trip} = useLocalSearchParams();
    const tripObject = trip ? JSON.parse(trip as string) : null;
    return (
        <View style={{flex:1, backgroundColor: Colors.colors.background.default}}>
            <TripInfo trip={tripObject} />
        </View>
    );
}
export default TripDetailsScreen;