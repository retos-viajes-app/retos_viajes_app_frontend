import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type StepIndicatorProps = {
  steps: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  activeColor = "#76D7C4",
  inactiveColor = "#EAF2EF",
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor: index < currentStep ? activeColor : inactiveColor,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  } as ViewStyle,
  step: {
    flex: 1,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  } as ViewStyle,
});

export default StepIndicator;
