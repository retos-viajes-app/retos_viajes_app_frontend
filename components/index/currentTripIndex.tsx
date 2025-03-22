import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTrip } from "@/hooks/useTrip";
import ParallaxScrollView from "../ParallaxScrollView";
import TripProgressCircle from "../ui/progressCircle";
import { ImageBackground } from "react-native";
import PaddingView from "../views/PaddingView";

const CurrentTripIndex = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentTrip,destinations } = useTrip();
  const currentDestination = destinations.find((destination) => destination.id === currentTrip?.destination_id);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);
  return (
    
    <ImageBackground 
      style={{
      height: 180, 
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      overflow: 'hidden'
      }} 
      source={require('@/assets/images/loginImage.png')}
      resizeMode="cover"
    >
    <PaddingView>
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor: '#F5F5F5', borderRadius: 60}}>
          {currentTrip?.start_date && currentTrip?.end_date && (
        <TripProgressCircle startDate={currentTrip.start_date} endDate={currentTrip.end_date} />
          )}
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text>Descubriendo</Text>
        <Text >{currentDestination?.city }</Text>
          </View>
          {currentTrip?.start_date && currentTrip?.end_date && (
        <TripProgressCircle startDate={currentTrip.start_date} endDate={currentTrip.end_date} />
          )}
        </View>
      </View>

    </PaddingView>
  </ImageBackground>
     
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
