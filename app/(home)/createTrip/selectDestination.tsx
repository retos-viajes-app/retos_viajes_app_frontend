// React & React Native Imports
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

// Component Imports
import StyledTextInputLabelText from "@/components/forms/StyledTextInput";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewForm from "@/components/views/ViewForm";
import ViewInputs from "@/components/views/ViewInputs";
import PaddingView from "@/components/views/PaddingView";
import PrimaryButton from "@/components/buttons/PrimaryButton";

// Hook Imports
import { useTrip } from "@/hooks/useTrip";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import Destination from "@/models/destination";

export default function SelectDestinationScreen() {
  const [search, setSearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {destinations,setTrip,trip } = useTrip();


  const handleContinue = () => {
    if (selectedId) {
    setTrip({
        ...trip,  
        destination_id: selectedId,
        });
      router.push("/createTrip/selectDates");
    } else {
      setError("Debes seleccionar un destino para continuar.");
    }
  }

  const filteredData = destinations
    .filter(
      (item) =>
        item.country!.toLowerCase().includes(search.toLowerCase()) ||
        item.city!.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 4);

  const renderItemF = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={[
      styles.item,
      { opacity: selectedId === item.id ? 0.5 : 1 }
      ]}
      onPress={() => {
      setSelectedId(item.id);    
      }}
    >
    <ImageBackground 
      source={item.image_url ? { uri: item.image_url } : require('@/assets/images/ciudad-defecto-destino-grid.jpg')}
      style={styles.imageBackground}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.textContainer}>
        <Text style={[globalStyles.mediumBodyBold, styles.cityText]}>{item.city}</Text>
        <Text style={[ globalStyles.smallBodyRegular,styles.countryText]}>{item.country}</Text>
      </View>
    </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <PaddingView>
      <ViewContentContinue>
        <ViewForm>
          <TitleParagraph
            title="¿A dónde quieres ir?"
            paragraph="Escribe el nombre del destino o elige entre nuestras recomendaciones."
          />
          <ViewInputs>
            <StyledTextInputLabelText
              placeholder="Buscar por ciudad o país"
              value={search}
              onChangeText={setSearch}
            />
          </ViewInputs>
       
            {error && <Text style={{ color: "red", padding:20 }}>{error}</Text> } 
            <FlatList
                style={{ width: "100%" }}
                data={filteredData}
                numColumns={2}
                keyExtractor={(item) => item.id!.toString()}
                renderItem={renderItemF}
                columnWrapperStyle={{ gap: 16 }}
                contentContainerStyle={{ gap: 16 }}
            />
        </ViewForm>
        <PrimaryButton title="continuar" onPress={handleContinue}/>
      </ViewContentContinue>
    </PaddingView>
  );
}



  



const styles = StyleSheet.create({
   item: {
    flex: 1,
    height: 80, // Making it taller
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Text at the bottom
    padding: 0,
  },
  imageStyle: {
    borderRadius: 16,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
    padding: 10,
  },
  cityText: {
    color: 'white',
  },
  countryText: {
    color: 'white',
  },
});

// export default GridList;