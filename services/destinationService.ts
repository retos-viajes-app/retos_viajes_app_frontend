// Servicio para hacer peticiones al backend relacionadas con 'destination',

import  {ChallengesPaginationResponse }from "@/models/challenge";
import {Destination} from "@/models/destination";
import api from "@/utils/api";


interface GetPaginatedDestinationsResponse {
  destinations: Destination[];
  error?: string;
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}
export const getChallengesForDestination = async (
  page = 1,
  perPage = 10,
  destination_id: number
): Promise<ChallengesPaginationResponse> => {
  try {
    const response = await api.get(`/destinations/${destination_id}/challenges`, {
      params: {
        page,
        per_page: perPage,
      },
    });
    console.log("Response from getChallengesForDestination:", response.data);
    return response.data;
  } catch (error) {
    return {
      challenges: [],
      pagination: {
        page,
        per_page: perPage,
        has_more: false,
      },
    };
  }
};

export const getDestinationsPaginated = async (
  page = 1,
  perPage = 10
): Promise<GetPaginatedDestinationsResponse> => {
  try {
    const response = await api.get('/destinations', {
      params: {
        page,
        per_page: perPage,
      },
    });
    console.log("Response from getDestinationsPaginated:", response.data.destinations);
    return {
      destinations: response.data.destinations, 
      error: undefined,
      pagination: {
        page,
        per_page: perPage,
        has_more: response.data.pagination.has_more,
      },
    };
  }catch (error) {
    console.error("Error fetching destinations:", error);
    return {
      destinations: [],
      pagination: {
        page,
        per_page: perPage,
        has_more: false,
      },
      error: "Error fetching destinations",
    };
  }
}

export const getDestinationById = async (destination_id: number) => {
  try {
    const response = await api.get(`/destinations/${destination_id}`);
    console.log("Response from getDestinationById:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    throw error;
  }
}