export interface TripData {
  type: 'trip';
  id: string;
  city: string;
  tripCount: number;
  image: string;
}

export interface BadgeData {
  type: 'badge';
  id: string;
  icon: string;
  title: string;
  description: string;
  currentProgress: number;
  totalProgress: number;
}

export type TripOrBadgeItem = TripData | BadgeData;

export type BadgeFilter = 'all' | 'completed' | 'incomplete';
export type ActiveTab = 'trips' | 'badges';