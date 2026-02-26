import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { io } from "socket.io-client";

const LOCATION_TASK_NAME = "background-location-task";
const SERVER_URL = "https://curb-side-backend.onrender.com";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("Background error:", error);
    return;
  }

  const socket = io(SERVER_URL, { transports: ["websocket"] });

  const { locations } = data as any;
  const location = locations[0];

  socket.emit("driver:location", {
    driverId: "6995a1441287438bcc1b863d",
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  });

  console.log("Background location emitted");
});