import  React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import MapSection from "../components/mapSection";
import BottomPanel from "../components/BottomPanel";
import { useLiveLocation } from "../hooks/useLiveLocation";
import { io, Socket } from "socket.io-client";


export default function DriverHomeScreen(){

    const SERVER_URL = "https://curb-side-backend.onrender.com";

    const [socket, setSocket] = useState<Socket | null>(null);
    const [isOnline, setIsOnline] = useState(false);
    const coords = useLiveLocation(isOnline);

            useEffect(() => {
        const s = io(SERVER_URL, {
            transports: ["websocket"],
        });

        s.on("connect", () => {
            console.log("socket connected:", s.id);
        });

        s.on("disconnect", () => {
            console.log("socket disconnected");
        });

        setSocket(s);

        return () => {
            s.disconnect();
        };
        }, []);

    useEffect(()=>{
        if (!coords || !isOnline) return;
        console.log("about to emit location...");
        console.log("Socket existss:", !!socket);
        console.log("Socket connected:", socket?.connected);


        if(!socket || !socket.connected) return;
        console.log("socket not found..")

        socket.emit("driver:location",{
            driverId: "6995a1441287438bcc1b863d",
            lat: coords.latitude,
            lng:coords.longitude
        });

        console.log("location emitted");
    },[coords,isOnline]);
    
    return(
        <View style={styles.container}>
            <MapSection />
            <BottomPanel isOnline={isOnline} setIsOnline={setIsOnline}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})