// React & React Native Imports
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
// Component Imports
import StyledRadioButtonList from "@/components/forms/RadioButtonList";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ErrorText from "@/components/text/ErrorText";
import StepIndicator from "@/components/ui/StepIndicator";
import IconTextInput from "@/components/forms/IconTextInput";
import UserCard from "@/components/acceptedConnections/acceptedUserConnectionCard"; // nuestro nuevo componente
// Hook Imports
import { useTrip } from "@/hooks/useTrip";
import { useTranslation } from "react-i18next";
import { getAcceptedConnectionsInfo } from "@/services/userConnectionServices";
import { useAuth } from "@/hooks/useAuth";
// Other Imports
import { Search } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const AddParticipantsScreen = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { acceptedConnections, setAcceptedConnections } = useTrip();

  const handleContinue = () => {
    router.push("/createTrip/summary");
  };

  const fetchUserConnections = async () => {
    try {
      const response = await getAcceptedConnectionsInfo(user?.id!);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setAcceptedConnections(response.acceptedConnections || []);
      }
    } catch (error) {
      console.error("Error fetching user connections:", error);
    }
  };

  useEffect(() => {
    fetchUserConnections();
  }, []);

  // Filtrar la lista según el buscador
  const filteredConnections = acceptedConnections.filter(
    (conn) =>
      conn.name?.toLowerCase().includes(search.toLowerCase()) ||
      conn.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PaddingView>
      <StepIndicator steps={5} currentStep={4} />
      <ViewContentContinue>
        <ViewForm>
          <TitleParagraph
            title={t("createTrip.addParticipants.title")}
            paragraph={t("createTrip.addParticipants.paragraph")}
          />
          <ViewInputs>
            <IconTextInput
              placeholder={t("createTrip.addParticipants.searchPlaceholder")}
              value={search}
              onChangeText={setSearch}
              icon={<Search size={24} color={Colors.colors.text.primary} />}
            />
          </ViewInputs>
          {errorMessage ? <ErrorText text={errorMessage} /> : null}

          {/* Aquí va el FlatList */}
          <View style={{ width: "100%", height: 270 }}>
            <FlatList
                data={filteredConnections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <UserCard
                    name={item.name}
                    username={item.username}
                    profile_photo_url={item.profile_photo_url}
                    onPressAdd={() => console.log(`Agregar a ${item.profile_photo_url}`)}
                />
                )}
                style={{ marginTop: 16 }}
            />
           </View>
        </ViewForm>
        <PrimaryButton title={t("continue")} onPress={handleContinue} />
      </ViewContentContinue>
    </PaddingView>
  );
};

export default AddParticipantsScreen;
