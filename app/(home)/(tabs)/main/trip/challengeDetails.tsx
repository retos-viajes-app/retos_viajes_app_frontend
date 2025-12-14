import TripInfo from "@/components/trip/TripInfo";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import Challenge from "@/models/challenge";
import globalStyles from "@/styles/global";
import boxesStyles from "@/styles/boxes";
import DetailsTable from "@/components/challenge/DetailsTable";
import { useState } from "react";

const challengeDetailsScreen = () => {
    const params = useLocalSearchParams();
    const challenge: Challenge = JSON.parse(params.challenge as string);
    const [validImage, setValidImage] = useState(true);
    console.log("Challenge details:", challenge);

        return (
        <View style={{...boxesStyles.padding16,flex:1,backgroundColor: Colors.colors.background.default, gap:24}}>
           <Image
            style={{...boxesStyles.radius, width: '100%', height: 140, resizeMode: 'cover'}}
            source={
                validImage
                ? { uri: challenge.image_url }        // La URL aunque esté mal
                : require("@/assets/images/ciudad-defecto-destino-grid.jpg")  // Fallback
            }
            onError={() => {
                console.log("Imagen no encontrada, usando fallback");
                setValidImage(false);
            }}
            />
            <View style={{gap:32}}>
                <Text style={{...globalStyles.title}}>
                {challenge.title}
                </Text>
                <Text style={{...globalStyles.largeBodyMedium}}>
                    {challenge.short_description}
                </Text>
            </View>
           <DetailsTable detail={challenge.detail ? challenge.detail : {}}>

           </DetailsTable>
        </View>
    );
}

const styles = {
};
export default challengeDetailsScreen;