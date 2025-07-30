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
  setTrip: (trip: Trip | null) => void;
  selectedCategoriesId: string[];
  setSelectedCategoriesId: (categoriesId: string[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
  currentTripPage: number;
  setCurrentTripPage: (page: number) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<string[]>(
    []
  );

  const [trip, setTrip] = useState<Trip | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentTripPage, setCurrentTripPage] = useState<number>(0);

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        setSelectedCategoriesId,
        selectedCategoriesId,
        categories,
        setCategories,
        destinations,
        setDestinations,
        currentTripPage,
        setCurrentTripPage,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;
