import { io } from "socket.io-client";

const URL = "http://localhost:5555";

export const socket = io(URL);
