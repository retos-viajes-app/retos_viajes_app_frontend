import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {Destination} from "@/models/destination"; // Importa el objeto de destino
import { getDestinationById } from "@/services/destinationService";
import ChallengesFlatList from "@/components/challenge/ChallengeFlatList";
//Styles
import globalStyles from "@/styles/global";
import { Colors } from "@/constants/Colors";
import buttonStyles from "@/styles/circles";
import {Check,Map} from "lucide-react-native";
import Divider from "@/components/Divider";
import { useTranslation } from "react-i18next";

export default function Destino() {
  const { t } = useTranslation();
  const { destination_id } = useLocalSearchParams();
  const [destination, setDestination] = React.useState<Destination | null>(null);
  useEffect(() => {
    getDestinationById(Number(destination_id)).then((data) => {
        setDestination(data.destination!);
        }).catch((error) => {
        throw error;
        }
    );
    
  }, [destination_id]);
  return (
    <View style={{ flex: 1, }}>
      <ImageBackground source={{ uri: destination?.image_url }} style={styles.imageBackground}>
        <View>
          <Text style={[globalStyles.largeBodySemiBold,{color: '#ffffff'}]}>{destination?.city}</Text>
            <Text style={[globalStyles.smallBodyRegular,{color: '#ffffff'}]}>{destination?.country}</Text>
        </View>
        <View style={[styles.visitadoContainer, {backgroundColor: Colors.colors.secondary[50]}]}>
          <View style={[buttonStyles.circle30,{backgroundColor: Colors.colors.secondary[100]}]}>
              <Check color={Colors.colors.success[800]}/>
          </View>
          <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.success[800], padding: 8}]}>{t("destination.visited")}</Text>
        </View>
      </ImageBackground>
      <View style={{paddingHorizontal:16, flex: 1}}>
        <View style={[styles.descriptionContainer,{marginBottom: 16, marginTop: 16}]}>
          <Text>{destination?.description}</Text>
        </View>
        <View style={styles.countryTripInfoContainer}>
          <View style={styles.countryTripInfo}>
            <View style={[buttonStyles.circle48, {backgroundColor: Colors.colors.primary[100]}, {borderWidth: 1, borderColor: Colors.colors.primary[200]}]}>
              <Map size={24} color={Colors.colors.primary[900]} strokeWidth={1} />
            </View>
            <View style={styles.countryTripInfoText}>
              <Text style={[globalStyles.smallBodyRegular, {color: Colors.colors.text.secondary}]}>{t("destination.languages")}</Text>
              <Text style={[globalStyles.largeBodySemiBold, {color: Colors.colors.text.primary}]}>{t("language."+ destination?.language!)}</Text>
            </View>
          </View>
          <Divider full={true}></Divider>
          <View style={styles.countryTripInfo}>
            <View style={[buttonStyles.circle48, {backgroundColor: Colors.colors.primary[100]}, {borderWidth: 1, borderColor: Colors.colors.primary[200]}]}>
              <Map size={24} color={Colors.colors.primary[900]} strokeWidth={1} />
            </View>
            <View style={styles.countryTripInfoText}>
              <Text style={[globalStyles.smallBodyRegular, {color: Colors.colors.text.secondary}]}>{t("destination.currency")}</Text>
              <Text style={[globalStyles.largeBodySemiBold, {color: Colors.colors.text.primary}]}>{destination?.currency}</Text>
            </View>
          </View>
        </View>
        <ChallengesFlatList destination_id={Number(destination_id)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  countryDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
  },
  visitadoContainer: {
    display: 'flex',
    justifyContent: 'center', 
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  imageBackground: {
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: Colors.colors.background.image,
    overflow: 'hidden',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
  },
  countryTripInfoContainer: {
    display: 'flex',
    padding: 10,
    
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch',
  },
  countryTripInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    alignSelf: 'stretch',
  },
  countryTripInfoText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    alignSelf: 'stretch',
  }
});