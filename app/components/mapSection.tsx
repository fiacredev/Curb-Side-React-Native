import React from "react";
import { View ,StyleSheet } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import { Delivery } from "../services/deliveryService";
import { useLiveLocation } from "../hooks/useLiveLocation";

interface Props {
  isOnline: boolean;
  delivery: Delivery | null;
}

export default function MapSection({ isOnline, delivery }: Props){

    const coords = useLiveLocation(isOnline);
    const mapRef = React.useRef<MapView>(null);

    
    React.useEffect(() => {
        if (!mapRef.current || !coords) return;
        
        if (delivery?.pickup && delivery?.dropoff) {
            mapRef.current.fitToCoordinates(
                [
                    {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
          },
          {
              latitude: delivery.pickup.lat,
              longitude: delivery.pickup.lng,
            },
            {
                latitude: delivery.dropoff.lat,
                longitude: delivery.dropoff.lng,
            },
        ],
        {
            edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
            animated: true,
        }
    );
}
}, [delivery, coords]);

//    please be and pay atttention on this have to be rendered last to prevernt error of rendering before previous hook

    if (!coords) return null;

    return(
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            style = {styles.map}
            region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            >

            <Marker coordinate={coords} title="Driiver" />

            {delivery?.pickup && (
            <Marker
                coordinate={{
                latitude: delivery.pickup.lat,
                longitude: delivery.pickup.lng,
                }}
                title="Pickup"
                pinColor="yellow"
            />
            )}



            {delivery?.dropoff && (
            <Marker
                coordinate={{
                latitude: delivery.dropoff.lat,
                longitude: delivery.dropoff.lng,
                }}
                title="Dropoff"
                pinColor="green"
            />
            )}


        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})