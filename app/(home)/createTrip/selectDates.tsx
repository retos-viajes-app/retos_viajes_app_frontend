// React & React Native Imports
import React, { useState } from "react";
import { useRouter } from "expo-router";

// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";
import ViewInputs from "@/components/views/ViewInputs";
import StyledDateInput from "@/components/forms/DateInput";

// Hook Imports
import { useTrip } from "@/hooks/useTrip";
import { useTranslation } from "react-i18next";
import ErrorText from "@/components/text/ErrorText";


export default function SelectDatesScreen() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const {trip,setTrip} = useTrip();
    const [startDate,setStartDate] = useState<Date | null>(trip?.start_date || null);
    const [endDate,setEndDate] = useState<Date | null>(trip?.end_date || null);
    const { t } = useTranslation();
    const router = useRouter();
    //Comprovaciones de las fechas : 
    // startDate <= endDate
    // startDate > fecha actual
    // endDate lo limitamos?
    const handleContinue = () => {
      if(startDate && endDate){
        if(startDate <= endDate){
          setTrip({...trip,start_date:startDate,end_date:endDate});
          router.push("/createTrip/selectCategories");
        }else{
          setErrorMessage(t("errorsFrontend.invalidDatesSelected"));
        }
      }else{
        setErrorMessage(t("errorsFrontend.noDatesSelected"));
      }
    };
    return  (
      <PaddingView >
        <ViewContentContinue>
        <ViewForm>
          <TitleParagraph
            title={t("createTrip.selectDate.title")}
            paragraph={t("createTrip.selectDate.paragraph")}
          />
          <ViewInputs>
            <StyledDateInput
              date={startDate}
              title={t("createTrip.selectDate.startDate")}
              setDate = {setStartDate}
            />
            <StyledDateInput
            date={endDate}
              title={t("createTrip.selectDate.endDate")}
              setDate={setEndDate}
            />
          </ViewInputs>
          {errorMessage ? <ErrorText text={errorMessage} /> : null}
        </ViewForm>
        <PrimaryButton title={t("continue")} onPress={handleContinue}/>
        </ViewContentContinue>
      </PaddingView>
    );
}