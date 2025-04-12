// React & React Native Imports
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Style Imports
import globalStyles from "@/styles/global";

// Utility Imports
import { Colors } from "@/constants/ColoresPropios";


const Divider = ({ text = "o si lo prefieres", full = false }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.line,{backgroundColor: Colors.colors.gray[200]}]} />
      {!full && <Text style={globalStyles.largeBodyMedium}>{text}</Text>}
      <View style={[styles.line,{backgroundColor: Colors.colors.gray[200]}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", // Ocupa todo el ancho
    gap:20,
    flexDirection: "row", // Alinea en fila
    alignItems: "center", // Centra verticalmente

  },
  line: {
    flex: 1,
    minWidth: 50,  // Evita que la línea colapse
    height: 1, 
  }
});

export default Divider;
