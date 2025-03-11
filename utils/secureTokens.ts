import * as SecureStore from "expo-secure-store";
import User from "../models/user";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const saveAccessToken = async (accessToken: string) => {
  if (isWeb) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    await SecureStore.setItemAsync("accessToken", accessToken);
  }
};

export const saveRefreshToken = async (refreshToken: string) => {
  if (isWeb) {
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  }
};

export const saveEmail = async (email: string) => {
  if (isWeb) {
    localStorage.setItem("email", email);
  } else {
    await SecureStore.setItemAsync("email", email);
  }
};

export const saveUser = async (user: User | null) => {
  if (isWeb) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    await SecureStore.setItemAsync("user", JSON.stringify(user));
  }
};

// Obtener valores almacenados
export const getAccessToken = async () => {
  if (isWeb) {
    return localStorage.getItem("accessToken");
  } else {
    return await SecureStore.getItemAsync("accessToken");
  }
};

export const getRefreshToken = async () => {
  if (isWeb) {
    return localStorage.getItem("refreshToken");
  } else {
    return await SecureStore.getItemAsync("refreshToken");
  }
};

export const getEmail = async () => {
  if (isWeb) {
    return localStorage.getItem("email");
  } else {
    return await SecureStore.getItemAsync("email");
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    let userString: string | null = null;

    if (isWeb) {
      userString = localStorage.getItem("user");
    } else {
      userString = await SecureStore.getItemAsync("user");
    }

    return userString ? JSON.parse(userString) as User : null;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
};
