export  interface Destination {
  id?: number;
  city?: string;
  country?: string;
  description?: string;
  image_url?: string;
  active?: boolean;
  currency?: string;
  language?: string; 
  visited?: boolean;
}


export interface PaginatedDestinationsResponse {
  destinations: Destination[];
  error?: string;
  pagination: {
    page: number;
    per_page: number;
    has_more: boolean;
  };
}

export interface DestinationsResponse {
  destinations: Destination[];
  error?: string;
}

export interface DestinationResponse{
  destination?: Destination;
  error?: string;
}