// React & React Native Imports
import { View, Text, FlatList } from "react-native";
import {useState } from "react";
import { useRouter } from "expo-router";
// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import Divider from "@/components/Divider";
// Hook Imports
import { useTrip } from "@/hooks/useTrip";
// Style Imports
import globalStyles from "@/styles/global";
// Utility Imports
import { Colors } from "@/constants/Colors";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import ErrorText from "@/components/text/ErrorText";
import { postTrip } from "@/services/tripService";
import StepIndicator from "@/components/ui/StepIndicator";
import { UserRound } from "lucide-react-native";
import Toast from "react-native-toast-message";
// Icon Imports
//import { Map, CalendarMinus2, Star } from 'lucide-react-native';

export default function SummaryScreen() {
    const [errorMessage,setErrorMessage] = useState<string | undefined>(undefined);
    const {trip, selectedCategoriesId, resetContext} = useTrip();
    const {categories, participantsInfo, destinations} = useTrip();
    const router = useRouter();
    const currenDestination = destinations.find((destination) => destination.id === trip?.destination_id);
    const selectedCategories = categories.filter((category) => selectedCategoriesId.includes(category.id!.toString()));
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    
    const handleContinue = async () => {
        setLoading(true);
        const {success,error} = await postTrip(trip!);

        if(!success){
            setErrorMessage(error);
            setLoading(false);
            return;
        }
        router.dismissAll();
        Toast.show({ type: 'success', text1: t('createTrip.success')});
        resetContext();
        router.replace("/main");
        setLoading(false);
        
    }

    return  (
        <PaddingView >
        <StepIndicator steps={5} currentStep={5} />
        <ViewContentContinue>
        <View style={{gap:30}}>
            <TitleParagraph
                title={t("createTrip.summary.title")}
                paragraph={t("createTrip.summary.paragraph")}
            />
            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            <View style={{gap:20}}>
                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                {/* Destino */}
                    {/* <Map color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/>  */}
                    <MaterialCommunityIcons name="map" size={35} color={Colors.colors.primary[200]} />
                    <View >
                        {/* No hay mediumbodymedium */}
                        <Text style={[globalStyles.mediumBodySemiBold, {color:Colors.colors.text.primary}]}>{t("createTrip.summary.destination")}</Text>
                        <Text style={[globalStyles.largeBodyMedium, {color: Colors.colors.text.secondary}]}>{currenDestination?.city}, {currenDestination?.country}</Text>  
                    </View> 
                </View>

                <Divider full={true}/>

                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                {/* Fechas*/}
                    {/* <CalendarMinus2 color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/> */}
                    <MaterialCommunityIcons name="calendar-remove" size={35} color={Colors.colors.primary[200]} />
                    <View >
                        <Text style={[globalStyles.mediumBodySemiBold, {color:Colors.colors.text.primary}]}>{t("createTrip.summary.dates")}</Text>
                        <Text style={[globalStyles.largeBodyMedium, {color: Colors.colors.text.secondary}]}>{trip?.start_date?.toDateString()} - {trip?.start_date?.toDateString()}</Text>  
                    </View> 
                </View>

                <Divider full={true}/>

                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                {/* Misiones */}
                    {/* <Star color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/>  */}
                    <Feather name="star" size={35} color={Colors.colors.primary[200]} />
                    <View >
                        {/* No hay mediumbodymedium */}
                        <Text style={[globalStyles.mediumBodySemiBold, {color:Colors.colors.text.primary}]}>{t("createTrip.summary.missions")}</Text>
                        <FlatList
                            data={selectedCategories}
                            keyExtractor={(item) => item.id!.toString()}
                            renderItem={({ item }) => (
                                <View >
                                <Text style={[globalStyles.largeBodyMedium, {color: Colors.colors.text.secondary}]} >• {item.name}</Text>
                                </View>
                            )}
                            />
                    </View> 
                </View>
                {participantsInfo.length > 0 && (
                <>
                    <Divider full={true}/>
                    <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                    {/* Participants */}
                        <UserRound color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/> 
                        <View >
                            <Text style={[globalStyles.smallBodyRegular, {color:Colors.colors.text.secondary}]}>{t("createTrip.summary.participants")}</Text>
                            <FlatList
                                data={participantsInfo}
                                keyExtractor={(item) => item.id!.toString()}
                                renderItem={({ item }) => (
                                    <View >
                                    <Text style={[globalStyles.largeBodySemiBold, {color: Colors.colors.text.secondary}]} >• {item.name} - @{item.username}</Text>
                                    </View>
                                )}
                                />
                        </View> 
                    </View>
                </>)}
            </View>
        </View>
            <PrimaryButton 
                title={t("createTrip.summary.confirm")}
                onPress={handleContinue}
                loading={loading}
            />
        </ViewContentContinue>
      </PaddingView>
    );
}