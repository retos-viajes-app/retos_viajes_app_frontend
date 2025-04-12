// React & React Native Imports
import React, { useState } from "react";
import { TextInput, TextInputProps, StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Utility Imports
import { Colors } from "@/constants/ColoresPropios";

// Icon Imports
import { Eye, EyeOff } from "lucide-react-native";


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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputStyles = [
    styles.input,
    errorMessage && styles.error,
    disabled && styles.disabled,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={inputStyles}
          editable={!disabled}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeOff size={24} color={Colors.colors.gray[400]} />
          ) : (
            <Eye size={24} color={Colors.colors.gray[400]} />
          )}
        </TouchableOpacity>
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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
  input: {
    fontFamily: "InterRegular",
    padding: 10,
    paddingRight: 40,
    borderColor: Colors.colors.gray[200],
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.colors.gray[100],
    color: Colors.colors.gray[400],
    width: "100%",
    minHeight: 48,
  },
  error: {
    borderColor: Colors.colors.error[100],
  },
  disabled: {
    backgroundColor: Colors.colors.gray[200],
    borderColor: Colors.colors.gray[300],
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: Colors.colors.error[100],
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
});

export default PasswordInput;

