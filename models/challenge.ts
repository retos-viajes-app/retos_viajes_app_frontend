import Category from "@/models/category"
import {Destination} from "@/models/destination";
import {Details} from "@/models/details";
export default interface Challenge {
  id?: number;
  longitude?: number;
  latitude?: number;
  distance_from_challenge_to_city_center?: number;
  category?: Category;
  destination?: Destination;
  title?: string;
  short_description?: string;
  long_description?: string;
  image_url?: string;
  points?: number;
  difficulty?: number;
  active?: boolean;
  details?: Details[];
}

export interface ChallengesPaginationResponse {
  challenges: Challenge[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}
