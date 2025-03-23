import User from "@/models/user";

export interface UserWithConnectionStatus extends User {
  connection_status?: "none" | "pending" | "accepted";
}

// También podemos definir una interfaz para la respuesta de la API
export interface UserSuggestionsResponse {
  users: UserWithConnectionStatus[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  };
}
