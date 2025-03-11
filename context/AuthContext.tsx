import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { decode as decodeBase64 } from "base-64";
import User from "@/models/user";
import { 
  saveAccessToken, 
  saveRefreshToken, 
  saveUser, 
  getUser, 
  saveEmail, 
  getEmail,
  getAccessToken
} from "@/utils/secureTokens";
import useApi from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";


//Ahora mismo está usando backend cogido de constantes
WebBrowser.maybeCompleteAuthSession();

const webClientId = "441443892104-tjh14gkg69fa8ngea15cpau54mrdhbrj.apps.googleusercontent.com";
const iosClientId = "441443892104-fu2htqbjkkf7gf84mm2f9em24.apps.googleusercontent.com";
const androidClientId = "441443892104-q9e2hmjhrio3ukp1ed0m4edle1bhddut.apps.googleusercontent.com";

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
    user: User,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  requestConfirmationCode: (
    email: string,
    mode: string
  ) => Promise<{ success: boolean; error?: string }>;
  verifyConfirmationCode: (
    email: string,
    code: string,
    isRegistration: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (
    user: User,
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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
      handleToken(response.params.id_token);
    }
  }, [response]);

  const handleToken = async (idToken: string | undefined) => {
    if (!idToken) {
      console.error("No se recibió ID token");
      return;
    }

    try {
      const response = await api.post(
        "/verify-google-token",
        {},
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      const { access_token, refresh_token } = response.data;

      if (access_token && refresh_token) {
        await saveAccessToken(access_token);
        await saveRefreshToken(refresh_token);

        const email = decodeEmailJwt(idToken);
        if (email) await saveEmail(email);

        await fetchUserDetails(access_token);
      } else {
        console.error("Tokens no válidos en la respuesta");
      }
    }catch (error) {
      console.error("Error en la verificación del token:", handleApiError(error, "No se pudo verificar el token"));
    }
  };

  const fetchUserDetails = async (accessToken: string) => {
    try {
      const email = await getEmail();
      if (!email) return console.error("No se encontró el email");

      const response = await api.get<User>(`/users/${email}`, {
      });

      const userData = response.data;
      userData.is_verified = true;
      userData.verification_type = "register";
      await saveUser(userData);
      setUser(userData);
    } catch (error) {
      console.error(
        "Error al obtener los detalles del usuario:",
        handleApiError(error, "No se pudo obtener el usuario")
      );
    }
  };

  const login = async (userid: string, password: string) => {
    try {
      // Petición de login
      const { data: userTokens } = await api.post("/login", {
        userid,
        password,
      });

      await saveAccessToken(userTokens.access_token);
      await saveRefreshToken(userTokens.refresh_token);

      // Obtener datos del usuario tras login exitoso
      const { data: userData } = await api.get<User>(`/users/${userid}`, {
      });

      await saveUser(userData);
      setUser(userData);

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
      const { data: userTokens } = await api.post("/register", {
        email,
        password,
      });

      await saveAccessToken(userTokens.access_token);
      await saveRefreshToken(userTokens.refresh_token);

      // Obtener datos del usuario tras el registro
      const { data: userData } = await api.get<User>(`/users/${email}`, {
      });

      await saveUser(userData);
      setUser(userData);

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
    user: User,
    name: string
  ) => {
    try {
      const accessToken = await getAccessToken();

      const updatedUserInfo = { ...user, username, bio, name };

      await api.put(`/users/${user.email}`, updatedUserInfo, {
      });

      setUser(updatedUserInfo);
      await saveUser(updatedUserInfo);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: handleApiError( error, "Error inesperado al completar el perfil."),
      };
    }
  };

  //Confirmation codes
  const requestConfirmationCode = async (email: string, mode: string) => {
    try {
      const response = await api.post("/confirmation-code/request", { email });
      if(response.data.success){
        const userData : User = {
          email: email,
          username: "",
          profile_photo_url: null,
          bio: null,
          total_points: 0,
          is_verified: false,
          verification_type: mode ==="passwordReset" ? "passwordReset" : "register",
          sub: null
        }; // Save only the email    
        await saveUser(userData);
        setUser(userData);
      }
      return { success: response.data.success,};
    } catch (error: any) {
      return{
        success: false,
        error: handleApiError(error, "Error al solicitar el código"),
      }
    }
  };

  const verifyConfirmationCode = async (email: string, code: string, isRegistration = false) => {
    try {
      const response = await api.post("/confirmation-code/verify", { email, code, is_registration: isRegistration });
      console.log("AUth:" + isRegistration);
      if(response.data.success){
        if(user){
            const updatedUserInfo : User = {
              ...user,
              is_verified: true,
              verification_type: isRegistration ? "register" : "passwordReset",
            } ;

            await saveUser(updatedUserInfo); // Guardar en el storage
            setUser(updatedUserInfo);
        }
      }
      return { success: response.data.success, };
    } catch (error: any) {
      return{
        success: false,
        error: handleApiError(error, "Error al verificar el código"),
      }
    }
  }

  const resetPassword = async (user: User, new_password: string) => {
    try {
      const response = await api.post(`/users/reset-password/${user.email}`, {new_password });
      if(response.data.success){
        await Promise.all([
          saveUser(null),
          saveAccessToken(""),
          saveRefreshToken(""),
        ]);
        setUser(null);
      }
      return { success: response.data.success,};
    } catch (error: any) {
      return{
        success: false,
        error: handleApiError(error, "Error al solicitar el código"),
      }
    }
  }
  const decodeEmailJwt = (token: string): string | null => {
    try {
      const base64Url = token.split(".")[1];
      const jsonPayload = JSON.parse(decodeBase64(base64Url.replace(/-/g, "+").replace(/_/g, "/")));
      return jsonPayload.email || null;
    } catch (error) {
      console.error("Error al decodificar el id_token:", error);
      return null;
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
