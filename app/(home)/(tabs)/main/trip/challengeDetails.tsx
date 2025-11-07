import TripInfo from "@/components/trip/TripInfo";
import { useLocalSearchParams } from "expo-router";
import { View, Text} from "react-native";
import { Colors } from "@/constants/Colors";

const challengeDetailsScreen = () => {
    return (
        <View style={{flex:1, backgroundColor: Colors.colors.background.default}}>
            <Text>Trip Challenge Detail Screen</Text>
        </View>
    );
}
export default challengeDetailsScreen;