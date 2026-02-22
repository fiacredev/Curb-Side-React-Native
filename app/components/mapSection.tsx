import React from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet } from "react-native";
import { useLiveLocation } from "../hooks/useLiveLocation";

export default function MapSection(){

    const coords = useLiveLocation();

    if (!coords) return null;

    return(
        <MapView
            style = {styles.map}
            region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
        <Marker coordinate={coords} title="Driiver" />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})