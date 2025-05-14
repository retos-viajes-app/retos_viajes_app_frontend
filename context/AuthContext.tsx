// React & React Native Imports
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Expo & External Library Imports
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { decode as decodeBase64 } from "base-64";

// Model Imports
import User from "@/models/user";

// Utility Imports
import {
  saveAccessToken,
  saveRefreshToken,
  saveUser,
  getUser,
  saveEmail,
  getEmail,
  getAccessToken,
} from "@/utils/secureTokens";
import useApi from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";

//Ahora mismo está usando backend cogido de constantes
WebBrowser.maybeCompleteAuthSession();

const webClientId =
  "441443892104-tjh14gkg69fa8ngea15cpau54mrdhbrj.apps.googleusercontent.com";
const iosClientId =
  "441443892104-fu2htqbjkkf7gf84mm2f9em24.apps.googleusercontent.com";
const androidClientId =
  "441443892104-q9e2hmjhrio3ukp1ed0m4edle1bhddut.apps.googleusercontent.com";

const redirectUri = AuthSession.makeRedirectUri({ scheme: "myapp" });

interface AuthContextType {
  user: User | null;
  promptAsync: () => void;
  logout: () => void;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>; // Añade login propio
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  finishRegister: (
    username: string,
    bio: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  requestConfirmationCode: (
    email: string,
    mode: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyConfirmationCode: (
    code: string,
    isRegistration: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    responseType: "id_token",
    scopes: ["profile", "email"],
    extraParams: { access_type: "offline", prompt: "consent" },
    redirectUri,
  });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getUser();
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleToken(response.params.id_token);
    }
  }, [response]);

  const handleGoogleToken = async (idToken: string | undefined) => {
    if (!idToken) {
      console.error("No se recibió ID token");
      return;
    }

    try {
      const { data: authResponse } = await api.post(
        "/verify-google-token",
        {},
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      await Promise.all([
        saveAccessToken(authResponse.tokens.access_token),
        saveRefreshToken(authResponse.tokens.refresh_token),
        saveUser(authResponse.user),
      ]);
       setUser(authResponse.user);
       return { success: true };
    } catch (error) {
      console.error(
        "Error en la verificación del token:",
        handleApiError(error, "No se pudo verificar el token")
      );
    }
  };


  const login = async (userid: string, password: string) => {
    try {
      // Petición de login
      const { data: authResponse } = await api.post("/login", {
        "userid":userid,
        "password": password,
      });

     await Promise.all([
       saveAccessToken(authResponse.tokens.access_token),
       saveRefreshToken(authResponse.tokens.refresh_token),
       saveUser(authResponse.user),
     ]);

      setUser(authResponse.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, "Hubo un problema con el login."),
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // Petición de registro
      const { data: authResponse } = await api.post("/register", {
        email,
        password,
      });

      await Promise.all([
        saveAccessToken(authResponse.tokens.access_token),
        saveRefreshToken(authResponse.tokens.refresh_token),
        saveUser(authResponse.user),
      ]);

      setUser(authResponse.user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: handleApiError(error, "Hubo un problema con el registro."),
      };
    }
  };

  const logout = async () => {
    await Promise.all([
      saveUser(null),
      saveAccessToken(""),
      saveRefreshToken(""),
    ]);
    setUser(null);
  };

  const finishRegister = async (
    username: string,
    bio: string,
    name: string
  ) => {
    try {
      const updatedUserInfo = { ...user, username, bio, name };

      const updatedUser = await api.put(`/users/${user!.id}`, updatedUserInfo, {});
      await saveUser(updatedUserInfo);
      setUser(updatedUserInfo);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: handleApiError(
          error,
          "Error inesperado al completar el perfil."
        ),
      };
    }
  };

  //Confirmation codes
  const requestConfirmationCode = async (email: string, mode: string) => {
    try {
      if(mode == "register"){
        email = user?.email! ;
      }
      const response = await api.post(`/confirmation_codes/request?type=${mode}`, { email });
      if(mode == "passwordReset"){
        setResetEmail(email);
      }
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: handleApiError(error, "Error al solicitar el código"),
      };
    }
  };

  const verifyConfirmationCode = async (
    code: string,
    isRegistration = false
  ) => {
    try {
      const response = await api.post("/confirmation_codes/verify", {
        email: isRegistration ? user?.email : resetEmail,
        code,
        is_registration: isRegistration,
      });
      if (isRegistration) {
          const updatedUserInfo: User = {
            ...user,
            is_verified: true,
          };
          await saveUser(updatedUserInfo); // Guardar en el storage
          setUser(updatedUserInfo);
      }else {
          setCode(code);
      }
      
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: handleApiError(error, "Error al verificar el código"),
      };
    }
  };

  const resetPassword = async ( new_password: string) => {
    try {
      console.log("resetEmail", resetEmail);
      console.log("code", code);
      const response = await api.post(`/users/reset-password/${resetEmail}`, {
        new_password,
        code,
      });
      
      setCode(null);
      setResetEmail(null);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: handleApiError(error, "Error al reestablecer la contraseña"),
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        promptAsync,
        logout,
        login,
        register,
        finishRegister,
        requestConfirmationCode,
        verifyConfirmationCode,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
