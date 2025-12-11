import { useRouter } from "expo-router";
import Challenge from "@/models/challenge";
import { View,StyleSheet, Text, Pressable, ImageBackground} from "react-native";
//Icons
import { Check, Loader, MountainSnow } from "lucide-react-native";
//Styles
import { Colors } from "@/constants/Colors";
import labelsStyles from "@/styles/labels";
import globalStyles from "@/styles/global";
import circles from "@/styles/circles";
import { useTranslation } from "react-i18next";


interface ChallengeCardProps {
    challenge: Challenge;
    completed: boolean;
    isForTripInfo?: boolean;
}
const ChallengeCard = ({ challenge, completed, isForTripInfo}: ChallengeCardProps) => {
   const router = useRouter();
   const { t } = useTranslation();
   const goToChallengeDetail = (challenge: Challenge) => {
      
       router.push({
           pathname: "/(home)/(tabs)/main/trip/challengeDetails",
           params: { challenge: JSON.stringify(challenge) },
       });
   };

  return (
    <Pressable onPress={() => goToChallengeDetail(challenge)}>
        <View style={styles.card}>
            <ImageBackground source={{ uri: challenge.image_url }} style={styles.imageBackground}>
                <View style={labelsStyles.cardLabelLeft}>
                    <MountainSnow size={16} color={Colors.colors.text.primary}/>
                    <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.text.primary}]}>{challenge.category?.name}</Text>
                </View>
                {isForTripInfo && (
                    !completed ?
                    <View style={labelsStyles.cardLabelRight}>
                        <Loader size={16} color={Colors.colors.text.secondary}/>
                        <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.text.secondary}]}>{t("challenge.notCompleted")}</Text>
                    </View>
                    :
                    <View style={[labelsStyles.cardLabelCheckedRight, {backgroundColor: Colors.colors.secondary[50]}]}>
                        <View style={[circles.circle30,{backgroundColor: Colors.colors.secondary[100]}]}>
                            <Check color={Colors.colors.success[800]}/>
                        </View>
                        <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.success[800], padding: 8}]}>{t("challenge.completed")}</Text>
                    </View>
                )}
            </ImageBackground>
            <View style={styles.content}>
                <Text>{challenge.title}</Text>
                <Text>{challenge.short_description}</Text>
                <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between', width: '70%'}}>
                    {challenge.distance_from_challenge_to_city_center?
                    <Text>A {challenge.distance_from_challenge_to_city_center.toFixed(2)}km del centro </Text>
                    : null}
                    
                    <Text>{challenge.detail?.price ? `${challenge.detail.price} $` : ""}</Text>
                    <Text>{challenge.detail?.xp ? `${challenge.detail.xp} pts` : ""}</Text>
                    <Text>{challenge.detail?.duration ? `${challenge.detail.duration} h` : ""}</Text>
                </View>
            </View>
        </View>
    </Pressable>
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
    imageBackground: {
        flex: 1,
        height: 120,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        alignSelf: 'stretch',
        backgroundColor: Colors.colors.background.image, 
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
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
    },
});

export default ChallengeCard;