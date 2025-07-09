import React from "react";
import {Stack} from "expo-router";
import { useTranslation } from "react-i18next";

export default function IndexLayout() {
  const { t } = useTranslation();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="destination/[destination_id]"
        options={{ title: t("destination.title"), headerShown: true, headerTitleAlign: "center" }}
      />
    </Stack>
  );
}