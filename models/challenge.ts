import Category from "@/models/category"
import Destination from "@/models/destination";

export default interface Challenge {
  id?: number;
  category?: Category;
  destination?: Destination;
  title?: string;
  short_description?: string;
  long_description?: string;
  image_url?: string;
  points?: number;
  difficulty?: number;
  active?: boolean;
}

export interface ChallengesPaginationResponse {
  challenges: Challenge[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}
