import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

export default function ProfileStackLayout() {
  const { t } = useTranslation();

  return (
    <Stack 
      screenOptions={{ 
        contentStyle: { backgroundColor: Colors.colors.background.default }
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="destinations/[destinationId]" 
        options={{
          title: "Destino",
          headerBackTitle: t('back'),
          headerTintColor: Colors.colors.primary[400],
          headerTitleStyle: {
            color: Colors.colors.text.primary,
          }
        }} 
      />
      <Stack.Screen 
        name="trips/[tripId]" 
        options={{
          title: "Trip",
          headerBackTitle: t('back'),
          headerTintColor: Colors.colors.primary[400],
          headerTitleStyle: {
            color: Colors.colors.text.primary,
          }
        }} 
      />
    </Stack>
  );
}