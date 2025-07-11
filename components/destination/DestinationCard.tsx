
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Destination } from "@/models/destination";
import {  useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';

const DestinationCard = ({ destination }: { destination: Destination }) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/main/destination/${destination.id}`);
    };
    return (
        <View style={styles.card}>
             <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.6)']}
                locations={[0, 0.5, 1]}
            />
            <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                     style={styles.footer}
            >
              
                <View style={styles.textContainer}>
                        <Text >{destination.city}</Text>
                        <Text>{destination.country}</Text>
                </View>
                
                <TouchableOpacity style={styles.circle} onPress={handlePress}>
                     <ArrowRight size={18} color={Colors.colors.primary[500]}/>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 172,
        height: 240,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        borderRadius: 16,
        backgroundColor: 'lightgray',
        elevation: 5,
        shadowColor: 'rgba(44, 62, 80, 0.15)',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    footer: {
        padding: 10,
        flexDirection: 'row', // Para que el texto y el círculo estén en línea
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'rgba(28, 28, 30, 0.7)',
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