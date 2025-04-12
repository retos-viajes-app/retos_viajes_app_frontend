// React & React Native Imports
import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

// Component Imports
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

// Hook Imports
import { useColorScheme } from '@/hooks/useColorScheme';

// Utility Imports
import { Colors } from '@/constants/ColoresPropios';

// Icon Imports
import { House, UserRound, Hash, MessageCircleHeart } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.colors.primary[200], //Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab, //Retroalimentacion haptica (Vibra cuando se toca)
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Viaje',
          tabBarIcon: ({ focused }) => (
            <House
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
              strokeWidth={1}
              size={35}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Actividad',
          tabBarIcon: ({ focused }) => (
            <MessageCircleHeart
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
              strokeWidth={1}
              size={35}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ focused }) => (
            <Hash
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
              strokeWidth={1}
              size={35}
            />
          ),
        }}
      />
     <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <UserRound
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
              strokeWidth={1}
              size={35}
            />
          ),
        }}
      />

    </Tabs>
    </>
  );
}
