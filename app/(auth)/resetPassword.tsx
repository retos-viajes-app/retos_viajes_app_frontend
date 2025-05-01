// React & React Native Imports
import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { useRouter} from "expo-router";
import Toast from "react-native-toast-message";

// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import StyledTextInput from "@/components/forms/StyledTextInput";
import { LoadingScreen } from "@/components/LoadingScreen";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAuth } from "@/hooks/useAuth";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { validations } from "@/utils/validations";




export default function ResetPasswordScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {resetPassword,} = useAuth();

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

    const {success,error} = await resetPassword(newPassword);

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
              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder="Nueva contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                errorMessage={errors.newPassword}
              />

              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder="Confirmar contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
