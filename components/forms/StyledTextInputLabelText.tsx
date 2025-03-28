import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/ColoresPropios";
import DateTimePicker from "@react-native-community/datetimepicker";
// Definimos las propiedades que acepta el componente, extendiendo los props de TextInput.
interface CustomTextInputProps extends TextInputProps {
  errorMessage?: string; // Propiedad para el error (opcional)
  disabled?: boolean; // Propiedad para manejar si el input está deshabilitado (opcional)
}

const StyledTextInputLabelText: React.FC<CustomTextInputProps> = ({
  errorMessage,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco
  // Manejar los cambios de foco
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Condicionalmente, aplicamos estilos en función del estado
  const inputStyles = [
    styles.input,
    isFocused && !disabled && styles.focused, // Cuando el input tiene foco y no está deshabilitado
    errorMessage && styles.error, // Si hay error, aplicar el estilo de error
    disabled && styles.disabled, // Si está deshabilitado, aplicar el estilo de deshabilitado
  ];

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={inputStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled} // Hace que el input sea no editable si está deshabilitado
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%", // Asegura que el contenedor ocupe todo el ancho disponible 
  },
  input: {
    fontFamily: "InterRegular", // Asegúrate de tener la fuente correcta
    padding: 10,
    borderColor: Colors.colors.gray[200], // Color de borde gris
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.colors.gray[100], // Color de fondo gris suave
    color: Colors.colors.gray[400], // Color de texto gris
    width: "100%",
    minHeight: 48,
  },
  focused: {
    borderColor: Colors.colors.gray[400], // Color cuando tiene el foco (puedes ajustarlo)
    backgroundColor: Colors.colors.neutral[100], // Fondo suave azul cuando tiene el foco
  },
  error: {
    borderColor: Colors.colors.error[100], // Color de borde cuando hay error
  },
  disabled: {
    backgroundColor: Colors.colors.gray[200], // Fondo gris claro cuando está deshabilitado
    borderColor: Colors.colors.gray[300], // Borde gris claro cuando está deshabilitado
  },
  errorText: {
    color: Colors.colors.error[100], // Color del texto de error
    fontSize: 12, // Tamaño del texto de error
    marginTop: 4, // Espacio entre el input y el mensaje de error
    marginLeft: 10, // Alineación con el input
  },

});

export default StyledTextInputLabelText;
