import { useLocalSearchParams } from "expo-router";
import { View, Text} from "react-native";

const TripInfoScreen = () => {
    const { trip_id, trip } = useLocalSearchParams();

    console.log("Trip info:", trip);
    return (
        <View>
            <Text>Trip Info Screen {trip_id}</Text>
        </View>
    );
}
export default TripInfoScreen;