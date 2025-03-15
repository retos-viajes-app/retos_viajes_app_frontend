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
import { useRouter } from "expo-router";
export default function FechasScreen() {
    const [error,setError] = useState<string | undefined>(undefined);
    const {trip,setTrip} = useTrip();
    const [startDate,setStartDate] = useState<Date | null>(trip?.start_date || null);
    const [endDate,setEndDate] = useState<Date | null>(trip?.end_date || null);
    const router = useRouter();
    //Comprovaciones de las fechas : 
    // startDate <= endDate
    // startDate > fecha actual
    // endDate lo limitamos?
    const handleContinue = () => {
      if(startDate && endDate){
        if(startDate <= endDate){
          setTrip({...trip,start_date:startDate,end_date:endDate});
          router.push("/crearViaje/misionesCategories");
        }else{
          setError("La fecha de inicio debe ser menor a la fecha de fin");
        }
      }else{
        setError("Debes seleccionar ambas fechas");
      }
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
              date={startDate}
              title="Fecha de inicio"
              setDate = {setStartDate}
            />
            <StyledDateInput
            date={endDate}
              title="Fecha de fin"
              setDate={setEndDate}
            />
          </ViewInputs>
            {error && <Text style={{ color: "red", padding:20 }}>{error}</Text> } 
        </ViewForm>
        <PrimaryButton title="continuar" onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}