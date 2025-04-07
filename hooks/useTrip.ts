import { useContext } from "react";
import TripContext from "@/context/TripContext";

export const useTrip = () => {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("tripContext debe usarse dentro de un TripProvider");
  }

  return context;
};