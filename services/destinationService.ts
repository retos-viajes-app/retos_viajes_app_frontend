// Servicio para hacer peticiones al backend relacionadas con 'destination',

import  {ChallengesPaginationResponse }from "@/models/challenge";
import { 
  PaginatedDestinationsResponse,
  DestinationResponse,
  DestinationsResponse
} from "@/models/destination";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";

export const getChallengesForDestination = async (
  destination_id: number
): Promise<ChallengesPaginationResponse> => {
  try {
    const response = await api.get(`/destinations/${destination_id}/challenges`);
    return response.data;
  } catch (error) {
    return {
      challenges: [],
      error: handleApiError(error),
    };
  }
};

export const getChallengesForDestinationPaginated = async (
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
    return response.data;
  } catch (error) {
    return {
      challenges: [],
      pagination: {
        page,
        per_page: perPage,
        has_more: false,
      },
      error: handleApiError(error),
    };
  }
};

export const getDestinationsPaginated = async (
  page = 1,
  perPage = 10
): Promise<PaginatedDestinationsResponse> => {
  try {
    const response = await api.get('/destinations/', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return {
      destinations: response.data.destinations, 
      pagination: {
        page,
        per_page: perPage,
        has_more: response.data.pagination.has_more,
      },
    };
  }catch (error) {
    return {
      destinations: [],
      pagination: {
        page,
        per_page: perPage,
        has_more: false,
      },
      error: handleApiError(error),
    };
  }
}

export const getAllDestinations = async (): Promise<DestinationsResponse> => {
    try {
        const response = await api.get('/destinations/',
          {
            params: {
              is_pagination: false
            }
          }
        );
        return {
          destinations: response.data.destinations,
          error: undefined,
        };
    } catch (error) {
        return {
          destinations: [],
          error: handleApiError(error),
        };
    }
};

export const getDestinationById = async (destination_id: number): Promise<DestinationResponse> => {
  try {
    const response = await api.get(`/destinations/${destination_id}`);
    return { destination: response.data };
  } catch (error) {
    return {
      destination: undefined,
      error: handleApiError(error),
    };
  }
}