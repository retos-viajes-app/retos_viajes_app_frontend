import { View,Text } from "react-native";
import StyledRadioButton from "@/components/forms/StyledRadioButton";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PrimaryButton from "@/components/botones/Buttons";
import { useEffect, useState } from "react";
import { useTrip } from "@/hooks/useTrip";
import { useRouter } from "expo-router";
export default function MisionesCategoriesScreen() {
    const {selectedCategoriesId,setSelectedCategoriesId} = useTrip();
    const [error,setError] = useState<string | undefined>(undefined);
    const {categories,getCategories} = useTrip();
    const router = useRouter();
    useEffect(() => {
        getCategories(); 
      }, []);
    const handleContinue = () => {
        if(selectedCategoriesId.length < 2){
            setError("Selecciona al menos dos categoría");
            return;
        }
        router.push("/crearViaje/resumen");
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
                
            <StyledRadioButton
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