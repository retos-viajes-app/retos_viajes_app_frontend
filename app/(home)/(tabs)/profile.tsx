// React & React Native Imports
import { View, Button, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';



// Hook Imports
import { useAuth } from '@/hooks/useAuth';
import ProfileHeader from '@/components/profile/ProfileHeader';
import TripGrid from '@/components/profile/TripGrid';
import ProfileActions from '@/components/profile/ProfileActions';
import ProfileStats from '@/components/profile/ProfileStats';
import PaddingView from '@/components/views/PaddingView';

export const PROFILE_DATA = {
  name: 'Ángel Moreno',
  username: '@angeelmoreno',
  location: 'Málaga, España',
  bio: 'El mundo es como un libro, y los que no viajan, solo leen una página ✈️',
  avatar: 'https://i.pravatar.cc/150?u=angelmoreno', // Usaremos un avatar de prueba
  level: 'Viajero experto',
  xp: 500,
  xpGoal: 1540,
  stats: {
    countries: 12,
    missions: 158,
    contacts: 4512,
  },
};

export const TRIPS_DATA = [
  {
    id: '1',
    city: 'Málaga',
    tripCount: 2,
    image: 'https://images.unsplash.com/photo-1579373388765-944181342625?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: '2',
    city: 'Madrid',
    tripCount: 1,
    image: 'https://images.unsplash.com/photo-1543786653-7323c24b6f7a?q=80&w=2835&auto=format&fit=crop',
  },
  {
    id: '3',
    city: 'Barcelona',
    tripCount: 2,
    image: 'https://images.unsplash.com/photo-1528742842631-4a18246a6318?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: '4',
    city: 'Roma',
    tripCount: 3,
    image: 'https://images.unsplash.com/photo-1529260830199-42c24129f196?q=80&w=2940&auto=format&fit=crop',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const {logout, user} = useAuth();

  const handleLogout = async () => {
    logout();
    router.replace("/login"); 
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <PaddingView>
          {/* Usamos los datos de prueba importados */}
          <ProfileHeader
            name={PROFILE_DATA.name}
            username={PROFILE_DATA.username}
            location={PROFILE_DATA.location}
            bio={PROFILE_DATA.bio}
            avatar={PROFILE_DATA.avatar}
          />
          
          
          {/* El componente de nivel y XP puede ser añadido dentro o fuera del header */}
          {/* Por simplicidad, lo omitimos, pero sería fácil de agregar */}

          <ProfileStats stats={PROFILE_DATA.stats} />
          
          <ProfileActions />

          <TripGrid trips={TRIPS_DATA} />

          {/* Botón de Logout (puedes moverlo a un menú de configuración si prefieres) */}
          <View style={styles.logoutContainer}>
             <Button title="Cerrar sesión" onPress={handleLogout} color="#FF3B30" />
          </View>
      </PaddingView>
        
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

