import  {CompletedChallengesPostsResponse }from "@/models/completedChallenge";
import api from "@/utils/api";

export const getSuggestedCompletedChallenges = async (
  page = 1,
  perPage = 10
): Promise<CompletedChallengesPostsResponse> => {
  const response = await api.get("/completed_challenges/suggested", {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response.data;
};
