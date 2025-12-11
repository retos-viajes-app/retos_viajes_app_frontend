import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const commonLabelStyles = {
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
    right: 10,
    backgroundColor: Colors.colors.background.hover,
    alignItems: 'center',
    borderRadius: 50,
    width: 'auto',
    height: 33,
    gap: 10,
};

const labelsStyles = StyleSheet.create({
    cardLabel: {
        ...commonLabelStyles,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    cardLabelChecked: {
        ...commonLabelStyles,
        justifyContent: 'space-around',
        paddingHorizontalRight: 10,
    },
});
export default labelsStyles;