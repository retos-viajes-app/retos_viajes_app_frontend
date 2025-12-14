import { Radius } from "lucide-react-native";
import { StyleSheet } from "react-native";
    
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
    }
})

export default boxesStyles;