// React & React Native Imports
import React, { useState } from "react";
import { TextInput, TextInputProps, StyleSheet, View, Text } from "react-native";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Styles Imports
import inputStyles from "@/styles/inputs";
import { Container } from "lucide-react-native";

// Definimos las propiedades que acepta el componente, extendiendo los props de TextInput.
interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string; // Propiedad para el error (opcional)
  disabled?: boolean; // Propiedad para manejar si el input está deshabilitado (opcional)
  icon: React.ReactElement; // Propiedad para un icono opcional
}

const IconTextInput: React.FC<CustomTextInputProps> = ({
  errorMessage,
  disabled = false,
  icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco
  // Manejar los cambios de foco
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Condicionalmente, aplicamos estilos en función del estado
  const inputStateStyles = [
    inputStyles.defaultIcon,
    isFocused && !disabled && inputStyles.focused, // Cuando el input tiene foco y no está deshabilitado
    errorMessage && inputStyles.error, // Si hay error, aplicar el estilo de error
    disabled && inputStyles.disabled, // Si está deshabilitado, aplicar el estilo de deshabilitado
  ];

  return (
    <View style={inputStateStyles}>
      <View style={styles.iconContainer}>{icon}</View>
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled} // Hace que el input sea no editable si está deshabilitado
        placeholderTextColor={Colors.colors.text.primary} // Color del texto del placeholder
      />
      {errorMessage && <Text style={inputStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default IconTextInput;