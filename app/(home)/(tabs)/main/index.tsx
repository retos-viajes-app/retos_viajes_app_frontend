// React & React Native Imports
import {  StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

// Component Imports
import NoCurrentTripIndex from '@/components/index/NoCurrentTripIndex';
import ConnectUsers from '@/components/SuggestedUsers';

//Imports para borrar datos de expo-secure-store y localStorage
import DestinationsFlatList from '@/components/destination/DestinationsFlatList';

export default function IndexScreen() {
  // Verificación de usuario
  // Descomentar cuando se quiera probar en android para que borre los datos de la app
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
  

  return (
   
    <>
      <NoCurrentTripIndex />
      
      <View>
        <DestinationsFlatList />
        <ConnectUsers />
      </View>
    </>
    );
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
