import Challenge from "@/models/challenge";
import { View,StyleSheet, Text} from "react-native";


const ChallengeCard = ({ challenge}: { challenge: Challenge}) => {
   
  return (
    <View style={styles.card}>
        <View  style={styles.photo}>
            <View>

            </View>
            <View>

            </View>
        </View>
        <View style={styles.content}>
            <Text>{challenge.title}</Text>
            <Text>{challenge.short_description}</Text>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between', width: '70%'}}>
                <Text>{challenge.details?.[0]?.price ? `${challenge.details[0].price} $` : ""}</Text>
                <Text>{challenge.details?.[0]?.xp ? `${challenge.details[0].xp} pts` : ""}</Text>
                <Text>{challenge.details?.[0]?.duration ? `${challenge.details[0].duration} h` : ""}</Text>
            </View>
        </View>
    </View>
  );
}	

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E5E7EA',
        borderStyle: 'solid',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#2C3E50',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    photo: {
        flex: 1,
        height: 120,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        alignSelf: 'stretch',
        backgroundColor: '#808080', 
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    content: {
        flex: 1,
        display: 'flex',
        padding: 16,
        flexDirection: 'column', 
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    }
});

export default ChallengeCard;