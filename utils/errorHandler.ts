import i18n from "@/i18n";
import axios from "axios";

export const handleApiError = ( error: unknown, defaultMessageKey: string = "errorsBackend.genericError") => {
  if (axios.isAxiosError(error)) {
    const backendMessage = error.response?.data?.detail || error.response?.data?.message;
    if(backendMessage){
      return backendMessage;
    }
  }
  return i18n.t(defaultMessageKey);
};