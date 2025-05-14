// React & React Native Imports
import React, { useState, useContext } from "react";
import { Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

// Component Imports
import globalStyles from "@/styles/global";
import StyledTextInput from "@/components/forms/StyledTextInput";
import PaddingView from "@/components/views/PaddingView";
import DividerWithText from "@/components/Divider";
import { AuthContext } from "@/context/AuthContext";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewForm from "@/components/views/ViewForm";
import ViewInputs from "@/components/views/ViewInputs";
import ViewContentContinue from "@/components/views/ViewForContinueButton";
import PasswordInput from "@/components/forms/PasswordInput"; 

// Hook Imports
import { useFormValidation } from "@/hooks/useFormValidation";

// Utility Imports
import { validations } from "@/utils/validations";
import { LoadingScreen } from "@/components/LoadingScreen";


const LoginForm = () => {
  const router = useRouter();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login } = authContext;

  const { errors, validateForm } = useFormValidation({
    userid: (value) => {
      if (!value.trim()) return "Por favor, ingresa tu usuario o correo.";
      if (value.includes("@")) {
        return validations.email(value);
      } else {
        return validations.username(value);
      }
    },
    password: validations.password,
  });

  const handleLogin = async () => {
    setErrorMessage("");
    setLoading(true);
    const isValid = validateForm({ userid, password });

    if (!isValid) {
      setLoading(false); 
      return;
    }

    const { success, error } = await login(userid, password);


    if (!success) {
      console.log("Error en el login:", error);
      setErrorMessage("Hubo un problema con el login.");
      setLoading(false); 
      return;
    }
    setLoading(false);
    router.replace("/"); 
  };

  return (
    loading ?<LoadingScreen />:
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
        resizeMode="cover" // Cubre todo el espacio sin distorsión
      >
        {/* Puedes agregar un logo aquí si quieres */}
      </ImageBackground>
      {/* Com ponente con padding a los lados */}
      <PaddingView>
        <ViewContentContinue>
          <ViewForm>
            <TitleParagraph
              title="Iniciar sesión"
              paragraph="Continúa tu aventura y conquista nuevos destinos."
            />

            {errorMessage ? <ErrorText text={errorMessage} /> : null}
            <ViewInputs>
              <StyledTextInput
                style={globalStyles.largeBodyMedium}
                placeholder="Usuario o correo"
                autoCapitalize="none"
                value={userid}
                onChangeText={setUserid}
                errorMessage={errors.userid}
              />
              <PasswordInput
                style={globalStyles.largeBodyMedium}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                errorMessage={errors.password}
              />
            </ViewInputs>
            <TouchableOpacity
              onPress={() => router.push("/requestConfirmationCode")}
            >
              <Text style={globalStyles.mediumBodyMedium}>
                ¿Has olvidado tu contraseña? <Text style={globalStyles.link}>Recuperar</Text>
              </Text>
            </TouchableOpacity>
            <DividerWithText />

            <GoogleSignInButton />

            <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={globalStyles.mediumBodyMedium}>
              ¿No tienes una cuenta? <Text style={globalStyles.link}>Regístrate gratis</Text>
            </Text>
            </TouchableOpacity>
          </ViewForm>
          <PrimaryButton
            title="Continuar"
            onPress={handleLogin}
            style={[globalStyles.title, { width: "100%" }]}
          />
        </ViewContentContinue>
      </PaddingView>
    </>
  );
};

export default LoginForm;

