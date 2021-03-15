import { io } from "socket.io-client";

const port = 4040;
const URL = `http://localhost:${port}`;
const socket = io(URL, { autoConnect: false });

export default socket;
