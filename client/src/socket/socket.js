import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

function connectSocket() {
    var socket = io(ENDPOINT);
    return socket;
}

export default connectSocket;
