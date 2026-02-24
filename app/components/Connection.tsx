import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io("https://curb-side-backend.onrender.com");

export default function App() {
  const [status, setStatus] = useState("Not connected....");

  useEffect(() => {
    // Listen for connection
    socket.on("connect", () => setStatus("CONNECTED"));

    // Cleanup function
    return () => {
      socket.off("connect"); // remove listener
      socket.disconnect();   // disconnect socket
    };
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>{status}</Text>
    </View>
  );
}