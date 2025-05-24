import React from "react";
import {Stack} from "expo-router";

export default function InicioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="destination/[destination_id]"/>
    </Stack>
  );
}