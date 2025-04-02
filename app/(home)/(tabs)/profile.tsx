import {  View, Text, Button} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function TabTwoScreen() {
  const router = useRouter();
  const {logout, user} = useAuth();

  const handleLogout = async () => {
    await logout();
    //No se debe añadir la redireccione en el context
    router.replace("/login"); 
  };


  return user? (
    
    <View>
      <Text>Hola</Text>
      <Button title="Cerrar sesión de Google" onPress={handleLogout} />
    </View>
  ): <LoadingScreen />;
}

