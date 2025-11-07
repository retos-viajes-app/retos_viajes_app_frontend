import React from "react";
import {Stack} from "expo-router";
import { useTranslation } from "react-i18next";

export default function TripLayout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ }}>
      <Stack.Screen name="tripDetails"
        options={{headerShown: false }}
    />
      <Stack.Screen name="challengeDetails"
        options={{ title: t("challenge.title"), headerShown: true, headerTitleAlign: "center" }}
      />
    </Stack>
  );
}