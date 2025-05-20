
import User from "@/models/user";
import { SuggestedUsersResponse, UserWithConnectionStatus } from "@/models/userConnections";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";
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
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};
export const cancelConnectionRequest = async (userId: number) => {
  try{
    const response = await api.delete(`/connections/request/cancel/${userId}`);
    return { success: true, error: "" };
  }catch (error){
    return { success: false, error: handleApiError(error) };
  }
  
};

export const getSuggestedUsers = async (
  page = 1,
  perPage = 10
): Promise<SuggestedUsersResponse> => {
  try {
    const response = await api.get("/users/suggested", {
      params: {
        page,
        per_page: perPage
      },
    });
    // Poner conexion status en none para todos los usuarios
    const usersWithStatus = response.data.users.map((user: User) => ({
      ...user,
      connection_status: "none" as UserWithConnectionStatus["connection_status"],
    }));

    return {
      users: usersWithStatus,
      pagination: {
        page: response.data.pagination.page,
        per_page: response.data.pagination.per_page,
        has_more: response.data.pagination.has_more,
      },
    };
  } catch (error) {
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