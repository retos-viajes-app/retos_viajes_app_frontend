import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ArrowLeft, X } from "lucide-react-native";
import {Colors} from "@/constants/ColoresPropios";
export default function CrearViajeLayout() {
  const router = useRouter();
  return (

      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: "Crear Viaje",
          headerTitleAlign: "center",
          //Aplica esos estilos para todo el contenido de las pantallas
          contentStyle: { 
            backgroundColor: Colors.colors.neutral[100],
           },
         
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.replace("/")} >
              <X size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="destino" />
        <Stack.Screen name="fechas" />
        <Stack.Screen name="misiones" />
        <Stack.Screen name="resumen" />
      </Stack>
    
  );
}