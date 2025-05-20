import  {CompletedChallengesPostsResponse }from "@/models/completedChallenge";
import api from "@/utils/api";

export const getSuggestedCompletedChallenges = async (
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
