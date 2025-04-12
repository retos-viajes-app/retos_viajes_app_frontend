// React & React Native Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


// Utility Imports
import { Colors } from '@/constants/ColoresPropios';


interface ErrorTextProps {
  text: string;  // Aquí definimos la propiedad que acepta el texto
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,  // Espaciado vertical
    paddingHorizontal: 10, // Espaciado horizontal
    backgroundColor: Colors.colors.error[400],  // Fondo de error
    borderRadius: 5,  // Bordes redondeados
  },
  text: {
    color: Colors.colors.error[100],
    fontSize: 14,  // Tamaño del texto
    fontWeight: 'bold',  // Peso del texto
  },
});

export default ErrorText;
