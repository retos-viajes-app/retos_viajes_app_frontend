import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const commonLabelStyles = {
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
    backgroundColor: Colors.colors.background.hover,
    alignItems: 'center',
    borderRadius: 50,
    width: 'auto',
    height: 33,
    gap: 10,
};

const labelsStyles = StyleSheet.create({
    cardLabelRight: {
        ...commonLabelStyles,
        justifyContent: 'center',
        paddingHorizontal: 10,
        right: 10,
    },
    cardLabelCheckedRight: {
        ...commonLabelStyles,
        justifyContent: 'space-around',
        paddingHorizontalRight: 10,
        right: 10,
    },
    cardLabelLeft: {
        ...commonLabelStyles,
        justifyContent: 'center',
        paddingHorizontal: 10,
        left: 10,
    },
});
export default labelsStyles;