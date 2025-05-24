import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {Destination} from "@/models/destination"; // Importa el objeto de destino
import { getDestinationById } from "@/services/destinationService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
    <View>
      <Text>{destination?.city}</Text>
       <Text>{destination?.country}</Text>
       <Text>{destination?.description}</Text>
    </View>
  );
}
