import api from "@/utils/api";
import {AcceptedConnectionsInfo} from "@/models/userConnections";
import { handleApiError } from "@/utils/errorHandler";

interface ApiGetResponse {
  acceptedConnections?: AcceptedConnectionsInfo[];
  error?: string;
}
export const getAcceptedConnectionsInfo = async (userId: number): Promise<ApiGetResponse> => {
  try {
    const response = await api.get(`/users/${userId}/accepted_connections_info`);
    return { acceptedConnections: response.data };
  } catch (error) {
    return { acceptedConnections: [], error: handleApiError("errorsBackend.genericError") };
  }
};