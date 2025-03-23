import React, { useState, useContext } from "react";
import { View, Text,  TouchableOpacity, ScrollView,ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "@/styles/global";
import StyledTextInputLabelText from "@/components/forms/Inputs";
import PaddingView from "@/components/views/PaddingView";
import DividerWithText from "@/components/Divider";
import { AuthContext } from '@/context/AuthContext';
import PrimaryButton from "@/components/botones/Buttons";
import GoogleSignInButton from "../botones/GoogleSignInButton";

import ErrorText from "@/components/text/ErrorText";
import TitleParagraph from "@/components/text/TitleParagraph";
import ViewForm from "../views/ViewForm";
import ViewInputs from "../views/ViewInputs";
import ViewContentContinue from "../views/ViewContentContinue";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validations } from "@/utils/validations";
import { LoadingScreen } from "../LoadingScreen";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  const router = useRouter();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [useridFocused, setuseridFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
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
      setErrorMessage(error || "Hubo un problema con el login.");
      setLoading(false); 
      return;
    }
    setLoading(false);
    router.replace("/"); // Redirige después de iniciar sesión
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
              <StyledTextInputLabelText
                style={globalStyles.largeBodyMedium}
                placeholder="Usuario o correo"
                autoCapitalize="none"
                value={userid}
                onChangeText={setUserid}
                onFocus={() => setuseridFocused(true)}
                onBlur={() => setuseridFocused(false)}
                errorMessage={errors.userid}
              />
              <PasswordInput
                style={globalStyles.largeBodyMedium}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                errorMessage={errors.password}
              />
            </ViewInputs>
            <TouchableOpacity
              onPress={() => router.push("/request-password-reset")}
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

