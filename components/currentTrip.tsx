import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { useTrip } from "@/hooks/useTrip";

const TripStatus = () => {
  const { trip } = useTrip();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const tripDate = trip?.start_date; // Asegúrate de que trip.date sea una fecha válida

      if (tripDate?.toDateString() === today.toDateString()) {
        setStatus("Hola");
      } else if (tripDate! > today) {
        setStatus("Hola futuro");
      } else {
        setStatus("Viaje pasado");
      }
    };

    checkDate();

    const interval = setInterval(checkDate, 60000); // Revisa cada minuto si cambia el estado

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [trip?.start_date]);

  return (
    <View>
      <Text>{status}</Text>
    </View>
  );
};

export default TripStatus;
