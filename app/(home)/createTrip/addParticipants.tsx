// React & React Native Imports
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
// Component Imports
import StyledRadioButtonList from "@/components/forms/RadioButtonList";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PrimaryButton from "@/components/buttons/PrimaryButton";
// Hook Imports
import { useTrip } from "@/hooks/useTrip";
import { useTranslation } from "react-i18next";
import ErrorText from "@/components/text/ErrorText";
import { getCategories } from "@/services/categoryService";
import StepIndicator from "@/components/ui/StepIndicator";
import IconTextInput from "@/components/forms/IconTextInput";
import { Search } from "lucide-react-native";
import { Colors } from "@/constants/Colors";


const AddParticipantsScreen = ()=> {
    const {t} = useTranslation();
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const handleContinue = () => {
        router.push("/createTrip/summary");
    };

    return  (
    <PaddingView >
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
            {/* {errorMessage ? <ErrorText text={errorMessage} /> : null} */}
            </ViewForm>
            <PrimaryButton title={t("continue")} onPress={handleContinue} />
        </ViewContentContinue>
      </PaddingView>
    );
}
export default AddParticipantsScreen;