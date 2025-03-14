import { View,Text } from "react-native";
import StyledRadioButton from "@/components/forms/StyledRadioButton";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PrimaryButton from "@/components/botones/Buttons";
import { useState } from "react";
export default function MisionesScreen() {
    const [selectedOption, setSelectedOption] = useState("");
    const [error,setError] = useState<string | undefined>(undefined);
    const handleContinue = () => {
    }
    return  (
    <PaddingView >
        <ViewContentContinue>
            <ViewForm>
            <TitleParagraph
                title="Selecciona las fechas de tu aventura"
                paragraph="Define cuándo empezará y terminará tu viaje"
            />
            <ViewInputs>
            <StyledRadioButton
                options={[
                { label: "Opción 1", value: "option1" },
                { label: "Opción 2", value: "option2" },
                ]}
                selectedValue={selectedOption}
                onSelect={setSelectedOption}
            />
            </ViewInputs>
                {error && <Text style={{ color: "red", padding:20 }}>{error}</Text> } 
            </ViewForm>
            <PrimaryButton title="continuar" onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}