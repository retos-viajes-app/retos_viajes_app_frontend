// React & React Native Imports
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
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
import {Destination} from "@/models/destination";
import { useTranslation } from "react-i18next";
import ErrorText from "@/components/text/ErrorText";
import { getDestinationsPaginated } from "@/services/destinationService";
import { Colors } from "@/constants/Colors";
import StepIndicator from "@/components/ui/StepIndicator";

const SelectDestination = ()=> {
  const [search, setSearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { t } = useTranslation();
  const {setTrip,trip } = useTrip();
  const [loading, setLoading] = useState(false);
  const { destinations, setDestinations } = useTrip();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDestinations = async (currentPage: number) => {
    if (loading || !hasMore) return;

    console.log('Fetching destinations for page:', currentPage);
    setLoading(true);
    try {
      const destinationsResponse = await getDestinationsPaginated(currentPage);
      if (destinationsResponse.error) {
        console.error('Error fetching destinations:', destinationsResponse.error);
        return;
      }
      const data = destinationsResponse.destinations;
      console.log('Fetched destinations:', data);
      setDestinations([...destinations, ...data]);
      setHasMore(destinationsResponse.pagination.has_more);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDestinations = async () => {
      console.log('Component mounted, fetching destinations for page:', page);
      await fetchDestinations(page);
    };
    loadDestinations();
  }, []);

  const handleLoadMore = async () => {
      if (!loading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchDestinations(nextPage);
      }
    };
  

  const handleContinue = () => {
    if (selectedId) {
    setTrip({
        ...trip,  
        destination_id: selectedId,
        status: "pending",
        });
      router.push("/createTrip/selectDates");
    } else {
      setErrorMessage(t("errosFrontend.selectDestination"));
    }
  }

  const filteredData = destinations
    .filter(
      (item) =>
        item.country!.toLowerCase().includes(search.toLowerCase()) ||
        item.city!.toLowerCase().includes(search.toLowerCase())
    )

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
      //source={item.image_url ? { uri: item.image_url } : require('@/assets/images/ciudad-defecto-destino-grid.jpg')}
      source= {require('@/assets/images/ciudad-defecto-destino-grid.jpg')}
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
      <StepIndicator steps={4} currentStep={1} />
      <ViewContentContinue>
        <ViewForm>
          <TitleParagraph
            title={t("createTrip.selectDestination.title")}
            paragraph={t("createTrip.selectDestination.paragraph")}
          />
          <ViewInputs>
            <StyledTextInputLabelText
              placeholder={t("createTrip.selectDestination.searchPlaceholder")}
              value={search}
              onChangeText={setSearch}
            />
          </ViewInputs>
             
            {errorMessage ? <ErrorText text={errorMessage} /> : null}
          <View style={{ width: "100%", height: 270 }}>
            <FlatList
              style={{ 
                  width: "100%",
              }}
              data={filteredData}
              numColumns={2}
              keyExtractor={(item) => item.id!.toString()}
              renderItem={renderItemF}
              columnWrapperStyle={{ gap: 16 }}
              contentContainerStyle={{ 
                gap: 16,
                paddingBottom: 16,
              }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <ActivityIndicator /> : null}
              showsVerticalScrollIndicator={true}
              />
          </View>
        </ViewForm>
        <PrimaryButton title={t("continue")} onPress={handleContinue}/>
      </ViewContentContinue>
    </PaddingView>
  );
}


const styles = StyleSheet.create({
   item: {
    flex: 1,
    height: 120,
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
export default SelectDestination;