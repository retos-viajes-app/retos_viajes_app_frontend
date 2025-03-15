import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTrip } from "@/hooks/useTrip";
import ParallaxScrollView from "../ParallaxScrollView";

const CurrentTripIndex = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);
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
      <View>
        <Text>Tienes viaje, {currentTime.toLocaleTimeString()}</Text>
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
export default CurrentTripIndex;
