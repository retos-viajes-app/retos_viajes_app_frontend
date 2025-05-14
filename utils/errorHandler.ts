import axios from "axios";

export const handleApiError = (error: unknown, defaultMessage: string = "Error inesperado"): string => {
  if (axios.isAxiosError(error)) {
    return String(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      defaultMessage
    );
  }
  return defaultMessage;
};
