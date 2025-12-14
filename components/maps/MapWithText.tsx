import { View, Text, TouchableOpacity } from "react-native";
import MiniMap from "@/components/maps/MiniMap";
import { openMap } from "@/utils/mapFunction";

interface MapWithTextProps {
    latitude: number;
    longitude: number;
    distance: number;
    address: string;
}
export default function MapWithText({ latitude, longitude, distance, address }: MapWithTextProps) {
    return(
    <View style={{ flexDirection: 'row', padding: 12 }}>

        <MiniMap latitude={latitude} longitude={longitude} />

        <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>
            A {distance}m del centro
        </Text>
        <Text>
        {address}
        </Text>



        <TouchableOpacity
        onPress={() => openMap(latitude, longitude)}
        style={{
            marginTop: 10,
            backgroundColor: '#E9F2FF',
            padding: 10,
            borderRadius: 10,
            alignSelf: 'flex-start',
        }}
        >
        <Text style={{ color: '#007aff' }}>Abrir mapa</Text>
        </TouchableOpacity>
        </View>

    </View>
    );
}