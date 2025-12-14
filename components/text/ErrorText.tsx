// React & React Native Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


// Utility Imports
import { Colors } from '@/constants/Colors';

//Style Imports
import global from '@/styles/global'; // Asegúrate de que esta ruta sea correcta
interface ErrorTextProps {
  text: string;  // Aquí definimos la propiedad que acepta el texto
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={[ global.mediumBodyMedium, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    paddingVertical: 10,  // Espaciado vertical
    paddingHorizontal: 10, // Espaciado horizontal
    backgroundColor: Colors.colors.error[50],  // Fondo de error
    borderRadius: 5,  // Bordes redondeados
  },
  text: {
    color: Colors.colors.error[500],
  },
});

export default ErrorText;
