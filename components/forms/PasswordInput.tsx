import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native"; // Importamos los íconos de lucide-react-native
import { Colors } from "@/constants/ColoresPropios";

// Definimos las propiedades que acepta el componente, extendiendo los props de TextInput.
interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string; // Propiedad para el error (opcional)
  disabled?: boolean; // Propiedad para manejar si el input está deshabilitado (opcional)
}

const PasswordInput: React.FC<CustomTextInputProps> = ({
  errorMessage,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [inputValue, setInputValue] = useState(""); // Estado para manejar el valor del input

  // Manejar los cambios de foco
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Condicionalmente, aplicamos estilos en función del estado
  const inputStyles = [
    styles.input,
    isFocused && !disabled && styles.focused, // Cuando el input tiene foco y no está deshabilitado
    errorMessage && styles.error, // Si hay error, aplicar el estilo de error
    disabled && styles.disabled, // Si está deshabilitado, aplicar el estilo de deshabilitado
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          value={inputValue}
          onChangeText={setInputValue}
          style={inputStyles}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled} // Hace que el input sea no editable si está deshabilitado
          secureTextEntry={!isPasswordVisible} // Determina si el texto debe ser visible o no
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
    width: "100%", // Asegura que el contenedor ocupe todo el ancho disponible
  },
  inputContainer: {
    position: "relative", // Necesario para colocar el ícono dentro del input
  },
  input: {
    fontFamily: "InterRegular", // Asegúrate de tener la fuente correcta
    padding: 10,
    paddingRight: 40, // Dejamos espacio para el ícono dentro del input
    borderColor: Colors.colors.gray[200], // Color de borde gris
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.colors.gray[100], // Color de fondo gris suave
    color: Colors.colors.gray[400], // Color de texto gris
    width: "100%", // Ajustamos el ancho al 100%
    minHeight: 48,
  },
  focused: {
    borderColor: Colors.colors.gray[400], // Color cuando tiene el foco
    backgroundColor: Colors.colors.neutral[100], // Fondo suave azul cuando tiene el foco
  },
  error: {
    borderColor: Colors.colors.error[100], // Color de borde cuando hay error
  },
  disabled: {
    backgroundColor: Colors.colors.gray[200], // Fondo gris claro cuando está deshabilitado
    borderColor: Colors.colors.gray[300], // Borde gris claro cuando está deshabilitado
  },
  iconContainer: {
    position: "absolute", // Colocamos el ícono dentro del input
    right: 10, // Lo posicionamos a la derecha
    top: "50%", // Lo centramos verticalmente
    transform: [{ translateY: -12 }], // Ajustamos la alineación vertical para centrarlo
  },
  errorText: {
    color: Colors.colors.error[100], // Color del texto de error
    fontSize: 12, // Tamaño del texto de error
    marginTop: 4, // Espacio entre el input y el mensaje de error
    marginLeft: 10, // Alineación con el input
  },
});

export default PasswordInput;
