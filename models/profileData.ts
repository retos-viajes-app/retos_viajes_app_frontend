export interface DestinationProfileShort {
  id: number;
  city: string;
  country: string;
  image_url: string | null;
  trip_count: number;
}

export interface SpecificTrip {
  id: number;
  image_url: string;
  start_date: string;
  end_date: string;
  completed_challenges: number;
}

export interface DestinationDetails {
  city: string;
  country: string;
  image_url: string;
  trips: SpecificTrip[];
}

export interface UserProfileTripItem{
  id: number;
  start_date: string;
  end_date: string;
  completed_challenges_count: number;
  last_challenge_image_url: string | null
}

export interface PaginatedUserProfileTripsResponse {
  trips: UserProfileTripItem[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}

export interface PaginatedDestinations {
  destinations: DestinationProfileShort[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}

export interface UserProfileStats {
  countries_visited: number;
  completed_challenges: number;
  contacts: number;
}

export interface UserProfile{
  id: number;
  username: string; 
  name: string;
  profile_photo_url: string | null;
  bio: string | null;
  location?: string;
  stats: UserProfileStats;
}


export interface BadgeGridItem {
  id: string;
  type: 'badge';
  icon: string;
  title: string;
  description: string;
  currentProgress: number;
  totalProgress: number;
}

export type ProfileListItem = DestinationProfileShort | BadgeGridItem;

export type BadgeFilter = 'all' | 'completed' | 'incomplete';
export type ActiveTab = 'trips' | 'badges';


