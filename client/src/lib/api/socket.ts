// lib/socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  autoConnect: false, // we will connect manually after auth
});

export default socket;
