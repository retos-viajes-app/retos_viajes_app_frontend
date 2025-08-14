import User from "@/models/user";

export interface UserWithConnectionStatus extends User {
  connection_status: "none" | "pending" | "accepted";
}

export interface SuggestedUsersResponse {
  users: UserWithConnectionStatus[];
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}

export interface AcceptedConnectionsInfo{
  id: number;
  username: string;
  name: string;
  profile_photo_url: string;
}
