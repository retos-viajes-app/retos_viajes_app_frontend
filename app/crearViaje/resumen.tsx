import PrimaryButton from "@/components/botones/Buttons";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import { useTrip } from "@/hooks/useTrip";
import { View,Text } from "react-native";
import { Map,CalendarMinus2, Star } from 'lucide-react-native'
import { Colors } from "@/constants/ColoresPropios";
import globalStyles from "@/styles/global";
import Divider from "@/components/Divider";

export default function MisionesScreen() {
    const {destinations, trip, selectedCategoriesId} = useTrip();
    const currenDestination = destinations.find((destination) => destination.id === trip?.destination_id);
    
    const handleContinue = () => {
        console.log("Continuar a la siguiente pantalla");
    }
    return  (
        <PaddingView >
        <ViewContentContinue>
        <View style={{gap:30}}>
            <TitleParagraph
                title="¡Todo listo para tu aventura!"
                paragraph="Este es el resumen de tu viaje:"
            />
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
                        
                    </View> 
                </View>
            </View>
        </View>
            <PrimaryButton title="Confirmar y empezar aventura" onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}