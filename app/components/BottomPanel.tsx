import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text, Portal, Dialog } from "react-native-paper"

interface Props {
    isOnline: boolean,
    setIsOnline: (value: boolean) => void;
}

export default function BottomPanel({isOnline, setIsOnline}: Props){

    const handleToggle = () =>{
        setIsOnline(!isOnline);
    }

    const handleGoOnline = () =>{
        setIsOnline(true);
    }

    return(
        <>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.text}>
                    Status: {isOnline ? "online" : "offline"}
                    </Text>
                </Card.Content>

                <Card.Actions>
                    <Button mode="contained" onPress={handleToggle}>
                    {isOnline ? "Go Offline" : "Go Online"}
                    </Button>
                </Card.Actions>
            </Card>

            //    blocking app popup logic here implemented corectly.
        
        <Portal>
            <Dialog
             visible={!isOnline}
             dismissable={false}
             dismissableBackButton={false}
            >
            <Dialog.Title>You are offline</Dialog.Title>
            <Dialog.Content>
                <Text>
                    please you can't do anything, app blocked regardless going online
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button mode="contained" onPress={handleGoOnline}>
                    <Text style={styles.text}>Go online</Text>
                </Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
    </>

        );
    }

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        backgroundColor:"#b39999",
        borderRadius:"10px",
    },

    text: {
        color:"#fff"
    }
})