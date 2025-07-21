// React & React Native Imports
import { SafeAreaView, Text } from 'react-native';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Ranking</Text>
    </SafeAreaView>
  ): <LoadingScreen/>;
}

