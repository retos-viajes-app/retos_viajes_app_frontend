import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/ColoresPropios";
import ViewInputs from "../views/ViewInputs";
import globalStyles from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
interface RadioButtonProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const StyledRadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <ViewInputs>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioContainer,
            selectedValue === option.value && styles.selected,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <View style={[styles.radioCircle, selectedValue === option.value && styles.checkedCircle]} >
             <Ionicons name="checkmark" size={16} color="white" />
          </View>
          <Text style={[globalStyles.largeBodyMedium, selectedValue === option.value && globalStyles.largeBodySemiBold]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
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
    backgroundColor: Colors.colors.neutral[100],
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10, //Cual es
  },
  checkedCircle: {
    backgroundColor: Colors.colors.gray[500],
    width: 24,
    height: 24,
    borderRadius: 100,
    borderColor: Colors.colors.gray[500],
  }
});

export default StyledRadioButton;
