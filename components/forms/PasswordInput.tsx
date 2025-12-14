// React & React Native Imports
import React, { useState } from "react";
import { TextInput, TextInputProps, StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Icon Imports
//import { Eye, EyeOff } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";

//Styles Imports
import inputStyles from "@/styles/inputs";


interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string;
  disabled?: boolean;
}

const PasswordInput: React.FC<CustomTextInputProps> = ({
  errorMessage,
  disabled = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco
  // Manejar los cambios de foco
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputStateStyles = [
    inputStyles.default,
    isFocused && !disabled && inputStyles.focused,
    errorMessage && inputStyles.error,
    disabled && inputStyles.disabled,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={inputStateStyles}
          editable={!disabled}
          secureTextEntry={!isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={Colors.colors.text.primary}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <Feather name="eye" size={24} color={Colors.colors.text.primary} />
          ) : (
            <Feather name="eye-off" size={24} color={Colors.colors.text.primary} />
          )}
        </TouchableOpacity>
      </View>
      {errorMessage && <Text style={inputStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default PasswordInput;

