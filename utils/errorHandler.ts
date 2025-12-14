import axios from "axios";

export const handleApiError = (error: unknown, defaultMessage: string = "Error inesperado") => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.detail ||
      error.response?.data?.message ||
      defaultMessage
    );
  }
  return defaultMessage;
};
