import { useEffect, useState } from "react";
import { requestLocationpermission, startLocationTracking } from "../services/locationService";

export function useLiveLocation(){
    const [coords, setCoords] = useState<any>(null);

    useEffect(() =>{
        let subscription: any;

        async function init(){
            try{
                await requestLocationpermission();
                subscription = await startLocationTracking((newCoords)=>{
                    setCoords(newCoords);
                });
            } catch (err){
                console.log("location:", err);
            }
        }

        init();

        return () =>{
            if (subscription) subscription.remove();
        };
    }, []);
    return coords;
}