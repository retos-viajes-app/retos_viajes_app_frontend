// Servicio para hacer peticiones al backend relacionadas con 'destination',

import  {ChallengesPaginationResponse }from "@/models/challenge";
import api from "@/utils/api";

export const getChallengesForDestination = async (
  page = 1,
  perPage = 10,
  destination_id: number
): Promise<ChallengesPaginationResponse> => {
  try {
    const response = await api.get(`/destination/${destination_id}/challenges`, {
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
    };
  }
};

export const getDestinationById = async (destination_id: number) => {
  try {
    const response = await api.get(`/destinations/${destination_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    throw error;
  }
}