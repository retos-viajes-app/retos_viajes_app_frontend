// React & React Native Imports
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

// Component Imports
import { AuthContext } from "@/context/AuthContext";
import DividerWithText from "@/components/Divider";
import StyledTextInput from "@/components/forms/StyledTextInput";
import PaddingView from "@/components/views/PaddingView";
import GoogleSignInButton from "@/components/botones/GoogleSignInButton";
import PrimaryButton from "@/components/botones/Buttons";
import ViewContentContinue from "@/components/views/ViewContentContinue";
import ViewForm from "@/components/views/ViewForm";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewInputs from "@/components/views/ViewInputs";
import { LoadingScreen } from "@/components/LoadingScreen";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";
import { useFormValidation } from "@/hooks/useFormValidation";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { validations } from "@/utils/validations";


const RegisterScreen = () => {
  const {user} = useAuth();
  const router = useRouter();
  const { register, requestConfirmationCode } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, validateForm } = useFormValidation({
    email: validations.email,
    password: validations.password,
    passwordCheck: (value) => validations.passwordCheck(value, password),
  });

  const handleRegister = async () => {
    setErrorMessage(""); 
    setLoading(true);

    const isValid = validateForm({ email, password, passwordCheck });
    if (!isValid) {
      setLoading(false); 
      return;
    }

    const { success, error } = await register(email, password);

    if (!success) {
      setErrorMessage(error || "Hubo un problema con el registro.");
      setLoading(false); 
      return;
    }
    
    const { success: successCC, error: errorCC } = await requestConfirmationCode(email, "register");
    if(!successCC){
      setErrorMessage(error || "Hubo un problema con el registro.");
      setLoading(false); 
      return;
    }
    setLoading(false); 
    router.push(`/verify-confirmation-code?mode=register&&email=${email}`);
    
  };

  return user ? <LoadingScreen /> : (
    loading?<LoadingScreen />:
    <>

      <ImageBackground
        source={require("@/assets/images/registerImage.png")} 
        style={{
          width: "100%",
          height: 124, 
          justifyContent: "center", 
          alignItems: "center",
          marginBottom: 24,
        }}
        resizeMode="cover" 
      >
        
      </ImageBackground >
     
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph 
            title="Regístrate gratis" 
            paragraph="Crea tu cuenta para transformar tus viajes en aventuras inolvidables." />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ViewInputs>
              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder="Correo electrónico"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                errorMessage={errors.email}
              />
              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                errorMessage={errors.password}
              />
              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder="Repite tu contraseña"
                secureTextEntry
                value={passwordCheck}
                onChangeText={setPasswordCheck}
                errorMessage={errors.passwordCheck}
              />
              <View
                style={{ paddingHorizontal: 16, marginTop: 4, width: "100%" }}
              >
                <Text style={globalStyles.smallBodyRegular}>
                  Tu contraseña debe tener al menos 8 caracteres e incluir una
                  mayúscula, una minúscula, un número y un carácter especial.
                  Evita usar datos personales o contraseñas comunes.
                </Text>
              </View>
            </ViewInputs>
            <DividerWithText />

            <GoogleSignInButton />

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={globalStyles.largeBodyMedium}>
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </ViewForm>
          < PrimaryButton title="Continuar" onPress={handleRegister} style={[globalStyles.title, { width: "100%"}]} />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
};

export default RegisterScreen;

