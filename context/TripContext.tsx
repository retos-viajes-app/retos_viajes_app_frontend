// React & React Native Imports
import React, { createContext, useState, ReactNode, useEffect } from "react";

// Model Imports
import Category from "@/models/category";
import {Destination} from "@/models/destination";
import Trip from "@/models/trip";
import { AcceptedConnectionsInfo } from "@/models/userConnections";

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
  resetContext: () => void;
  acceptedConnections: AcceptedConnectionsInfo[];
  setAcceptedConnections: (connections: AcceptedConnectionsInfo[]) => void;
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
  const [acceptedConnections, setAcceptedConnections] = useState<AcceptedConnectionsInfo[]>([]);

const resetContext = () => {
  setTrip(null);
  setSelectedCategoriesId([]);
  setCategories([]);
  setDestinations([]);
  setCurrentTripPage(0);
};

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
        resetContext,
        acceptedConnections,
        setAcceptedConnections,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;
