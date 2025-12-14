import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import PrimaryButton from "@/components/botones/Buttons";
import StyledTextInputLabelText from "@/components/forms/Inputs";
import { LoadingScreen } from "@/components/LoadingScreen";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import { useFormValidation } from "@/hooks/useFormValidation";
import globalStyles from "@/styles/global";
import { validations } from "@/utils/validations";
import useApi from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";
import ViewInputs from "@/components/views/ViewInputs";
import Toast from "react-native-toast-message";


export default function ResetPasswordScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const {resetPassword,} = useAuth();
  const api = useApi();
  useEffect(() => {
    if (user?.is_verified && user.verification_type == "passwordReset") {
      Toast.show({
        type: "success",
        text1: "Código verificado",
        text2: "Establece tu nueva contraseña",
        position: "bottom",
        bottomOffset: 80,
      });
    }
  }, []);
  const code = params.code?.toString() || "";
  const { errors, validateForm } = useFormValidation({
    newPassword: validations.password,
    confirmPassword: (value: string) => {
      return validations.passwordCheck(value, newPassword);
    }
  });

  const handleResetPassword = async () => {
    setErrorMessage("");
    setLoading(true);

    const isValid = validateForm({ newPassword, confirmPassword });
    if (!isValid) {
      setLoading(false);
      return;
    }

    const {success,error} = await resetPassword(user!, newPassword);

    if (success) {
      setLoading(false);
      router.replace("/login");
    }else{
      setErrorMessage(
        error ||
          "No pudimos actualizar tu contraseña. Por favor, intenta de nuevo."
      );
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
              title="Nueva contraseña"
              paragraph="Establece una nueva contraseña para tu cuenta."
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            <ViewInputs>
              <StyledTextInputLabelText
                style={globalStyles.largeBodyMedium}
                placeholder="Nueva contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                errorMessage={errors.newPassword}
              />

              <StyledTextInputLabelText
                style={globalStyles.largeBodyMedium}
                placeholder="Confirmar contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                errorMessage={errors.confirmPassword}
              />
            </ViewInputs>
          </ViewForm>

          <PrimaryButton
            title="Actualizar contraseña"
            onPress={handleResetPassword}
            style={[globalStyles.title, { width: "100%" }]}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
}
