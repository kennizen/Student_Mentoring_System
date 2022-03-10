import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMessage, getMessages } from "../../../../../../actions/chat";
import { useSelector } from "react-redux";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket;

// getting uid of the logged in user
const uid = JSON.parse(localStorage.getItem("authData"))["uid"];

const ChatWindow = ({ selectedChat }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", uid);
        socket.on("connection", setSocketConnected(true));
    }, []);

    useEffect(() => {
        console.log("working everytime");
        socket.on("message received", (message) => {
            console.log("message from socket", message);
            dispatch({ type: "ADD_MESSAGES", message });
        });
    });

    // api call to fetch all the messages for the selected chat
    useEffect(() => {
        if (selectedChat) {
            // console.log("selectedChat", selectedChat);
            dispatch(getMessages(history, selectedChat, socket));
        }
    }, [dispatch, selectedChat, history]);

    // state for custom placeholder in the input div
    const [placeHol, setPlaceHol] = useState("opacity-100");
    // state to set the disable status of the send button
    const [disable, setDisable] = useState(true);
    // state variable representing the message to be sent
    const [message, setMessage] = useState({
        content: "",
        chat: "",
    });
    // state variable to store the fetched messages
    // const [messages, setMessages] = useState([]);

    const { messages } = useSelector((state) => state.chat);

    // div seletor for the div used as text input
    var contenteditable = document.querySelector("[contenteditable]");

    // function to send the text message
    const sendMessage = () => {
        dispatch(createMessage(history, message, socket));
        contenteditable.innerHTML = "";
        contenteditable.focus();
        check();
    };

    // function for hiding the custom placeholder
    const focusPlaceHol = () => {
        setPlaceHol("opacity-0");
    };

    // function for showing the custom placeholder
    const blurPlaceHol = () => {
        if (contenteditable.innerHTML === "" || contenteditable.innerHTML === "<br>") {
            setPlaceHol("opacity-100");
        }
    };

    /* function to check if the custom input div is empty or not to control the send button disable status */
    const check = () => {
        // console.log("running");
        // console.log(contenteditable.innerHTML);
        if (contenteditable.textContent.trim() === "") setDisable(true);
        else setDisable(false);

        setMessage({
            content: contenteditable.textContent.trim(),
            chat: selectedChat,
        });
    };

    console.log("message", message);
    console.log("messages", messages);

    return (
        <>
            <div className="w-3/5 mt-5 p-2 bg-white rounded-md h-full overflow-auto">
                <div className="w-full h-9/10 overflow-auto flex flex-col-reverse px-10 pb-7">
                    {messages
                        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                        .map((message) => {
                            return (
                                <div
                                    key={message._id}
                                    className={`w-full flex items-center mb-1 ${
                                        message.sender._id === uid ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <h5
                                        className={`px-2 max-w-3/5 py-1 ${
                                            message.sender._id === uid
                                                ? "bg-gray-200"
                                                : "bg-blue-200"
                                        } rounded-lg`}
                                    >
                                        {message.content}
                                    </h5>
                                </div>
                            );
                        })}
                </div>
                <div className="w-full h-1/10">
                    <div className="flex items-center justify-center h-full px-10 gap-x-6">
                        <div className="w-full relative">
                            <div
                                onFocus={focusPlaceHol}
                                onBlur={blurPlaceHol}
                                onKeyUp={check}
                                contentEditable={true}
                                className="px-2 py-3 rounded-md max-h-16 bg-gray-100 outline-none break-words overflow-auto"
                            ></div>
                            <h4
                                className={`text-gray-400 opa absolute top-3 left-2 pointer-events-none ${placeHol}`}
                            >
                                Type something...
                            </h4>
                        </div>

                        <button
                            title="Send message"
                            className={`bg-green-500 p-2.5 rounded-md disabled:opacity-50 text-white`}
                            onClick={sendMessage}
                            disabled={disable}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatWindow;
