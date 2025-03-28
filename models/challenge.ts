import { Category } from "./category"
import { Destination } from "./destination";

export interface Challenge {
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
