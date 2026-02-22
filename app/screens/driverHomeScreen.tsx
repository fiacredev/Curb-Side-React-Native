import  React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import MapSection from "../components/mapSection";
import BottomPanel from "../components/BottomPanel";

export default function DriverHomeScreen(){
    const [isOnline, setIsOnline] = useState(false);
    
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