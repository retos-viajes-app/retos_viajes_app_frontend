import { Image, StyleSheet, Platform,Text, Button, View, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LoadingScreen } from '@/components/LoadingScreen';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {sendConnectionRequest} from '@/services/user_connections_service';
import {useConnectUser} from '@/hooks/useConnectUser';
import UserCard from '@/components/UserCard';
import User from '@/models/user';
import ConnectUsers from '@/components/ConnectUsers';
export default function HomeScreen() {
  //Verificación de usuario
  //Descomentar cuando se quiera probar en android para que borre los datos de la app
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     // Si es Android, borra todos los datos de expo-secure-store
  //     SecureStore.deleteItemAsync('user')  // Borra un dato específico
  //       .then(() => {
  //         console.log('Datos de expo-secure-store borrados');
  //       })
  //       .catch(error => {
  //         console.error('Error al borrar de expo-secure-store', error);
  //       });
  //   } else {
  //     // Si no es Android (por ejemplo, iOS o Web), borra todos los datos de localStorage
  //     if (typeof localStorage !== 'undefined') {
  //       localStorage.clear();
  //       console.log('Todos los datos de localStorage borrados');
  //     } else {
  //       console.log('localStorage no disponible');
  //     }
  //   }
  // }, []);
  const { user} = useAuth();
 
  return user ? (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World</ThemedText>
        <HelloWave />
      </ThemedView>
      {user && <Text>Welcome {user.email}</Text>}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>
        </ThemedText>
      </ThemedView>
      <View style={styles.container}>
        <ConnectUsers />
      </View>
    </ParallaxScrollView>
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  loadingContainer: {
    width: 150,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMoreContainer: {
    width: 50,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
