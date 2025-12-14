import axios from "axios";
import useBackendUrl from "@/hooks/useBackendUrl";
import { getAccessToken } from "./secureTokens";

const useApi = () => {
  const backendUrl = useBackendUrl();
  console.log(backendUrl)
  const apiInstance = axios.create({
    baseURL: backendUrl,
    headers: { "Content-Type": "application/json" },
  });


  apiInstance.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return apiInstance;
};

export default useApi;
