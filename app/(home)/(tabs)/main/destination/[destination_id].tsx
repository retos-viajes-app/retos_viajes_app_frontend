import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {Destination} from "@/models/destination"; // Importa el objeto de destino
import { getDestinationById } from "@/services/destinationService";
import ChallengesFlatList from "@/components/challenge/ChallengeFlatList";
import { SafeAreaView } from "react-native-safe-area-context";
//Styles
import globalStyles from "@/styles/global";
import { Colors } from "@/constants/Colors";
import buttonStyles from "@/styles/buttons";
import {Check} from "lucide-react-native";

export default function Destino() {
  const { destination_id } = useLocalSearchParams();
  const [destination, setDestination] = React.useState<Destination | null>(null);
  useEffect(() => {
    console.log(`Cargando detalle del destino con ID: ${destination_id}`);
    getDestinationById(Number(destination_id)).then((data) => {
        setDestination(data);
        console.log("Destino cargado:", data);
        }).catch((error) => {
        console.error("Error al cargar el destino:", error);
        //Manejo al ir al detalle
        throw error;
        }
    );
    
  }, [destination_id]);
  return (
    <SafeAreaView style={{ flex: 1,paddingHorizontal: 16, }}>
      <View style={styles.countryDetails}>
        <View style={styles.backgroundImageContainer}>
          <Text style={[globalStyles.largeBodySemiBold,{color: '#ffffff'}]}>{destination?.country}</Text>
          <View style={[styles.visitadoContainer, {backgroundColor: Colors.colors.secondary[50]}]}>
            <View style={[buttonStyles.checkButton,{backgroundColor: Colors.colors.secondary[100]}]}>
               <Check color={Colors.colors.success[800]}/>
            </View>
            <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.success[800], padding: 8}]}>Visitado</Text>
          </View>
        </View>
        <Text>{destination?.city}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{destination?.description}</Text>
      </View>
       <Text>{destination?.country}</Text>
       <Text>{destination?.description}</Text>
       <ChallengesFlatList destination_id={Number(destination_id)} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  countryDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
  },
  visitadoContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  backgroundImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'gray',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
  }
});