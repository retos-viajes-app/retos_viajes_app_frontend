import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {Destination} from "@/models/destination"; // Importa el objeto de destino
import { getDestinationById } from "@/services/destinationService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import ChallengesFlatList from "@/components/challenge/ChallengeFlatList";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <Text>{destination?.city}</Text>
       <Text>{destination?.country}</Text>
       <Text>{destination?.description}</Text>
       <ChallengesFlatList destination_id={Number(destination_id)} />
    </SafeAreaView>
  );
}
