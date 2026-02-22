import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper"

interface Props {
    isOnline: boolean,
    setIsOnline: (value: boolean) => void;
}

export default function BottomPanel({isOnline, setIsOnline}: Props){
    return(
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleMedium" style={styles.text}>
                   Status: {isOnline ? "online" : "offline"}
                </Text>
            </Card.Content>

            <Card.Actions>
                <Button>
                  {isOnline ? "offline" : "Go online"}
                </Button>
            </Card.Actions>
        </Card>
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