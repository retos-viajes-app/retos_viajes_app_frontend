import { Stack, useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, Text, SafeAreaView, Pressable } from "react-native";
import { ArrowLeft, X } from "lucide-react-native";
import {Colors} from "@/constants/ColoresPropios";
import {TripProvider} from "@/context/TripContext";
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
// 


// headerRight: () => (
//   <TouchableOpacity onPress={() => router.replace("/")}>
//     <X size={24} color="black" />
//   </TouchableOpacity>
// ),
     // headerLeft: () => (
      //   <TouchableOpacity onPress={() => router.back()}>
      //     <Text style={{ fontSize: 18 }}>← Volver</Text>
      //   </TouchableOpacity>
      // ),
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => router.replace("/")}>
      //     <Text style={{ fontSize: 18 }}>✖ Cerrar</Text>
      //   </TouchableOpacity>
      // ),