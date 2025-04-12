// React & React Native Imports
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/ColoresPropios";


interface TextAreaWithCounterProps {
  bio: string;
  setBio: (text: string) => void;
  errorMessage?: string; // Nueva prop para el mensaje de error
}

const TextAreaWithCounter: React.FC<TextAreaWithCounterProps> = ({
  bio,
  setBio,
  errorMessage,
}) => {
  const maxChars = 120;

  const handleChange = (inputText: string) => {
    if (inputText.length <= maxChars) {
      setBio(inputText);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textArea,
          errorMessage && styles.error, // Aplicar estilo de error si hay un mensaje
        ]}
        multiline
        numberOfLines={5}
        placeholder="Sobre mi (opcional)"
        value={bio}
        onChangeText={handleChange}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.charCounter, globalStyles.smallBodyRegular]}>
          {bio.length}/{maxChars} caracteres
        </Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
  },
  textArea: {
    fontFamily: "InterRegular",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    backgroundColor: "#f4f4f4",
    color: "#808080",
    width: "100%",
    minHeight: 100, // Ajustado para que parezca un textarea
    textAlignVertical: "top",
  },
   infoContainer: {
    flexDirection: "column", // Coloca el contador y el error en columna
    alignItems: "flex-start",
    marginTop: 5,
  },
  charCounter: {
    alignSelf: "flex-end", // Mueve el contador a la derecha
  },
  error: {
    borderColor: Colors.colors.error[100],
  },
  errorText: {
    color: Colors.colors.error[100],
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextAreaWithCounter;
