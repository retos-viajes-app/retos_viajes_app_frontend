// React & React Native Imports
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Component Imports
import { LoadingScreen } from '@/components/LoadingScreen';
import { AppToast } from '@/components/CustomToast';

// Hook Imports
import { useFonts } from 'expo-font';

// Utility Imports



// Navigation Imports
import { Slot } from 'expo-router';

// Context Imports
import { AuthProvider } from "@/context/AuthContext";

// Splash Screen Imports
import * as SplashScreen from 'expo-splash-screen';

import { initI18n } from '@/i18n';



// Evita que la pantalla de carga desaparezca antes de tiempo
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  // Cargar fuentes personalizadas
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    InterRegular: require('@/assets/fonts/Inter_18pt-Regular.ttf'),
    InterSemiBold: require('@/assets/fonts/Inter_18pt-SemiBold.ttf'),
    InterBold: require('@/assets/fonts/Inter_18pt-Bold.ttf'),
    InterMedium: require('@/assets/fonts/Inter_18pt-Medium.ttf'),
  });

  const [i18nReady, setI18nReady] = useState(false);
  
  useEffect(() => {
    initI18n().then(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (loaded ) {
      SplashScreen.hideAsync();
    }
  }, [loaded, i18nReady]);

  if (!loaded || !i18nReady) {
    return <LoadingScreen/>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
        <AppToast />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}
