
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, ImageBackground} from "react-native";
import { useRouter } from "expo-router";
import { LoadingScreen } from "@/components/LoadingScreen";
import PaddingView from "@/components/views/PaddingView";
import PrimaryButton from "@/components/botones/Buttons";
import StyledTextInputLabelText from "@/components/forms/Inputs";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import { useFormValidation } from "@/hooks/useFormValidation";
import globalStyles from "@/styles/global";
import { validations } from "@/utils/validations";
import useApi from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";

export default function RequestPasswordResetScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const {requestConfirmationCode} = useContext(AuthContext)!;
  const api = useApi();

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
        router.push(`/verify-confirmation-code?mode=passwordReset&&email=${email}`);
       }else {
        setErrorMessage( error ||"No pudimos enviar el código. Por favor, verifica tu correo e intenta de nuevo." );
        setLoading(false); 
        return;
       }
  };

  return (
    loading?<LoadingScreen />:
    <>
      <ImageBackground
        source={require("@/assets/images/loginImage.png")}
        style={{
          width: "100%",
          height: 124,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
        resizeMode="cover"
      ></ImageBackground>
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph
              title="Recuperar contraseña"
              paragraph="Ingresa tu correo electrónico para recibir un código de recuperación."
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}

            <StyledTextInputLabelText
              style={globalStyles.largeBodyMedium}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
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