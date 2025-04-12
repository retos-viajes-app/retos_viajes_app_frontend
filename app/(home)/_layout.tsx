// React & React Native Imports
import { Stack } from "expo-router";

// Context Imports
import { TripProvider } from "@/context/TripContext";


export default function HomeLayout() {
  return (
    <TripProvider>
      <Stack screenOptions={{ headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="createTrip" />
      </Stack>
    </TripProvider>
  );
}