import { io } from "socket.io-client";

let socket: any;

export const connectSocket = () => {
  socket = io("https://curb-side-backend.onrender.com");
};

export const getSocket = () => socket;