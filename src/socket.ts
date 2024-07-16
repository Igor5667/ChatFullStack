import { io } from "socket.io-client";

const URL = "http://172.16.61.119:3000";
export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
