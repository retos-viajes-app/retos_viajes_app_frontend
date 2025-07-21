// React & React Native Imports
import React, { createContext, useState, ReactNode, useEffect } from "react";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";

// Model Imports
import Category from "@/models/category";
import {Destination} from "@/models/destination";
import Trip from "@/models/trip";

// Utility Imports
import api from "@/utils/api";
import {
  getCachedCategories,
  getCachedDestinations,
  saveCategories,
  saveDestinations,
  saveTrip,
} from "@/utils/asyncStorage";
import { handleApiError } from "@/utils/errorHandler";
import { getUser } from "@/utils/secureTokens";

interface TripContextType {
  trip?: Trip | null;
  currentTrip: Trip | undefined;
  setTrip: (trip: Trip | null) => void;
  selectedCategoriesId: string[];
  setSelectedCategoriesId: (categoriesId: string[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<string[]>(
    []
  );

  const [trip, setTrip] = useState<Trip | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const { user } = useAuth();
  //Ahora mismo solo devuelve un viaje, el primero que encuentra
  const getTrips = async () => {
    try {

      const user = await getUser();

      const response = await api.get(`users/${user?.id}/trips`);
      if (response.data.length > 0) {
        setCurrentTrip(response.data[0]); // Guardar el primer viaje en el estado
        await saveTrip(response.data[0]);
      }

      return { trips: response.data, error: undefined };
    } catch (error) {
      return { success: false, error: handleApiError(error), trips: [] };
    }
  };
  useEffect(() => {
    if (user && user.username) {
      getTrips(); // Carga los viajes al montar el contexto
    }
  }, []);

  return (
    <TripContext.Provider
      value={{
        trip,
        currentTrip,
        setTrip,
        setSelectedCategoriesId,
        selectedCategoriesId,
        categories,
        setCategories,
        destinations,
        setDestinations,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;
