import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DividerWithText = ({ text = "o si lo prefieres", full = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {!full && <Text style={styles.text}>{text}</Text>}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Ocupa todo el ancho
    flexDirection: "row", // Alinea en fila
    alignItems: "center", // Centra verticalmente

  },
  line: {
    flex: 1,
    minWidth: 50,  // Evita que la línea colapse
    height: 1, 
    backgroundColor: "#000",
  }
  ,  
  text: {
    marginHorizontal: 10, // Espaciado entre texto y líneas
    fontSize: 14,
    fontFamily: "InterMedium",
    color: "#808080",
  },
});

export default DividerWithText;
