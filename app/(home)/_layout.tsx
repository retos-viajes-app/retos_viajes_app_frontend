import { TripProvider } from "@/context/TripContext";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function AuthLayout() {
  return (
    <TripProvider>
      <Stack screenOptions={{ headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="crearViaje" />
      </Stack>
    </TripProvider>
  );
}