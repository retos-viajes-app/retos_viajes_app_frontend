import Destination from "@/models/destination";
import Trip from "@/models/trip";
import useApi from "@/utils/api";
import { handleApiError } from "@/utils/errorHandler";
import React, { createContext, useState, ReactNode } from "react";

interface ViajeContextType {
  trip: Trip | null;
  setTrip: (trip: Trip | null) => void;
  getDestinations: () => Promise<{ destinations: Destination[]; error?: string }>;
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
}

const TripContext = createContext<ViajeContextType | undefined>(undefined);

export const TripProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [trip, setTrip] = useState<Trip | null>(null);
    const api = useApi();
    
    const getDestinations = async () => {
        try {
          const response = await api.get<Destination[]>('destinations');
          setDestinations(response.data);
          return {destinations: response.data, error: undefined};
        } catch (error) {
          console.error(error);
          return { destinations: [],  error: handleApiError(error, "Error al solicitar los destinos") };
        }
    }
    
    return (
      <TripContext.Provider value={{ trip, setTrip, getDestinations,destinations,setDestinations }}>
        {children}
      </TripContext.Provider>
    );
};

export default TripContext;