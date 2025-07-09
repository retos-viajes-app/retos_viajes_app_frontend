import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; // Asegúrate de que esta ruta sea correcta

const intputStyles = StyleSheet.create({
  default: {
    fontFamily: "InterRegular", 
    padding: 10,
    borderColor: Colors.colors.border.default, 
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: Colors.colors.background.input, 
    color: Colors.colors.text.primary, 
    width: "100%",
    minHeight: 48,
  },
  focused: {
    borderColor: Colors.colors.border.strong, 
    backgroundColor: Colors.colors.background.inputFocused, 
  },
  error: {
    borderColor: Colors.colors.error[500], 
    backgroundColor: Colors.colors.error[50], 
  },
  disabled: {
    opacity: 0.5, 
  },
  errorText: {
    color: Colors.colors.error[500], 
    fontSize: 12, 
    marginTop: 4, 
    marginLeft: 10, 
  },

});

export default intputStyles;