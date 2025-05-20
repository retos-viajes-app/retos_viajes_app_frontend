// React & React Native Imports
import React, { createContext, useState, ReactNode, useEffect } from "react";

// Hook Imports
import { useAuth } from "@/hooks/useAuth";

// Model Imports
import Category from "@/models/category";
import Destination from "@/models/destination";
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
import { ApiResponse } from "./AuthContext";

interface TripContextType {
  trip?: Trip | null;
  currentTrip: Trip | undefined;
  setTrip: (trip: Trip | null) => void;
  destinations: Destination[];
  categories: Category[];
  selectedCategoriesId: string[];
  setSelectedCategoriesId: (categoriesId: string[]) => void;
  postTrip: (trip: Trip) => Promise<ApiResponse>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<string[]>(
    []
  );
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth();
  const getDestinations = async () => {
    try {
      //cachear en asyncStorage
      const cachedDestinations = await getCachedDestinations();
      if (cachedDestinations) {
        setDestinations(cachedDestinations);
      }
      const response = await api.get("/destinations/");
      setDestinations(response.data);
      await saveDestinations(response.data); // Guardar en cache
      return { destinations: response.data, error: undefined };
    } catch (error) {
      return { success: false, error: handleApiError(error), destinations: [] };
    }
  };

  const getCategories = async () => {
    try {
      // Intentar cargar desde AsyncStorage
      const cachedCategories = await getCachedCategories();
      if (cachedCategories) {
        setCategories(cachedCategories);
      }

      // Hacer petición a la API para actualizar los datos
      const response = await api.get("/categories/");
      setCategories(response.data);
      await saveCategories(response.data); // Guardar en cache
      return { categories: response.data, error: undefined };
    } catch (error) {
      return { success: false, error: handleApiError(error), categories: [] };
    }
  };

  const postTrip = async (trip: Trip) => {
    try {
      //Post trip, asociar con el usuario actual
      //Asociar a selectedCategoriesId
      const user = await getUser();
      trip.user_id = user?.id;
      const response = await api.post("/trips/", trip);
      trip.id = response.data.id;
      selectedCategoriesId.forEach(async (categoryId) => {
        await postTripCategory(trip.id!, parseInt(categoryId));
      });
      setCurrentTrip(trip);
      return { success: true, error: ""};
    } catch (error) {
      return { success: false, error: handleApiError(error)};
    }
  };
  const postTripCategory = async (tripId: number, categoryId: number) => {
    try {
      await api.post("/trips-categories/", {
        trip_id: tripId,
        category_id: categoryId,
      });
    } catch (error) {
      console.error(error);
    }
  };
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
      getDestinations(); // Carga los destinos al montar el contexto
      getCategories(); // Carga las categorías al montar el contexto
      getTrips(); // Carga los viajes al montar el contexto
    }
  }, []);

  return (
    <TripContext.Provider
      value={{
        trip,
        currentTrip,
        setTrip,
        destinations,
        categories,
        setSelectedCategoriesId,
        selectedCategoriesId,
        postTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;
