// React & React Native Imports
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

// Component Imports
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PaddingView from '@/components/views/PaddingView';

// Hook Imports
import { useAuth } from '@/hooks/useAuth';

// Style Imports
import globalStyles from '@/styles/global';


const NoCurrentTripIndex = () => {
  const router = useRouter();
  const { user} = useAuth();

  return (
    //273 no queda bien
    <ImageBackground style={{height: 400}} source={require('@/assets/images/trip-header.png') }resizeMode="cover">
      <PaddingView>
        <View style={{flex: 1, justifyContent: 'center', gap: 16}}>  
          <View style={{ gap: 8, alignItems: 'center'}}>
            <Text style={globalStyles.diplaySemiBold}>¡Hola, {user?.name}!👋</Text> 
            <Text style={globalStyles.subtitle}>Prepárate para una nueva aventura</Text> 
          </View>
          <PrimaryButton 
            title='Crear mi primer viaje' 
            onPress={() => router.push('/createTrip/selectDestination')}
          />
        </View>
      </PaddingView>
    </ImageBackground>
  );
};



export default NoCurrentTripIndex;