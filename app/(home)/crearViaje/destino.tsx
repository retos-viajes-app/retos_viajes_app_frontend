import { View, Text, FlatList, TouchableOpacity, StyleSheet, ListRenderItem } from "react-native";
import Destination from "@/models/destination";
import { useState, useEffect } from "react";
import StyledTextInputLabelText from "@/components/forms/StyledTextInputLabelText";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewForm from "@/components/views/ViewForm";
import ViewInputs from "@/components/views/ViewInputs";
import PaddingView from "@/components/views/PaddingView";
import { useTrip } from "@/hooks/useTrip";
import PrimaryButton from "@/components/botones/Buttons";
import { useRouter } from "expo-router";
export default function DestinosScreen() {
  const [search, setSearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {setDestinations,destinations,getDestinations,setTrip,trip } = useTrip();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { destinations, error } = await getDestinations();
        if (error) {
          setError(error);
        } else {
          setDestinations(destinations);
        }
      } catch (err) {
        setError("Hubo un problema al cargar los destinos.");
      }
    };

    fetchDestinations();
  }, []);

  const handleContinue = () => {
    if (selectedId) {
    setTrip({
        ...trip,  
        destination_id: selectedId,
        });
      router.push("/crearViaje/fechas");
    } else {
      setError("Debes seleccionar un destino para continuar.");
    }
  }

  const filteredData = destinations
    .filter(
      (item) =>
        item.country.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 4);

  const renderItemF = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedId(item.id);    
      }}
    >
      <Text>{item.city}</Text>
      <Text>{item.country}</Text>
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
                keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#ddd',
    padding: 20,
    height: 80,
    borderRadius: 16,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

// export default GridList;