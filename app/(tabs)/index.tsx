// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import io from 'socket.io-client';

const socket = io('http://YOUR_SERVER_IP:3000'); // replace with your backend IP

export default function App() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to continue');
        return;
      }

      // Start location tracking
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // update every 10 meters
          timeInterval: 5000,   // or every 5 seconds
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          setLocation((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));

          // Emit to backend
          socket.emit('driverLocation', { latitude, longitude, driverId: 'driver123' });
        }
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}
        showsUserLocation={true}
      >
        <Marker coordinate={location} title="You" />
      </MapView>
      <Button title="Toggle Availability" onPress={() => Alert.alert('Toggled')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});


