import { useAuth } from "@/hooks/useAuth";
import Trip from "@/models/trip";
import { View,StyleSheet, Text} from "react-native";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/Colors";
import { Calendar } from "lucide-react-native";
import AvatarWithBadge from "@/components/ui/AvatarWithBadge";


const PendingTripCard = ({ trip }: { trip: Trip}) => {
    const { user } = useAuth();
    const {t} = useTranslation();
    const startDay = trip.start_date?.getDate();
    const endDay = trip.end_date?.getDate();

    const startMonth = trip.start_date?.getMonth()! + 1
    const endMonth = trip.end_date?.getMonth()! + 1;

    const startYear = trip.start_date?.getFullYear();
    const endYear = trip.end_date?.getFullYear();

    return (
        <View style={styles.card}>
            <View  style={styles.photo}>
                <View style={styles.menuItem}>
                    <Calendar size={16} color={Colors.colors.text.primary} style={{ marginLeft: 10 }} />
                    {startMonth !== endMonth ? (
                        startYear !== endYear ? (
                            <Text style={styles.dateText}>{startDay} {t(`months.${startMonth}`)} {startYear} - {endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                        ) : (
                            <Text style={styles.dateText}>{startDay} {t(`months.${startMonth}`)} - {endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                        )
                    ) : (      
                        startYear !== endYear ? (
                            <Text style={styles.dateText}>{startDay} {t(`months.${startMonth}`)} {startYear} - {endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                        ) : ( 
                            <Text style={styles.dateText}>{startDay}-{endDay} {t(`months.${endMonth}`)} {endYear}</Text>
                        )
                    )}
                </View>
            </View>
            <View style={styles.content}>
                <View>
                    <Text>{trip.destination_name}</Text>
                    <Text>{trip.completed_challenges_count} {t("trip.completedChallenges")}</Text>
                </View>
                <View>
                    <AvatarWithBadge imageUri={user?.profile_photo_url || require('@/assets/images/profile-placeholder.png')} badgeNumber={trip.extra_participants ||0} /> 
                </View>
            </View>
        </View>
    );
}	

const styles = StyleSheet.create({
    card: {
        height: 192,
        width: 320,
        flexDirection: 'column',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E5E7EA',
        borderStyle: 'solid',
        borderRadius: 16,
        shadowColor: '#2C3E50',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        marginBottom: 10,
    },
    photo: {
        height: 120,
        padding: 10,
        backgroundColor: '#808080', 
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
    dateText:{
        marginRight: 10,
        marginLeft: 10,
    }
});

export default PendingTripCard;