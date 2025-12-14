export type NotificationType = 'like' | 'badge' | 'connection_request_accepted';

export interface NotificationActor {
  id: number;
  username: string;
  profile_photo_url?: string;
}

export interface NotificationChallengeContext {
  id: number;
  challenge_title: string;
}

export interface NotificationItem {
  id: number;
  type: NotificationType;
  actor: NotificationActor;
  completed_challenge?: NotificationChallengeContext;
  badge_name?: string;
  created_at: string; 
  is_read: boolean;
}

export interface PaginationInfo {
    page: number;
    per_page: number;
    has_more: boolean;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  pagination: PaginationInfo;
}