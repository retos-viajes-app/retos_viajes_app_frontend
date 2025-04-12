// React & React Native Imports
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Component Imports
import ViewInputs from "@/components/views/ViewInputs";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/ColoresPropios";

// Icon Imports
import { Ionicons } from "@expo/vector-icons";


interface RadioButtonProps {
  options: { label: string; value: string }[];
  selectedValues: string[]; // Ahora es un array
  onSelect: (value: string) => void;
}

const RadioButtonList: React.FC<RadioButtonProps> = ({
  options,
  selectedValues,
  onSelect,
}) => {
  return (
    <ViewInputs>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.radioContainer,
              isSelected && styles.selected,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <View style={[styles.radioCircle, isSelected && styles.checkedCircle]}>
              {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={[globalStyles.largeBodyMedium, isSelected && globalStyles.largeBodySemiBold]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ViewInputs>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: Colors.colors.gray[200],
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.colors.gray[100],
    paddingHorizontal: 10,
  },
  selected: {
    borderColor: Colors.colors.gray[400],
    backgroundColor: Colors.colors.primary[300],
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedCircle: {
    backgroundColor: Colors.colors.gray[500],
    width: 24,
    height: 24,
    borderRadius: 100,
    borderColor: Colors.colors.gray[500],
  },
});

export default RadioButtonList;
