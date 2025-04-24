// React & React Native Imports
import { useMemo } from "react";
import { Platform } from "react-native";

// Expo & External Library Imports
import Constants from "expo-constants";

const useBackendUrl = () => {
  const { API_URL_WEB, API_URL_ANDROID } = Constants.expoConfig?.extra || {};

  const backendUrl = useMemo(() => {
    return Platform.OS === "android" ? API_URL_ANDROID : API_URL_WEB;
  }, []);

  return backendUrl;
};

export default useBackendUrl;
