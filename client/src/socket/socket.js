import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

function connectSocket(token) {
    var socket = io(ENDPOINT, {
        query: { auth: token}
    });
    return socket;
}

export default connectSocket;
