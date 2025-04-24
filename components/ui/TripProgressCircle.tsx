// React & React Native Imports
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Icon Imports
import Svg, { Circle } from "react-native-svg";


interface TripProgressCircleProps {
  startDate: Date;
  endDate: Date;
}

const TripProgressCircle: React.FC<TripProgressCircleProps> = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
     
      
      const now = new Date().getTime();
      const start = new Date(startDate).getTime(); // Convertir string a Date y obtener timestamp
      const end = new Date(endDate).getTime();

      if (now < start) return setProgress(0);
      if (now > end) return setProgress(100);

      const totalDuration = end - start;
      const elapsedDuration = now - start;
      const percentage = (elapsedDuration / totalDuration) * 100;

      setProgress(Math.min(100, Math.max(0, percentage))); // Asegurar que esté entre 0 y 100
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000 * 60); // Actualiza cada minuto

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <View style={styles.container}>
      <Svg width={64} height={64} viewBox="0 0 120 120">
        <Circle cx="60" cy="60" r={radius} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#007BFF"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)"
        />
      </Svg>
      <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  percentageText: {
    position: "absolute",
    fontSize: 17,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default TripProgressCircle;
