import { Image, StyleSheet, Platform,Text} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LoadingScreen } from '@/components/LoadingScreen';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import PrimaryButton from '@/components/botones/Buttons';
import TitleParagraph from '@/components/text/TitleParagraph';
import { useTrip } from '@/hooks/useTrip';
import  NoCurrentTripIndex  from '@/components/index/noCurrentTripIndex';
import CurrentTripIndex from '@/components/index/currentTripIndex';
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
  const router = useRouter();
  const {currentTrip} = useTrip();
  return  user ? (
    currentTrip?  <CurrentTripIndex/>  :<NoCurrentTripIndex/>
  ) :  <LoadingScreen/>;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width:"100%",
    height: "100%",
  },
});
