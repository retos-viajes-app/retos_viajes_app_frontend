import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import {Colors} from "@/constants/Colors";

export default function AuthLayout() {
  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <Stack screenOptions={{ headerShown: false,
          contentStyle: { backgroundColor: Colors.colors.neutral[100] }
        }}>
          
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="completeRegister" />
          <Stack.Screen name="requestConfirmationCode"   options={{
                headerShown: true,
                headerTitle: "Recuperar contraseña",
                headerTitleAlign: "center",
              }}/>
          <Stack.Screen name="verifyConfirmationCode" />
          <Stack.Screen name="resetPassword" />

        </Stack>
      </ScrollView>
  );
}