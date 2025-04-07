import { TripProvider } from "@/context/TripContext";
import { Stack } from "expo-router";

export default function HomeLayout() {
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