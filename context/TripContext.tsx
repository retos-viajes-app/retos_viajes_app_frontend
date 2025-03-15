import Category from "@/models/category";
import Destination from "@/models/destination";
import Trip from "@/models/trip";
import useApi from "@/utils/api";
import { getCachedCategories, saveCategories } from "@/utils/asyncStorage";
import { handleApiError } from "@/utils/errorHandler";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ViajeContextType {
  trip: Trip | null;
  setTrip: (trip: Trip | null) => void;
  getDestinations: () => Promise<{ destinations: Destination[]; error?: string }>;
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
  categories: Category[];
  getCategories: () => Promise<{ categories: Category[]; error?: string }>;
  selectedCategoriesId: string[];
  setSelectedCategoriesId: (categoriesId: string[]) => void;
}

const TripContext = createContext<ViajeContextType | undefined>(undefined);

export const TripProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [selectedCategoriesId, setSelectedCategoriesId] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
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
    
    const getCategories = async () => {
      try {
        // Intentar cargar desde AsyncStorage
        const cachedCategories = await getCachedCategories();
        if (cachedCategories) {
          setCategories(cachedCategories);
        }
  
        // Hacer petición a la API para actualizar los datos
        const response = await api.get<Category[]>("categories");
        setCategories(response.data);
        await saveCategories(response.data); // Guardar en cache
        return { categories: response.data, error: undefined };
      } catch (error) {
        console.error(error);
        return { categories: [], error: handleApiError(error, "Error al solicitar las categorías") };
      }
    };

    useEffect(() => {
      getCategories();  // Carga las categorías al montar el contexto
    }, []);
    return (
      <TripContext.Provider value={{ trip, setTrip, getDestinations,destinations,setDestinations,categories, getCategories,setSelectedCategoriesId,selectedCategoriesId }}>
        {children}
      </TripContext.Provider>
    );
};

export default TripContext;