import Trip from "@/models/trip";
import React, { createContext, useState,  ReactNode } from "react";
interface ViajeContextType {
  trip: Trip | null;
  setTrip: (trip: Trip | null) => void;
}

const ViajeContext = createContext<ViajeContextType | undefined>(undefined);

export const ViajeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [trip, setTrip] = useState<Trip | null>(null);
  
    return (
      <ViajeContext.Provider value={{ trip, setTrip }}>
        {children}
      </ViajeContext.Provider>
    );
  };