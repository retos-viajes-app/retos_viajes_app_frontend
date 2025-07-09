// React & React Native Imports
import { useState } from "react";
import { Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import StyledTextInput from "@/components/forms/StyledTextInput";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useValidations } from "@/hooks/useValidations";


// Style Imports
import globalStyles from "@/styles/global";


export default function VerifyConfirmationCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {verifyConfirmationCode, requestConfirmationCode} = useAuth();
  const [resendLoading, setResendLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const mode = params.mode?.toString() || "";
  const validations = useValidations();
  
  const { errors, validateForm } = useFormValidation({
    code: validations.resetCode,
  });

  const handleVerifyCode = async () => {
    setErrorMessage("");

    const isValid = validateForm({ code });

    if (!isValid) return;
    setLoading(true);
    const {success, error} = await verifyConfirmationCode(code, mode === "register");
    
    if (!success) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    if (mode === "register") {
      router.replace("/completeRegister");
    } else {
      router.push("/resetPassword");
    }
    setLoading(false);
  };

  const handleResendCode = async () => {
    if (resendLoading) return;
    
    if (!user?.email) {
      return;
    }
    setResendLoading(true);
    const response = await requestConfirmationCode(user!.email, mode);
    if (response.success) {
      setErrorMessage("")
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


  return (
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
              title={t("auth.verifyCode.title")}
              paragraph={`${t(
                      "auth.verifyCode.paragraph"
                    )}${user!.email}`}
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            <StyledTextInput
              style={globalStyles.largeBodyMedium}
              placeholder={t("auth.verifyCode.codePlaceholder")}
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
              {resendLoading ? (
                      <Text style={[globalStyles.mediumBodyMedium, { marginVertical: 16 }]}>
                        {t("auth.verifyCode.sending")}
                      </Text>
                    ) : (
                      <Text style={[globalStyles.mediumBodyMedium, { marginVertical: 16 }]}>
                        {t("auth.verifyCode.noCode")}
                        <Text style={globalStyles.link}>
                          {t("auth.verifyCode.sendOtherCodeLink")}
                        </Text>
                      </Text>
                    )}
            </TouchableOpacity>
          </ViewForm>

          <PrimaryButton
            title={t("auth.verifyCode.verify")}
            onPress={handleVerifyCode}
            disabled={code.length !== 6}
            style={[globalStyles.title, { width: "100%" }]}
            loading={loading}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
}

