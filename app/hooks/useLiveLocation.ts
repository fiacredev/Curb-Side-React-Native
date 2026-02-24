import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";

export function useLiveLocation(isOnline: boolean) {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const watcher = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!isOnline) {
      // stop tracking if offline
      watcher.current?.remove();
      watcher.current = null;
      return;
    }

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      watcher.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,  // every 5 sec
          distanceInterval: 10, // or every 10 meters
        },
        (location) => {
          setCoords(location.coords);
        }
      );
    })();

    return () => {
      watcher.current?.remove();
    };
  }, [isOnline]);

  return coords;
}