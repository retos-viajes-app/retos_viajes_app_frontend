// React & React Native Imports
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// Component Imports
import { LoadingScreen } from "@/components/LoadingScreen";
import PaddingView from "@/components/views/PaddingView";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import StyledTextInput from "@/components/forms/StyledTextInput";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";
import { AuthContext } from "@/context/AuthContext";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { validations } from "@/utils/validations";


export default function RequestConfirmationCodeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {requestConfirmationCode} = useContext(AuthContext)!;

  const { errors, validateForm } = useFormValidation({
    email: validations.email,
  });

  const handleRequestCode = async () => {
    setErrorMessage("");
    setLoading(true);

    const isValid = validateForm({ email });

    if (!isValid) {
      setLoading(false);
      return;
    }

    const { success, error } = await requestConfirmationCode(email, "passwordReset");
       if (success) {
        setLoading(false);
        router.push(`/verifyConfirmationCode?mode=passwordReset&email=${email}`);
       }else {
        setErrorMessage( error ||"No pudimos enviar el código. Por favor, verifica tu correo e intenta de nuevo." );
        setLoading(false); 
        return;
       }
  };

  return (
    loading?<LoadingScreen />:
    <>
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph
              title="Recuperar contraseña"
              paragraph="Ingresa tu correo electrónico para recibir un código de recuperación."
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}

            <StyledTextInput
              style={globalStyles.largeBodyMedium}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              errorMessage={errors.email}
            />

            <TouchableOpacity onPress={() => router.replace("/login")}>
              <Text
                style={{
                  color: "#0066CC",
                  textAlign: "center",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                Volver al inicio de sesión
              </Text>
            </TouchableOpacity>
          </ViewForm>

          <PrimaryButton
            title="Enviar código"
            onPress={handleRequestCode}
            style={[globalStyles.title, { width: "100%" }]}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
}