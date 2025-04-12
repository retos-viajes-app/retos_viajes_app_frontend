// React & React Native Imports
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

// Style Imports
import { Colors } from "@/constants/ColoresPropios";

// Icon Imports
import { ArrowLeft, X } from "lucide-react-native";

export default function CreateTripLayout() {
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
        <Stack.Screen name="selectDestination" />
        <Stack.Screen name="selectDates" />
        <Stack.Screen name="selectCategories" />
        <Stack.Screen name="summary" />
      </Stack>
    
  );
}