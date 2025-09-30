import { useAuth } from "@/hooks/useAuth";
import Trip from "@/models/trip";
import { View,StyleSheet, Text} from "react-native";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/Colors";


const PendingTripCard = ({ trip }: { trip: Trip}) => {
    const { user } = useAuth();
    const {t} = useTranslation();
    return (
        <View style={styles.card}>
            <View  style={styles.photo}>
                <View style={styles.menuItem}>
                    <Text>{trip.start_date?.getDate()}-{trip.end_date?.getDate()} de {trip.end_date?.getMonth()}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View>
                    <Text>{trip.destination_name}</Text>
                    <Text>{trip.completed_challenges_count} {t("trip.completedChallenges")}</Text>
                </View>
                <View>
                    <Image 
                        source={
                            user?.profile_photo_url
                            ? {uri: user?.profile_photo_url} 
                            : require('@/assets/images/profile-placeholder.png')
                        } 
                        style={styles.profile_photo} />
                    <Text>{trip.extra_participants}</Text>
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
        top: 10,
        right: 10,
        backgroundColor: Colors.colors.background.hover,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 120,
        height: 32,
    }
});

export default PendingTripCard;