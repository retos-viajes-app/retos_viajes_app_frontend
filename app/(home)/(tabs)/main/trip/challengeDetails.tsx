import TripInfo from "@/components/trip/TripInfo";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ImageBackground } from "react-native";
import { Colors } from "@/constants/Colors";
import Challenge from "@/models/challenge";
import globalStyles from "@/styles/global";
import boxesStyles from "@/styles/boxes";
import DetailsTable from "@/components/challenge/DetailsTable";
import { use, useState } from "react";
import MapWithText from "@/components/maps/MapWithText";
import {
    Check,
    Loader,
    MountainSnow,
    Building2,
    Utensils,
    Bird,
    Moon,
    Droplet,
} from "lucide-react-native";
import labelsStyles from "@/styles/labels";
import circles from "@/styles/circles";
import { useTranslation } from "react-i18next";

const challengeDetailsScreen = () => {
    const params = useLocalSearchParams();
    const challenge: Challenge = JSON.parse(params.challenge as string);
    const completed: boolean = JSON.parse(params.completed as string);
    const isForTripInfo: boolean = JSON.parse(params.isForTripInfo as string);
    const {t} =  useTranslation();
    const [validImage, setValidImage] = useState(true);
     const ICONS_MAP: { [key: string]: React.FC<React.ComponentProps<typeof MountainSnow>> } = {
        MountainSnow: MountainSnow,
        Building2: Building2,
        Utensils: Utensils,
        Bird: Bird,
        Moon: Moon,
        Droplet: Droplet,
    };
    const CategoryIcon = challenge.category?.icon_name ? ICONS_MAP[challenge.category.icon_name] : MountainSnow;

        return (
        <View style={{...boxesStyles.padding16,flex:1,backgroundColor: Colors.colors.background.default, gap:24}}>
           <ImageBackground
            style={{...boxesStyles.radius, width: '100%', height: 140, overflow:'hidden', backgroundColor: Colors.colors.background.image}}
            source={{ uri: challenge.image_url }        }
            >
                <View style={labelsStyles.cardLabelLeft}>
                    <CategoryIcon size={16} color={Colors.colors.text.primary}/>
                    <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.text.primary}]}>{challenge.category?.name}</Text>
                </View>
                {isForTripInfo && (
                    !completed ?
                    <View style={labelsStyles.cardLabelRight}>
                        <Loader size={16} color={Colors.colors.text.secondary}/>
                        <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.text.secondary}]}>{t("challenge.notCompleted")}</Text>
                    </View>
                    :
                    <View style={[labelsStyles.cardLabelCheckedRight, {backgroundColor: Colors.colors.secondary[50]}]}>
                        <View style={[circles.circle30,{backgroundColor: Colors.colors.secondary[100]}]}>
                            <Check color={Colors.colors.success[800]}/>
                        </View>
                        <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.success[800], padding: 8}]}>{t("challenge.completed")}</Text>
                    </View>
                )}
            </ImageBackground>
            <View style={{gap:32}}>
                <Text style={{...globalStyles.title}}>
                {challenge.title}
                </Text>
                <Text style={{...globalStyles.largeBodyMedium}}>
                    {challenge.short_description}
                </Text>
            </View>
           <DetailsTable detail={challenge.detail ? challenge.detail : {}} />

           <MapWithText
            latitude={challenge.latitude?? 0}
            longitude={challenge.longitude?? 0}
            distance={500}
            address="Malaga"
           />
        </View>
    );
}

const styles = {
};
export default challengeDetailsScreen;