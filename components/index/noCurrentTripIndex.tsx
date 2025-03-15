import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '../ParallaxScrollView';
import { useRouter } from 'expo-router';
import TitleParagraph from '../text/TitleParagraph';
import PrimaryButton from '../botones/Buttons';


const NoCurrentTripIndex = () => {
  const router = useRouter();
  const { user} = useAuth();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/viaje-header.png')}
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.contentContainer}>
        <TitleParagraph 
          title={`¡Hola, ${user?.name}!`} 
          paragraph='Prepárate para una nueva aventura'
        />
        <PrimaryButton 
          title='Crear mi primer viaje' 
          onPress={() => router.push('/crearViaje/destino')}
        />
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
});

export default NoCurrentTripIndex;