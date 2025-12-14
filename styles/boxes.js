import { Radius } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors"; 
const boxesStyles = StyleSheet.create({
    shadow: {
        borderWidth: 0, 
        // 💡 Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        // 💡 Sombra para Android
        elevation: 4
    },
    radius: {
        borderRadius: 20
    },
    padding16: {
        padding: 16
    },
    shadowFocused: {
        borderWidth: 2,
        borderColor: Colors.colors.secondary[600],
        shadowColor: Colors.colors.secondary[600],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,

        elevation: 12,
    },
})

export default boxesStyles;