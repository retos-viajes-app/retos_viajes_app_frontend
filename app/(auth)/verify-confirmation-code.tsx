// React & React Native Imports
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
// Component Imports
import PrimaryButton from "@/components/botones/Buttons";
import StyledTextInput from "@/components/forms/StyledTextInput";
import { LoadingScreen } from "@/components/LoadingScreen";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";
import { AuthContext } from "@/context/AuthContext";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { validations } from "@/utils/validations";




export default function verifyConfirmationCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {verifyConfirmationCode, requestConfirmationCode} = useContext(AuthContext)!;
  const [resendLoading, setResendLoading] = useState(false);
  
  // Obtener el email  y mode de los parámetros
  const email = params.email?.toString() || "";
  const mode = params.mode?.toString() || "";
  
  const { errors, validateForm } = useFormValidation({
    code: validations.resetCode,
  });

  const handleVerifyCode = async () => {
    setErrorMessage("");
    setLoading(true);

    const isValid = validateForm({ code });

    if (!isValid) {
      setLoading(false);
      return;
    }
    const {success, error} = await verifyConfirmationCode(email, code, mode === "register");

    if(success){
      setLoading(false); 
      if (mode === "register") {
        console.log("register");
        router.replace("/endRegister");
      } else {
        router.push({
          pathname: "/reset-password",
          params: {
            code: code
          }
        });
      }
       
    } else {
      setErrorMessage(typeof error === "string" ? error : "Hubo un problema al verificar el código. Por favor, intenta de nuevo.");
      setLoading(false);
      return;
    } 
  };

  const handleResendCode = async () => {
    if (resendLoading) return;
    setResendLoading(true);

    const response = await requestConfirmationCode(email, mode);
    if (response.success) {
      setErrorMessage("")
      console.log("COdigo")
      Toast.show({
        type: "success",
        text1: "Código enviado",
        text2: "Se ha enviado un nuevo código de verificación a tu correo.",
        position: "bottom",
        bottomOffset: 80,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: response.error || "No se pudo reenviar el código.",
        position: "bottom",
        bottomOffset: 80,
      });
    }

    setResendLoading(false);
  };


  return loading ? (
    <LoadingScreen />
  ) : (
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
              title="Verificar código"
              paragraph="Ingresa el código de 6 dígitos que enviamos a tu correo."
            />

            {errorMessage && typeof errorMessage === "string" ? (
              <ErrorText text={errorMessage} />
            ) : null}

            <StyledTextInput
              style={globalStyles.largeBodyMedium}
              placeholder="Código de 6 dígitos"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
              errorMessage={errors.code}
            />

            <TouchableOpacity
              onPress={handleResendCode}
              disabled={resendLoading}
            >
              <Text
                style={{
                  color: resendLoading ? "gray" : "#0066CC",
                  textAlign: "center",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                {resendLoading
                  ? "Enviando..."
                  : "¿No recibiste el código? Solicitar otro"}
              </Text>
            </TouchableOpacity>
          </ViewForm>

          <PrimaryButton
            title="Verificar código"
            onPress={handleVerifyCode}
            style={[globalStyles.title, { width: "100%" }]}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
}

