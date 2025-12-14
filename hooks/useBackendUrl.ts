import { useMemo } from 'react';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const useBackendUrl = () => {
  const { API_URL_WEB, API_URL_ANDROID } = Constants.expoConfig?.extra || {};

  const backendUrl = useMemo(() => {
    return Platform.OS === 'android' ? API_URL_ANDROID : API_URL_WEB;
  }, []);

  return backendUrl;
};

export default useBackendUrl;
