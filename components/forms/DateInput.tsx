// React & React Native Imports
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Utility Imports
import { Colors } from "@/constants/Colors";

// Icon Imports
//import { Calendar } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";

// Third-Party Imports
import DateTimePicker from "@react-native-community/datetimepicker";



interface CustomDateInputProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  errorMessage?: string;
  disabled?: boolean;
  title: string;
}

export const  DateInput: React.FC<CustomDateInputProps> = ({
  date,
  setDate,
  errorMessage,
  disabled = false,
  title,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const toggleDatePicker = () => {
    if (!disabled) setPickerVisible(!isPickerVisible);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setPickerVisible(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.input, errorMessage && styles.error, disabled && styles.disabled]}
        onPress={toggleDatePicker}
        disabled={disabled}
      >
      <View style={styles.inputContent}>
        <Text style={styles.dateText}>{date ? date.toLocaleDateString() : title}</Text>
        {/* <Calendar size={20} color={Colors.colors.text.secondary} /> */}
        <Feather name="calendar" size={20} color={Colors.colors.text.secondary} />
      </View>
      </TouchableOpacity>
      {isPickerVisible && (
        <DateTimePicker
          value={date || new Date()}
          minimumDate={new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
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
    borderColor: Colors.colors.border.default, // Color de borde gris
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.colors.background.default, // Color de fondo gris suave
    color: Colors.colors.text.secondary, // Color de texto gris
    width: "100%",
    minHeight: 48,
  },
  focused: {
    borderColor: Colors.colors.border.strong, // Color cuando tiene el foco (puedes ajustarlo)
    backgroundColor: Colors.colors.background.inputFocused, // Fondo suave azul cuando tiene el foco
  },
  error: {
    borderColor: Colors.colors.error[100], // Color de borde cuando hay error
  },
  disabled: {
    backgroundColor: Colors.colors.border.default, // Fondo gris claro cuando está deshabilitado
    borderColor: Colors.colors.border.default, // Borde gris claro cuando está deshabilitado
  },
  errorText: {
    color: Colors.colors.error[100], // Color del texto de error
    fontSize: 12, // Tamaño del texto de error
    marginTop: 4, // Espacio entre el input y el mensaje de error
    marginLeft: 10, // Alineación con el input
  },
  //date+
  dateText: {
    color: Colors.colors.text.secondary,
  },  
  inputContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

export default DateInput;
