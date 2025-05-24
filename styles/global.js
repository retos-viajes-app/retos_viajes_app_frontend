import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Asegúrate de que esta ruta sea correcta

const globalStyles = StyleSheet.create({
  // Títulos
  title: {
    fontFamily: 'InterSemiBold',
    fontSize: 24,
    lineHeight: 28,
    // Asumiendo un color oscuro para los títulos, puedes ajustarlo
    color: Colors.colors.text.default, // O Colors.text.secondary si es más suave
  },
  subtitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    lineHeight: 20,
    // Asumiendo un color oscuro para los subtítulos
    color: Colors.colors.text.default,
  },

  // Large body
  largeBodyBold: {
    fontFamily: 'InterBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.colors.text.default, // O el color que desees para el cuerpo
  },
  largeBodySemiBold: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.colors.text.default,
  },
  largeBodyMedium: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.colors.text.default,
  },

  // Medium body
  mediumBodyBold: {
    fontFamily: 'InterBold',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },
  mediumBodySemiBold: {
    fontFamily: 'InterSemiBold',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },
  mediumBodyMedium: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },
  mediumBodyRegular: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },

  // Small body
  smallBodySemiBold: {
    fontFamily: 'InterSemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },
  smallBodyRegular: {
    fontFamily: 'InterRegular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },

  // Extra small
  extraSmallSemiBold: {
    fontFamily: 'InterSemiBold',
    fontSize: 10,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },
  extraSmallRegular: {
    fontFamily: 'InterRegular',
    fontSize: 10,
    lineHeight: 16,
    color: Colors.colors.text.default,
  },

  // Otros estilos que tenías
  // diplaySemiBold: { // Este no está en la tabla, si no lo usas, considera eliminarlo
  //   fontFamily: 'InterBlack', // Asegúrate de tener 'InterBlack' cargado si lo usas
  //   fontSize: 24,
  //   lineHeight: 24,
  //   color: Colors.text.default,
  // },
  link: {
    color: Colors.colors.primary[500], // Utiliza el color principal de tu paleta
    textDecorationLine: 'underline',
  }
});

export default globalStyles;