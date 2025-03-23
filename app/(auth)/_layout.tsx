import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Colors} from "@/constants/ColoresPropios";

export default function AuthLayout() {
  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <Stack screenOptions={{ headerShown: false,
          contentStyle: { backgroundColor: Colors.colors.neutral[100] }
        }}>
          
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="endRegister" />
          <Stack.Screen name="request-password-reset" />
          <Stack.Screen name="verify-confirmation-code" />
          <Stack.Screen name="reset-password" />

        </Stack>
      </ScrollView>
  );
}