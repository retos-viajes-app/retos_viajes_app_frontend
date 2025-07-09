// React & React Native Imports
import React, { useState } from "react";
import { TextInput, TextInputProps, StyleSheet, View, Text } from "react-native";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Styles Imports
import inputStyles from "@/styles/inputs";

// Definimos las propiedades que acepta el componente, extendiendo los props de TextInput.
interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string; // Propiedad para el error (opcional)
  disabled?: boolean; // Propiedad para manejar si el input está deshabilitado (opcional)
}

const StyledTextInput: React.FC<CustomTextInputProps> = ({
  errorMessage,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco
  // Manejar los cambios de foco
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Condicionalmente, aplicamos estilos en función del estado
  const inputStateStyles = [
    inputStyles.default,
    isFocused && !disabled && inputStyles.focused, // Cuando el input tiene foco y no está deshabilitado
    errorMessage && inputStyles.error, // Si hay error, aplicar el estilo de error
    disabled && inputStyles.disabled, // Si está deshabilitado, aplicar el estilo de deshabilitado
  ];

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={inputStateStyles}
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
  container: {
    width: "100%", // Asegura que el contenedor ocupe todo el ancho disponible 
  },
});

export default StyledTextInput;
