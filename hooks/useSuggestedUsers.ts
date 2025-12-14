import { useContext } from "react";

// Context Imports
import { SuggestedUsersContext } from "@/context/SuggestedUsersContext";

export const useSuggestedUsers = () => {
  const context = useContext(SuggestedUsersContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
};
