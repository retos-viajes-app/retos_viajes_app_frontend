// React & React Native Imports
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

// Component Imports
import { LoadingScreen } from '@/components/LoadingScreen';

// Hook Imports
import { useAuth } from '@/hooks/useAuth';
import DestinationsFlatList from '@/components/destination/DestinationsFlatList';


export default function ProfileScreen() {
  const router = useRouter();
  const {logout, user} = useAuth();

  const handleLogout = async () => {
    logout();
    router.replace("/login"); 
  };


  return user? (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Hola</Text>
      <Button title="Cerrar sesión de Google" onPress={handleLogout} />
    </SafeAreaView>
  ): <LoadingScreen />;
}

