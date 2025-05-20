// React & React Native Imports
import { useState } from "react";
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


export default function SelectCategoriesScreen() {
    const {selectedCategoriesId,setSelectedCategoriesId} = useTrip();
    const [errorMessage,setErrorMessage] = useState<string | undefined>(undefined);
    const {categories} = useTrip();
    const { t } = useTranslation();
    const router = useRouter();
    const handleContinue = () => {
        if(selectedCategoriesId.length < 2){
            setErrorMessage(t("errosFrontend.selectCategories"));
            return;
        }
        router.push("/createTrip/summary");
        // Continuar a la siguiente pantalla
    }

    const handleSelect = (value: string) => {
        setSelectedCategoriesId(
            selectedCategoriesId.includes(value)
                ? selectedCategoriesId.filter((item) => item !== value)
                : [...selectedCategoriesId, value]
        );
    };

    return  (
    <PaddingView >
        <ViewContentContinue>
            <ViewForm>
            <TitleParagraph
                title={t("createTrip.selectCategories.title")}
                paragraph={t("createTrip.selectCategories.paragraph")}
            />
            <ViewInputs>
                
            <StyledRadioButtonList
                options={categories.map((category) => ({ label: category.name || '', value: String(category.id) }))}
                selectedValues={selectedCategoriesId} // Ahora maneja múltiples selecciones
                onSelect={handleSelect}
            />
            </ViewInputs>
            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            </ViewForm>
            <PrimaryButton title={t("continue")} onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}