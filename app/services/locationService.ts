import * as Location from "expo-location"

export async function requestLocationpermission(){
    const { status } = await Location.requestForegroundPermissionsAsync();

    if(status !== "granted"){
        throw new Error("location permission denied");
    }
}

export async function startLocationTracking(
    callback: (coords: Location.LocationObjectCoords) => void
){
    return Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 3000,
        distanceInterval: 1,
    },
   (location) => {
        callback(location.coords);
   }
);
}