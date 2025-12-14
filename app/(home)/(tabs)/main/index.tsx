// React & React Native Imports
import {  ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

// Component Imports
import NoCurrentTripIndex from '@/components/index/NoCurrentTripIndex';
import ConnectUsers from '@/components/SuggestedUsers';

//Imports para borrar datos de expo-secure-store y localStorage
import DestinationsFlatList from '@/components/destination/DestinationsFlatList';

import Trip from '@/models/trip';
import PendingTripCard from '@/components/trip/PendingTripCard';
import PendingTripFlatList from '@/components/trip/PendingTripFlatList';

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
  
  const trip_mock: Trip = {
    destination_name: "París",
    completed_challenges_count: 5,
    destination_image_url: "https://example.com/paris.jpg",
    is_ongoing: true,
    extra_participants: 2,
  };

  return (
    <>
      
      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <NoCurrentTripIndex />
          <PendingTripFlatList />
          <DestinationsFlatList />
          <ConnectUsers />
        </ScrollView> 
      </View>
    </>
    );
}

