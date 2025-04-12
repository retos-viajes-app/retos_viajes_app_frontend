// React & React Native Imports
import { Text } from 'react-native';

// Component Imports
import { LoadingScreen } from '@/components/LoadingScreen';

// Hook Imports
import { useAuth } from '@/hooks/useAuth';

// Style Imports

// Utility Imports


export default function RankingScreen() {
    //Verificación de usuario
    const {user} = useAuth();

 
  return user ? (
    <Text>Ranking</Text>
  ): <LoadingScreen/>;
}

