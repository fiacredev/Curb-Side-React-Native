import React from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet } from "react-native";

export default function MapSection(){
    return(
        <MapView
            style = {styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
        <Marker 
        
          coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}

        title="you"

        />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})