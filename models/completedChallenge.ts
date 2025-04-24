import  Challenge  from "@/models/challenge"
import User from "@/models/user"


export interface CompletedChallenge {
    id?: number;
    user?: User;
    challenge?: Challenge;
    completed_at?: Date;
    proof_photo_url?: string;
    description?: string;
}

export interface CompletedChallengesPostsResponse {
  completed_challenges: CompletedChallenge[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}
