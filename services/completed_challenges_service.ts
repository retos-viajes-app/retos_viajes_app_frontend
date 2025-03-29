import { CompletedChallenge } from "@/models/completedChallenge";
import User from "@/models/user";
import { UserWithConnectionStatus } from "@/models/userConnections";
import useApi from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";

const api = useApi();

export interface CompletedChallengesPostsResponse {
  completed_challenges: CompletedChallenge[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}

export const getCompletedChallengesSuggestions = async (
  page = 1,
  perPage = 10
): Promise<CompletedChallengesPostsResponse> => {
  try {
    const response = await api.get("/completed_challenges/suggested", {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    // Devolver un objeto vacío para evitar errores en el componente
    return {
      completed_challenges: [],
      pagination: {
        page,
        per_page: perPage,
        has_more: false,
      },
    };
  }
};
