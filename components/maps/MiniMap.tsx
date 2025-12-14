  import MapView, { Marker } from 'react-native-maps';

interface MiniMapProps {
    latitude: number;
    longitude: number;
}
const MiniMap = ({ latitude, longitude }: MiniMapProps) => {
    return (
        <MapView
        style={{
            width: 120,
            height: 120,
            borderRadius: 10,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        pointerEvents="none"  // evita toques
        initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        </MapView>
    );
    }
export default MiniMap;