import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import {Colors} from "@/constants/Colors";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
  const {t} = useTranslation();

  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <Stack screenOptions={{ headerShown: false,
          contentStyle: { backgroundColor: Colors.colors.background.default },
        }}>
          
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="completeRegister" options={{
                headerShown: true,
                headerTitle: t("completeRegister.header"),
                headerTitleAlign: "center",
                headerBackTitle: "Atrás"
              }} />
          <Stack.Screen name="requestConfirmationCode"   options={{
                headerShown: true,
                headerTitle: "Recuperar contraseña",
                headerTitleAlign: "center",
                headerBackTitle: "Atrás"
              }}/>
          <Stack.Screen name="verifyConfirmationCode"  options={{
                headerShown: true,
                headerTitle: "Verifica tu correo",
                headerTitleAlign: "center",
                headerBackTitle: "Atrás"
              }}/>
          <Stack.Screen name="resetPassword" 
            options={{
                  headerShown: true,
                  headerTitle: "Cambiar contraseña",
                  headerTitleAlign: "center",
                  headerBackTitle: "Atrás"
                }}
          />

        </Stack>
      </ScrollView>
  );
}