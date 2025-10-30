import Trip from "@/models/trip";
import { use } from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native"
import { getDaysRemaining, getTripProgress } from "@/utils/dateFunctions";
// Styles
import bannersStyles from "@/styles/banners";
import { Pressable } from "react-native-gesture-handler";
import buttonStyles from "@/styles/buttons";
import { Colors } from "@/constants/Colors";
import globalStyles from "@/styles/global";
import AvatarWithBadge from "../ui/AvatarWithBadge";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import VerticalDivider from "../ui/verticalSeparator";


interface TripInfoProps {
    trip: Trip;
}
function TripInfo({ trip }: TripInfoProps) {
    const { user } = useAuth();
    const { t } = useTranslation();
    return (
        <View>
           
            {/* Update with the real image of the trip destination */}
            <View style={[bannersStyles.bannerCurrentTrip]}>
                <ImageBackground 
                    source={require("@/assets/images/ciudad-defecto-destino-grid.jpg")} 
                    style={styles.image} 
                >
                    <View style={styles.containerPadding}>
                        <View style={styles.upperContainer}>
                            <View>
                                <Text style={{...globalStyles.smallBodyRegular, color: Colors.colors.neutral[100]}}>TU VIAJE A</Text>
                                <Text style={{...globalStyles.diplaySemiBold, color: Colors.colors.neutral[100]}}>{trip.destination_name}</Text>
                            </View>
                            <Pressable style={{ ...buttonStyles.roundedRectangleButton }}>
                                <Text style={{ color: Colors.colors.primary[500]}}>{t('tripBanner.editTrip')}</Text>
                            </Pressable>
                        </View>
                        <View style={{...styles.bottomContainer, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View>
                                    <Text style={{...globalStyles.mediumBodyBold,  color: Colors.colors.textWhite.primary}}>{getDaysRemaining(trip.end_date)}{t('tripBanner.days')}</Text>
                                    <Text style={{...globalStyles.smallBodyRegular, color: Colors.colors.textWhite.primary}}>{t('tripBanner.toEnd')}</Text>
                                </View>
                                
                                <VerticalDivider/>
                                <View>
                                    <Text style={{...globalStyles.mediumBodyBold, color: Colors.colors.textWhite.primary}}>{getTripProgress(trip.start_date, trip.end_date)}% </Text>
                                    <Text style={{...globalStyles.smallBodyRegular, color: Colors.colors.textWhite.primary}}>{t('tripBanner.completed')}</Text>
                                </View>
                                
                            </View>
                            <AvatarWithBadge imageUri={user?.profile_photo_url || require('@/assets/images/profile-placeholder.png')} badgeNumber={trip.extra_participants ||0} /> 
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height:137,
    },
    containerPadding:{
        padding: 16,
        gap:8,
    },
    upperContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    bottomContainer:{
        height:41,
        justifyContent: 'space-between',
    }
})

export default TripInfo;