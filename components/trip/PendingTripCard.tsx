import { useAuth } from "@/hooks/useAuth";
import Trip from "@/models/trip";
import { View,StyleSheet, Text,Pressable, ImageBackground} from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/Colors";
import { Calendar } from "lucide-react-native";
import AvatarWithBadge from "@/components/ui/AvatarWithBadge";
import labelsStyles from "@/styles/labels";

//Styles
import boxesStyles from "@/styles/boxes";
//router
import { useRouter } from "expo-router";

const PendingTripCard = ({ trip }: { trip: Trip}) => {
    const { user } = useAuth();
    const {t} = useTranslation();
    const startDay = trip.start_date?.getDate();
    const endDay = trip.end_date?.getDate();

    const startMonth = trip.start_date?.getMonth()! + 1
    const endMonth = trip.end_date?.getMonth()! + 1;

    const startYear = trip.start_date?.getFullYear();
    const endYear = trip.end_date?.getFullYear();
    const router = useRouter();
    const goToTripInfo = () => {
        
        console.log("Navigating to trip:", trip.id);
        router.push({
            pathname: "/(home)/(tabs)/main/trip/tripDetails",
            params: { trip: JSON.stringify(trip) },
        });
    }
    return (
        <Pressable onPress={goToTripInfo}>
            <View style={styles.card}>
                <ImageBackground source={{ uri: trip.destination_image_url }} style={styles.photo} >
                    <View style={labelsStyles.cardLabel}>
                        <Calendar size={16} color={Colors.colors.text.primary}/>
                        {startMonth !== endMonth ? (
                            startYear !== endYear ? (
                                <Text>{startDay} {t(`months.${startMonth}`)} {startYear} - {endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                            ) : (
                                <Text>{startDay} {t(`months.${startMonth}`)} - {endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                            )
                        ) : (      
                            startYear !== endYear ? (
                                <Text>{startDay} {t(`months.${startMonth}`)} {startYear} - {endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                            ) : ( 
                                <Text>{startDay}-{endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                            )
                        )}
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <View>
                        <Text>{trip.destination_name}</Text>
                        <Text>{trip.completed_challenges_ids?.length || 0} {t("trip.completedChallenges")}</Text>
                    </View>
                    <View>
                        <AvatarWithBadge imageUri={user?.profile_photo_url || require('@/assets/images/profile-placeholder.png')} badgeNumber={trip.extra_participants ||0} /> 
                    </View>
                </View>
            </View>
        </Pressable>
    );
}	

const styles = StyleSheet.create({
    imageBackground: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    card: {
        height: 192,
        width: 320,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom:10,
        ...boxesStyles.shadow,
    },
    photo: {
        height: 120,
        padding: 10,
        backgroundColor: '#808080', 
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
    },
    content: {
        height: 72,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    profile_photo:{
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    menuItem:{
        position: 'absolute',
        flexDirection: 'row',
        top: 10,
        right: 10,
        backgroundColor: Colors.colors.background.hover,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 'auto',
        height: 33,
    },
});

export default PendingTripCard;