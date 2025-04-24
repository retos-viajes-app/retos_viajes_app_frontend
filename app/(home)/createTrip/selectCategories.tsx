// React & React Native Imports
import { Text } from "react-native";
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


export default function SelectCategoriesScreen() {
    const {selectedCategoriesId,setSelectedCategoriesId} = useTrip();
    const [error,setError] = useState<string | undefined>(undefined);
    const {categories} = useTrip();
    const router = useRouter();
    const handleContinue = () => {
        if(selectedCategoriesId.length < 2){
            setError("Selecciona al menos dos categoría");
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
                title="Elige tus misiones"
                paragraph="Personaliza tu aventura con desafíos culturales, gastonómicos y más."
            />
            <ViewInputs>
                
            <StyledRadioButtonList
                options={categories.map((category) => ({ label: category.name || '', value: String(category.id) }))}
                selectedValues={selectedCategoriesId} // Ahora maneja múltiples selecciones
                onSelect={handleSelect}
            />
            </ViewInputs>
                {error && <Text style={{ color: "red", padding:20 }}>{error}</Text> } 
            </ViewForm>
            <PrimaryButton title="continuar" onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}