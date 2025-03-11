import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", 
  },
});
// import React from "react";
// import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";


// export const LoadingScreen= () => {
//   return (
//     <Modal transparent={true} animationType="fade" visible={true}>
//       <View style={styles.container}>
//         <View style={styles.loadingBox}>
//           <ActivityIndicator size="large" color="#007bff" />
//           <Text style={styles.loadingText}>Cargando...</Text>
//         </View>
//       </View>
//     </Modal>
//   );
// };
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo más oscuro
//   },
//   loadingBox: {
//     backgroundColor: "#ffffff", // Fondo blanco para el cuadro de carga
//     borderRadius: 10, // Bordes redondeados
//     padding: 20, // Espaciado interno
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000", // Sombra para un efecto elevado
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5, // Sombra en Android
//   },
//   loadingText: {
//     marginTop: 10, // Espacio entre el indicador y el texto
//     fontSize: 16,
//     color: "#333333", // Color de texto oscuro
//     fontFamily: "InterRegular", // Usa la fuente de tu aplicación
//   },
// });
