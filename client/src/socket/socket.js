import io from "socket.io-client";
import React from "react";

const ENDPOINT = "http://localhost:5000";

// var socket;

// function connectSocket(token) {
//     socket = io(ENDPOINT, {
//         query: { auth: token },
//     });
//     return socket;
// }

// const SocketContext = React.createContext(socket);

// export default connectSocket;

export const socket = io(ENDPOINT);

export const SocketContext = React.createContext();
