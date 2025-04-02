import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Image, StyleSheet, View, Text, ImageBackground } from 'react-native';
import ParallaxScrollView from '../ParallaxScrollView';
import { useRouter } from 'expo-router';
import TitleParagraph from '../text/TitleParagraph';
import PrimaryButton from '../botones/Buttons';
import PaddingView from '../views/PaddingView';
import { TestTube } from 'lucide-react-native';
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
            onPress={() => router.push('/crearViaje/destino')}
          />
        </View>
      </PaddingView>
    </ImageBackground>
  );
};



export default NoCurrentTripIndex;