
import User from "@/models/user";
import { UserWithConnectionStatus } from "@/models/userConnections";
import useApi from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";
const api = useApi();
export interface UserSuggestionsResponse {
  users: User[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}
export const sendConnectionRequest = async (userId : number) => {
  try {
    const response = await api.post(`/connections/request/${userId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error, "Error al enviar la solicitud"),
    };
  }
};
export const cancelConnectionRequest = async (userId: number) => {
  try{
    const response = await api.delete(`/connections/request/cancel/${userId}`);
    return response.data;
  }catch (error){
    return {
      success: false,
      error: handleApiError(error, "Error al cancelar la solicitud"),
    };
  }
  
};

export const getUserSuggestions = async (
  page = 1,
  perPage = 10
): Promise<UserSuggestionsResponse> => {
  try {
    const response = await api.get("/connections/suggested", {
      params: {
        page,
        per_page: perPage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user suggestions:", error);
    // Devolver un objeto vacío para evitar errores en el componente
    return {
      users: [],
      pagination: {
        page,
        per_page: perPage,
        has_more: false,
      },
    };
  }
};
// Este método ahora toma los dos IDs de usuario que componen la conexión
export const acceptConnection = async (userId1 : number, userId2: number) => {
  try {
    const response = await api.post(`/connections/accept`, {
      user_id_1: userId1,
      user_id_2: userId2,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: handleApiError(error, "Error al aceptar la solicitud."),
    };
  }
};

// Este método también toma los dos IDs de usuario
export const rejectConnection = async (userId1 : number, userId2 : number) => {
  try {
    const response = await api.post(`/connections/reject`, {
      user_id_1: userId1,
      user_id_2: userId2,
    });
    return {
      success: response.data.success,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: handleApiError(error, "Error al rechazar la solicitud."),
    };
  }
};