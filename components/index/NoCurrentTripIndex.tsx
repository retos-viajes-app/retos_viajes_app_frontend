// React & React Native Imports
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

// Component Imports
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PaddingView from '@/components/views/PaddingView';

// Hook Imports
import { useAuth } from '@/hooks/useAuth';

// Style Imports
import globalStyles from '@/styles/global';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';


const NoCurrentTripIndex = () => {
  const router = useRouter();
  const { user} = useAuth();
  const { t } = useTranslation();

  return (
    //273 no queda bien
      <PaddingView>
        <View style={{flex: 1, justifyContent: 'center', gap: 16}}>  
          <View style={{ gap: 8, alignItems: 'center'}}>
            <Text style={[globalStyles.largeBodySemiBold, {color:Colors.colors.primary[900]}]}>{t('index.noTrip.title', { name: user?.name})}</Text> 
            <Text style={[globalStyles.largeBodyMedium,{color:Colors.colors.text.secondary}]}>{t("index.noTrip.subtitle")}</Text> 
          </View>
          <PrimaryButton 
            title={t("createTrip.button.create")} 
            onPress={() => router.push('/createTrip/selectDestination')}
          />
        </View>
      </PaddingView>
  );
};



export default NoCurrentTripIndex;