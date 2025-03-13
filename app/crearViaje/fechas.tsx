import PrimaryButton from "@/components/botones/Buttons";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import ViewInputs from "@/components/views/ViewInputs";
import { useTrip } from "@/hooks/useTrip";
import React, { useState } from "react";
import { View,Text } from "react-native";
import StyledDateInput from "@/components/forms/StyledDateInput";
export default function FechasScreen() {
    const [error,setError] = useState<string | undefined>(undefined);
    const {trip,setTrip} = useTrip();
    const handleContinue = () => {
    };
    return  (
      <PaddingView >
        <ViewContentContinue>
        <ViewForm>
          <TitleParagraph
            title="Selecciona las fechas de tu aventura"
            paragraph="Define cuándo empezará y terminará tu viaje"
          />
          <ViewInputs>
            <StyledDateInput
              title="Fecha de inicio"
            />
            <StyledDateInput
              title="Fecha de fin"
            />
          </ViewInputs>
            {error && <Text style={{ color: "red", padding:20 }}>{error}</Text> } 
        </ViewForm>
        <PrimaryButton title="continuar" onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}