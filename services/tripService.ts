import api from "@/utils/api";
import Trip from "@/models/trip";
import { handleApiError } from "@/utils/errorHandler";

interface ApiPostResponse {
    success?: boolean;
    error?: string;
}

interface ApiGetResponse {
    data?: Trip[];
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

export const getPendingTripsShortInfo = async (): Promise<ApiGetResponse> => {
  try {
    const response = await api.get('/trips/pending');
    return { data: response.data, error: undefined };
  } catch (error) {
    console.error('Error fetching pending trips:', error);
    return { data: [], error: handleApiError(error) };
  }
}