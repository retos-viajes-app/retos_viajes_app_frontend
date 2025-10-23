
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Destination } from "@/models/destination";
import {  useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import LinearGradientBlack from "../ui/LineaGradientBlack";
import boxesStyles from "@/styles/boxes";

const DestinationCard = ({ destination }: { destination: Destination }) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/main/destination/${destination.id}`);
    };
    return (
        <View style={styles.card}>
            <LinearGradientBlack style={styles.footer}>
                <View style={styles.textContainer}>
                        <Text >{destination.city}</Text>
                        <Text>{destination.country}</Text>
                </View>
                
                <TouchableOpacity style={styles.circle} onPress={handlePress}>
                     <ArrowRight size={18} color={Colors.colors.primary[500]}/>
                </TouchableOpacity>
            </LinearGradientBlack>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        width: 172,
        height: 240,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        backgroundColor: 'lightgray',
        ...boxesStyles.shadow,
    },
    footer: {
        padding: 10,
        flexDirection: 'row', // Para que el texto y el círculo estén en línea
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
    },
    circle: {
         width: 32,
        height: 32, // Igual que width
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16, // La mitad de width/height
        backgroundColor: '#FFF',
    },
});

export default DestinationCard;