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

export const likeCompletedChallenge = async (completedChallengeId: number): Promise<void> => {
  await api.post(`/completed_challenges/${completedChallengeId}/like`);
};

export const unlikeCompletedChallenge = async (completedChallengeId: number): Promise<void> => {
  await api.delete(`/completed_challenges/${completedChallengeId}/like`);
};

export const getCompletedChallengesForTrip = async (tripId: number, page: number = 1, per_page: number = 10): Promise<CompletedChallengesPostsResponse> => {
  const response = await api.get(`/trips/${tripId}/completed-challenges`, {
    params: { page, per_page },
  });
  return response.data;
};


