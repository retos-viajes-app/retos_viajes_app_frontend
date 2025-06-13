// React & React Native Imports
import { Redirect, Stack } from "expo-router";

// Context Imports
import { TripProvider } from "@/context/TripContext";
import { useAuth } from "@/hooks/useAuth";
import { SuggestedUsersProvider } from "@/context/SuggestedUsersContext";


export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/login"/>
  return (
    <TripProvider>
      <SuggestedUsersProvider>
      <Stack screenOptions={{ headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="createTrip" />
      </Stack>
      </SuggestedUsersProvider>
    </TripProvider>
  );
}