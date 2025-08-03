// React & React Native Imports
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

// Component Imports
import DividerWithText from "@/components/Divider";
import StyledTextInput from "@/components/forms/StyledTextInput";
import PaddingView from "@/components/views/PaddingView";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import ViewForm from "@/components/views/ViewForm";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import PasswordInput from "@/components/forms/PasswordInput";
import ErrorText from "@/components/text/ErrorText";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useValidations } from "@/hooks/useValidations";
import { useTranslation } from "react-i18next";

// Style Imports
import globalStyles from "@/styles/global";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";


const RegisterScreen = () => {
  const {register, requestConfirmationCode} = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const validations = useValidations();
  
  const { errors, validateForm } = useFormValidation({
    email: validations.email,
    password: validations.password,
    passwordCheck: (value) => validations.passwordCheck(value, password),
  });

  const handleRegister = async () => {
    setErrorMessage(""); 

    const isValid = validateForm({ email, password, passwordCheck });
    if (!isValid) return;
    setLoading(true);
    const { success, error } = await register(email, password);

    if (!success) {
      setErrorMessage(error);
      setLoading(false); 
      return;
    }
    
    const { success: successCC, error: errorCC } = await requestConfirmationCode(email, "register");
    if(!successCC){
      setErrorMessage(errorCC);
      setLoading(false); 
      return;
    }
    Toast.show({ type: 'success', text1: t('XTe hemos enviado un email con el codigo')});
    router.push("/verifyConfirmationCode?mode=register");
    setLoading(false); 
  };

  return (
    <>

      <ImageBackground
        source={require("@/assets/images/registerImage.png")} 
        style={{
          width: "100%",
          height: 124, 
          justifyContent: "center", 
          alignItems: "center",
        }}
        resizeMode="cover" 
      >
          
      </ImageBackground >
      
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph 
            title={t("auth.register.title")}
            paragraph={t("auth.register.paragraph")}
            />
            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            <ViewInputs>
              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder={t("auth.register.email")}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                errorMessage={errors.email}
              />
              <PasswordInput
                style={globalStyles.largeBodyMedium}
                placeholder={t("auth.register.password")}
                value={password}
                onChangeText={setPassword}
                errorMessage={errors.password}
              />
              <PasswordInput
                style={globalStyles.largeBodyMedium}
                placeholder={t("auth.register.repeatPassword")}
                value={passwordCheck}
                onChangeText={setPasswordCheck}
                errorMessage={errors.passwordCheck}
              />
              <View
                style={{ paddingHorizontal: 10, width: "100%" }}
              >
                <Text style={[globalStyles.smallBodyRegular, { color: Colors.colors.text.secondary }]}>
                  {t("auth.register.passwordDetails")}
                </Text>
              </View>
            </ViewInputs>
            <DividerWithText />

            <GoogleSignInButton />
            <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={[globalStyles.mediumBodyMedium, { color: Colors.colors.text.secondary}]}>
              {t("auth.register.alreadyAccount")}
              <Text style={globalStyles.link}>{t("auth.register.loginLink")}</Text>
            </Text>
            </TouchableOpacity>
          </ViewForm>
          < PrimaryButton 
            title={t("continue")}
            onPress={handleRegister}
            loading={loading}
            style={[globalStyles.title, { width: "100%"}]} 
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
};

export default RegisterScreen;

