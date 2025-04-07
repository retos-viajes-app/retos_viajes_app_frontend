import { Colors } from "@/constants/ColoresPropios";
import globalStyles from "@/styles/global";
import React from "react";
import { View, Text, StyleSheet } from "react-native";


const DividerWithText = ({ text = "o si lo prefieres", full = false }) => {
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

export default DividerWithText;
