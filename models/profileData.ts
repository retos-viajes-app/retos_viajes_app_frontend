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

export interface UserProfileXP {
  title: string;
  current_level: number
  total_xp: number
  level_current_xp: number
  level_total_xp: number
}

export interface UserProfile{
  id: number;
  username: string; 
  name: string;
  profile_photo_url: string | null;
  bio: string | null;
  location?: string;
  stats: UserProfileStats;
  xp_info: UserProfileXP;
}


export interface UserBadge {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  goal: number;
  progress: number;
  is_completed: boolean;
  completed_at: string | null;
}

export type ProfileListItem = DestinationProfileShort | UserBadge;

export type BadgeFilter = 'all' | 'completed' | 'incomplete';
export type ActiveTab = 'trips' | 'badges';


