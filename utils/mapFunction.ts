import { Linking, Platform, Alert } from "react-native";

export function openMap(lat: number, lon: number) {
  const url = Platform.select({
    ios: `comgooglemaps://?q=${lat},${lon}`, // Intentar abrir Google Maps en iOS
    android: `geo:${lat},${lon}?q=${lat},${lon}`, // Google Maps en Android
  });

  if (!url) return;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else if (Platform.OS === 'ios') {
        // Si Google Maps no está instalado, usar Apple Maps
        const appleUrl = `http://maps.apple.com/?ll=${lat},${lon}`;
        Linking.openURL(appleUrl);
      } else {
        Alert.alert('No se pudo abrir la aplicación de mapas');
      }
    })
    .catch((err) => console.error('Error al abrir el mapa:', err));
}
