import { LinearGradient } from "expo-linear-gradient";

const LinearGradientBlack = ({ style, children }: { style?: any, children?: React.ReactNode }) => {
    return (
        <LinearGradient
            colors={['#1C1C1C','transparent']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={style}
        >
            {children}
        </LinearGradient>
    );
}

export default LinearGradientBlack;