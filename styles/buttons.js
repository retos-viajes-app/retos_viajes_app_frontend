import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";

const buttonStyles = StyleSheet.create({
    checkButton: {
        display: 'flex',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    touchableOpacity: {
    },
    roundedRectangleButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 16,
        width: 96,
        height: 32,
        backgroundColor: Colors.colors.textWhite.primary,
    }

})

export default buttonStyles;