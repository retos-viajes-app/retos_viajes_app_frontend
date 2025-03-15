import Category from "@/models/category";
import Destination from "@/models/destination";
import Trip from "@/models/trip";
import useApi from "@/utils/api";
import { getCachedCategories, saveCategories } from "@/utils/asyncStorage";
import { handleApiError } from "@/utils/errorHandler";
import { getUser } from "@/utils/secureTokens";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface ViajeContextType {
  trip: Trip | null;
  currentTrip: Trip | null;
  setTrip: (trip: Trip | null) => void;
  getDestinations: () => Promise<{ destinations: Destination[]; error?: string }>;
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
  categories: Category[];
  getCategories: () => Promise<{ categories: Category[]; error?: string }>;
  selectedCategoriesId: string[];
  setSelectedCategoriesId: (categoriesId: string[]) => void;
  postTrip: (trip: Trip) => Promise<{ success: boolean; error?: string }>;
}

const TripContext = createContext<ViajeContextType | undefined>(undefined);

export const TripProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [selectedCategoriesId, setSelectedCategoriesId] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
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


    const postTrip = async (trip: Trip) => {
        try {
          //Post trip, asociar con el usuario actual
          //Asociar a selectedCategoriesId
          const user = await getUser();
          trip.user_id = user?.id;
          const response = await api.post<{trip_id:string}>("trips", trip);
          trip.id = parseInt(response.data.trip_id);
          selectedCategoriesId.forEach(async (categoryId) => {
            await postTripCategory(trip.id!, parseInt(categoryId));
          });
          setCurrentTrip(trip);
          return {success: true};
        } catch (error) {
          return {
            success: false,
            error: handleApiError( error, "Error inesperado al completar el perfil."),
          };
        } 
      };
      const postTripCategory = async (tripId: number, categoryId: number) => {
        try {
          await api.post("trips-categories", { trip_id: tripId, category_id: categoryId });
        } catch (error) {
          console.error(error);
        }
      }
      const getTrips = async () => {
        try {
          const user = await getUser();
      
          const response = await api.get<Trip[]>(`trips/${user?.id}`);
          setCurrentTrip(response.data.length > 0 ? response.data[0] : null); // Guardar el primer viaje
          return { trips: response.data, error: undefined };
        } catch (error) {
          console.error(error);
          return { trips: [], error: handleApiError(error, "Error al obtener los viajes") };
        }
      };
    useEffect(() => {
      getCategories();  // Carga las categorías al montar el contexto
      getTrips(); // Carga los viajes al montar el contexto
    }, []);


    
    return (
      <TripContext.Provider value={{ trip, currentTrip, setTrip, getDestinations,destinations,setDestinations,categories, getCategories,setSelectedCategoriesId,selectedCategoriesId,postTrip }}>
        {children}
      </TripContext.Provider>
    );
};

export default TripContext;