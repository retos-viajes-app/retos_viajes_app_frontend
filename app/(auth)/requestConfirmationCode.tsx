// React & React Native Imports
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// Component Imports
import PaddingView from "@/components/views/PaddingView";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import StyledTextInput from "@/components/forms/StyledTextInput";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { validations } from "@/utils/validations";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";


export default function RequestConfirmationCodeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {requestConfirmationCode} = useAuth();
  const { t } = useTranslation();

  const { errors, validateForm } = useFormValidation({
    email: validations.email,
  });

  const handleRequestCode = async () => {
    setErrorMessage("");

    const isValid = validateForm({ email });

    if (!isValid) return;
    setLoading(true);

    const { success, error } = await requestConfirmationCode(email, "passwordReset");

    if (!success) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }
    router.push("/verifyConfirmationCode?mode=passwordReset");
    setLoading(false);
  };

  return (
    <>
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph
              title={t("auth.requestConfirmationCode.title")}
              paragraph={t("auth.requestConfirmationCode.paragraph")}
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}

            <StyledTextInput
              style={globalStyles.largeBodyMedium}
              placeholder={t("auth.requestConfirmationCode.email")}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              errorMessage={errors.email}
            />

            <TouchableOpacity onPress={() => {
              router.dismissAll();
              router.replace("/login")}
              }>
              <Text
                style={{
                  color: "#0066CC",
                  textAlign: "center",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                {t("auth.requestConfirmationCode.backToLogin")}
              </Text>
            </TouchableOpacity>
          </ViewForm>

          <PrimaryButton
            title={t("auth.requestConfirmationCode.sendCode")}
            onPress={handleRequestCode}
            style={[globalStyles.title, { width: "100%" }]}
            loading={loading}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
}