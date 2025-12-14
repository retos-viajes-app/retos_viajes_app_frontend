import { View, Text } from 'react-native';
import { Check, Loader } from 'lucide-react-native';
import labelsStyles from '@/styles/labels';
import globalStyles from '@/styles/global';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import circles from '@/styles/circles';

interface StatusToogleProps {
    completed: boolean;
    textYes?: string;
    textNo?: string;    
}
export default function StatusToogle({ completed, textYes, textNo }: StatusToogleProps) {

    const { t } = useTranslation();
  return (
    !completed ?
    <View style={labelsStyles.cardLabelRight}>
        <Loader size={16} color={Colors.colors.text.secondary}/>
        <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.text.secondary}]}>{t(`${textNo}`)}</Text>
    </View>
    :
    <View style={[labelsStyles.cardLabelCheckedRight, {backgroundColor: Colors.colors.secondary[50]}]}>
        <View style={[circles.circle30,{backgroundColor: Colors.colors.secondary[100]}]}>
            <Check color={Colors.colors.success[800]}/>
        </View>
        <Text style={[globalStyles.mediumBodyMedium, {color: Colors.colors.success[800], padding: 8}]}>{t(`${textYes}`)}</Text>
    </View>
  );
}