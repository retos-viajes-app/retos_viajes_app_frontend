// React & React Native Imports
import { useState } from "react";
import { useRouter} from "expo-router";
import Toast from "react-native-toast-message";

// Component Imports
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PaddingView from "@/components/views/PaddingView";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";
import PasswordInput from "@/components/forms/PasswordInput";

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAuth } from "@/hooks/useAuth";
import { useValidations } from "@/hooks/useValidations";
import { useTranslation } from "react-i18next";

// Style Imports
import globalStyles from "@/styles/global";


export default function ResetPasswordScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const validations = useValidations();

  const { errors, validateForm } = useFormValidation({
    newPassword: validations.password,
    confirmPassword: (value: string) => {
      return validations.passwordCheck(value, newPassword);
    }
  });

  

  const handleResetPassword = async () => {
    setErrorMessage("");

    const isValid = validateForm({ newPassword, confirmPassword });
    if (!isValid) return;
    setLoading(true);
    const {success,error} = await resetPassword(newPassword);

    if(!success) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }
    Toast.show({
        type: "success",
        text1: "Contraseña cambiada",
        text2: "XHas cambiado tu contraseña con exito"
    });
    router.dismissAll();
    router.replace("/login");
    setLoading(false);
    
  };

  return (
    <>
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph
              title={t("auth.resetPassword.title")}
              paragraph={t("auth.resetPassword.paragraph")}
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            <ViewInputs>
              <PasswordInput
                style={globalStyles.largeBodyMedium}
                placeholder={t("auth.resetPassword.newPassword")}
                value={newPassword}
                onChangeText={setNewPassword}
                errorMessage={errors.newPassword}
              />

              <PasswordInput
                style={globalStyles.largeBodyMedium}
                placeholder={t("auth.resetPassword.confirmPassword")}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                errorMessage={errors.confirmPassword}
              />
            </ViewInputs>
          </ViewForm>

          <PrimaryButton
            title={t("auth.resetPassword.updatePassword")}
            onPress={handleResetPassword}
            loading={loading}
            style={[globalStyles.title, { width: "100%" }]}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
}
