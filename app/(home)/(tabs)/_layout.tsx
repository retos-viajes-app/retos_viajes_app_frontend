// React & React Native Imports
import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

// Component Imports
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

// Utility Imports
import { Colors } from '@/constants/Colors';

// Icon Imports
//import { House, UserRound, Hash, MessageCircleHeart } from 'lucide-react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function TabLayout() {
  const { t } = useTranslation();

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
        name="inicio"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ focused }) => (
            // <House
            //   color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
            //   strokeWidth={1}
            //   size={35}
            // />
            <Feather
              name="home"
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]}
              size={35}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: t("tabs.activity"),
          tabBarIcon: ({ focused }) => (
            // <MessageCircleHeart
            //   color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
            //   strokeWidth={1}
            //   size={35}
            // />
            <Feather
              name="message-circle"
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]}
              size={35}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: t("tabs.ranking"),
          tabBarIcon: ({ focused }) => (
            // <Hash
            //   color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
            //   strokeWidth={1}
            //   size={35}
            // />
            <Feather
              name="hash"
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]}
              size={35}
            />
          ),
        }}
      />
     <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ focused }) => (
            // <UserRound
            //   color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]} // Cambia color según estado
            //   strokeWidth={1}
            //   size={35}
            // />
            <Feather
              name="user"
              color={focused ? Colors.colors.primary[200] : Colors.colors.gray[300]}
              size={35}
            />
          ),
        }}
      />

    </Tabs>
    </>
  );
}
