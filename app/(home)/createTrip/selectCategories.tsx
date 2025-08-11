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


const SelectCategoriesScreen = ()=> {
    const {selectedCategoriesId,setSelectedCategoriesId} = useTrip();
    const [errorMessage,setErrorMessage] = useState<string | undefined>(undefined);
    const {categories, setCategories,trip,setTrip} = useTrip();
    const { t } = useTranslation();
    const router = useRouter();

    const handleContinue = () => {
        if(selectedCategoriesId.length < 2){
            setErrorMessage(t("errosFrontend.selectCategories"));
            return;
        }
        setTrip({...trip, categories: selectedCategoriesId.map(id => parseInt(id))});
        router.push("/createTrip/addParticipants");
        // Continuar a la siguiente pantalla
    }

    const handleSelect = (value: string) => {
        setSelectedCategoriesId(
            selectedCategoriesId.includes(value)
                ? selectedCategoriesId.filter((item) => item !== value)
                : [...selectedCategoriesId, value]
        );
    };
    useEffect(() => {
        const loadCategories = async () => {
            console.log('Component mounted, fetching categories');
            const response = await getCategories();
             if (response.error) {
                setErrorMessage(response.error);
            } else {
                setCategories(response.categories || []);
            }
        };
        loadCategories();
    }, []);
    

    return  (
    <PaddingView >
        <StepIndicator steps={5} currentStep={3} />
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
export default SelectCategoriesScreen;