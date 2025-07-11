import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function ActivityLayout() {
  const {t} = useTranslation();
  return (
    <Stack 
      screenOptions={{ contentStyle: { backgroundColor: Colors.colors.textWhite.primary }}}
    >
      <Stack.Screen 
      name="index" 
      options={{ 
        headerShown: false 
      }} 
      />
      <Stack.Screen 
      name="notifications" 
      options={{ 
        title: t("notifications.title"),
        headerBackTitle: 'Atrás'
      }} 
      />
      <Stack.Screen 
      name="connectionRequests" 
      options={{ 
        title: t('notifications.connectionNotifications'),
        headerBackTitle: 'Atrás'
      }} 
      />
    </Stack>
  );
}