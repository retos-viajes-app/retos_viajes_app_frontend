import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function ActivityLayout() {
  return (
    <Stack 
        screenOptions={{ contentStyle: { backgroundColor: Colors.colors.neutral[100] }}}
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
          title: 'Notificaciones',
          headerBackTitle: 'Atrás'
        }} 
      />
      <Stack.Screen 
        name="connectionRequests" 
        options={{ 
          title: 'Solicitudes de amistad',
          headerBackTitle: 'Atrás'
        }} 
      />
    </Stack>
  );
}