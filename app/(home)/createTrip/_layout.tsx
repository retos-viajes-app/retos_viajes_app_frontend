// React & React Native Imports
import { Slot, Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

// Style Imports
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { LoadingScreen } from "@/components/LoadingScreen";

// Icon Imports
//import { ArrowLeft, X } from "lucide-react-native";

export default function CreateTripLayout() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: t("createTrip.title"),
          headerTitleAlign: "center",
          //Aplica esos estilos para todo el contenido de las pantallas
          contentStyle: { 
            backgroundColor: Colors.colors.neutral[100],
           },
         
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              {/* <ArrowLeft size={24} color="black" /> */}
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.replace("/inicio")} >
              {/* <X size={24} color="black" /> */}
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      >
        <Slot />
      </Stack>
    
  );
}