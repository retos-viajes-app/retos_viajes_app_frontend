import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments, Slot, useLocalSearchParams } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

// Evita que la pantalla de carga desaparezca antes de tiempo
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // Cargar fuentes personalizadas
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    InterRegular: require('@/assets/fonts/Inter_18pt-Regular.ttf'),
    InterSemiBold: require('@/assets/fonts/Inter_18pt-SemiBold.ttf'),
    InterBold: require('@/assets/fonts/Inter_18pt-Bold.ttf'),
    InterMedium: require('@/assets/fonts/Inter_18pt-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen/>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <RootLayoutWithAuth />
          <Toast />
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>  );
}

function RootLayoutWithAuth() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const segments = useSegments();
   

  useEffect(() => {
    console.log("user:", user);
    const currentRoute = segments[1];
    
    // Rutas públicas que no requieren autenticación
    const publicRoutes = ["login", "register", "request-password-reset"];
    
    // Ruta de verificación de código
    const verifyCodeRoute = "verify-confirmation-code";
    
    // Ruta para completar registro
    const endRegisterRoute = "endRegister";
    
    // Ruta para resetear password
    const resetPasswordRoute = "reset-password";

    // CASO 1: Usuario no está autenticado (null)
    if (!user) {
      // Si está en una ruta que no es pública ni de verificación, redirigir a login
      if (!publicRoutes.includes(currentRoute!)) {
        router.replace("/login");
      }
      return;
    }
    
    // CASO 2: Usuario autenticado pero sin username (registro incompleto)
    if (user && !user.username) {
      // Caso 2.1: Verificado para registro - debe completar sus datos
      if (user.is_verified && user.verification_type === "register") {
        if (currentRoute !== endRegisterRoute) {
          router.replace("/endRegister");
        }
        return;
      }
      
      // Caso 2.2: Verificado para reset de password
      if (user.is_verified && user.verification_type === "passwordReset") {
        if (currentRoute !== resetPasswordRoute) {
          router.replace("/reset-password");
        }
        return;
      }
      
      // Caso 2.3: No verificado - debe verificar su código
      if (currentRoute !== verifyCodeRoute) {
        // Verificar si es registro o reset de contraseña
        const mode = user.verification_type === "passwordReset" ? "passwordReset" : "register";
        router.replace(`/verify-confirmation-code?mode=${mode}&email=${user.email}`);
      }
      return;
    }
    
    // CASO 3: Usuario completamente registrado (con username)
    if (user && user.username) {
      // Si intenta acceder a rutas de auth, redirigirlo a home
      if (publicRoutes.includes(currentRoute!) || 
          currentRoute === verifyCodeRoute || 
          currentRoute === endRegisterRoute || 
          currentRoute === resetPasswordRoute) {
        router.replace("/");
      }
    }
  }, [user, segments, router]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{headerShown:false}}/>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}