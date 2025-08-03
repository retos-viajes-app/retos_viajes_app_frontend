import api from "@/utils/api";
import Trip from "@/models/trip";
import { handleApiError } from "@/utils/errorHandler";

interface ApiPostResponse {
    success?: boolean;
    error?: string;
}
export const postTrip = async (tripData: Trip): Promise<ApiPostResponse> => {
  try {
    console.log('Posting trip data:', tripData);
    await api.post(`/trips/`, tripData);
    return { success: true, error: undefined };
  } catch (error) {
    return { success: false, error: handleApiError(error) };
  }
};