// React & React Native Imports
import { View, Text, FlatList } from "react-native";
import { useState } from "react";
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

// Icon Imports
import { Map, CalendarMinus2, Star } from 'lucide-react-native';

export default function SummaryScreen() {
    const {destinations, trip, selectedCategoriesId,categories,postTrip} = useTrip();
    const [error,setError] = useState<string | undefined>(undefined);
    const router = useRouter();
    const currenDestination = destinations.find((destination) => destination.id === trip?.destination_id);
    const selectedCategories = categories.filter((category) => selectedCategoriesId.includes(category.id!.toString()));
    const handleContinue = async () => {
        const {success,error} = await postTrip(trip!);
        if(success){
            router.replace("/");
        }else{
            setError(error);
        }
    }
    return  (
        <PaddingView >
        <ViewContentContinue>
        <View style={{gap:30}}>
            <TitleParagraph
                title="¡Todo listo para tu aventura!"
                paragraph="Este es el summary de tu viaje:"
            />
            {error && <Text style={{ color: "red", padding:20 }}>{error}</Text> } 
            <View style={{gap:20}}>
                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                {/* Destino */}
                    <Map color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/> 
                    <View >
                        {/* No hay mediumbodymedium */}
                        <Text style={[globalStyles.mediumBodySemiBold, {color:Colors.colors.gray[500]}]}>Destino</Text>
                        <Text style={[globalStyles.largeBodyMedium, {color: Colors.colors.gray[400]}]}>{currenDestination?.city}, {currenDestination?.country}</Text>  
                    </View> 
                </View>

                <Divider full={true}/>

                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                {/* Fechas*/}
                    <CalendarMinus2 color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/> 
                    <View >
                        <Text style={[globalStyles.mediumBodySemiBold, {color:Colors.colors.gray[500]}]}>Fechas</Text>
                        <Text style={[globalStyles.largeBodyMedium, {color: Colors.colors.gray[400]}]}>{trip?.start_date?.toDateString()} - {trip?.start_date?.toDateString()}</Text>  
                    </View> 
                </View>

                <Divider full={true}/>

                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:10 }}>
                {/* Misiones */}
                    <Star color={Colors.colors.primary[200]} strokeWidth={1.6} size={35}/> 
                    <View >
                        {/* No hay mediumbodymedium */}
                        <Text style={[globalStyles.mediumBodySemiBold, {color:Colors.colors.gray[500]}]}>Misiones</Text>
                        <FlatList
                            data={selectedCategories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View >
                                <Text style={[globalStyles.largeBodyMedium, {color: Colors.colors.gray[400]}]} >• {item.name}</Text>
                                </View>
                            )}
                            />
                    </View> 
                </View>
            </View>
        </View>
            <PrimaryButton title="Confirmar y empezar aventura" onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}