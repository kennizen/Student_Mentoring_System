import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createChat,
    createMessage,
    getAllChat,
    getMessages,
    UpdateLatestMessage,
} from "../../../../../../actions/chat";
import { useSelector } from "react-redux";

import io from "socket.io-client";
import Loading from "../../../../../loading/Loading";

const ENDPOINT = "http://localhost:5000";
var socket;

const ChatWindow = ({ selectedChat, chats }) => {
    // getting uid of the logged in user
    let uid = "";
    if (localStorage.getItem("authData")) {
        uid = JSON.parse(localStorage.getItem("authData"))["uid"];
    }

    // div seletor for the div used as text input
    var contenteditable = document.querySelector("[contenteditable]");

    /* function to check if the custom input div is empty or not to control the send button disable status */
    const check = () => {
        if (isLoading) setDisable(true);
        else if (contenteditable.textContent.trim() === "") setDisable(true);
        else setDisable(false);

        var chatId = "";
        if (localStorage.getItem("persistChat") !== null) {
            chatId = JSON.parse(localStorage.getItem("persistChat")).chatId;
        }
        setMessage({
            content: contenteditable.textContent.trim(),
            chat: selectedChat !== "" ? selectedChat : chatId,
        });
    };

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", uid);
    }, []);

    // api call to fetch all the messages for the selected chat
    useEffect(() => {
        if (selectedChat) {
            dispatch(getMessages(history, selectedChat, socket, setIsLoading));
            executeScroll();
        } else if (localStorage.getItem("persistChat") !== null) {
            const id = JSON.parse(localStorage.getItem("persistChat")).chatId;
            dispatch(getMessages(history, id, socket, setIsLoading));
            /* done this so that if selected chat is fetched from local storage
             then if somebody sends a message and i am on this chat then notification
             should not be shown */
            localStorage.setItem("selectedChat", id);
            executeScroll();
        } else {
            dispatch({ type: "CLEAR_MESSAGES" });
        }
        if (contenteditable !== null) {
            contenteditable.innerHTML = "";
            check();
        }
    }, [selectedChat]);

    // useeffect call when message is received
    useEffect(() => {
        socket.on("message received", (data) => {
            // if msg not intended for selected chat
            if (!chats.includes(data.data.chat.toString())) {
                dispatch(getAllChat(history));
            }
            if (localStorage.getItem("selectedChat") == data.data.chat) {
                dispatch({ type: "ADD_MESSAGES", data });
                dispatch(UpdateLatestMessage(data));
                executeScroll();
            } else {
                // if message for unintended person then store chat id in global store to show notification
                const id = data.data.chat.toString();
                dispatch({ type: "ADD_NOTIFICATION", id });
                dispatch(UpdateLatestMessage(data));
            }
        });
    }, []);

    // state for custom placeholder in the input div
    const [placeHol, setPlaceHol] = useState("opacity-100");
    // state to set the disable status of the send button
    const [disable, setDisable] = useState(true);
    // state variable representing the message to be sent
    const [message, setMessage] = useState({
        content: "",
        chat: "",
    });

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    const { messages } = useSelector((state) => state.chat);

    // function to send the text message
    const sendMessage = () => {
        dispatch(createMessage(history, message, socket, executeScroll));
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

    const scrollMessage = useRef();

    // function to make scroll focus to the recent post posted
    const executeScroll = () => {
        scrollMessage?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    console.log("message", message);
    console.log("messages", messages);
    // console.log("selected chat", selectedChat);

    return (
        <>
            <div className="w-3/5 mt-5 p-2 bg-white rounded-md h-full overflow-auto">
                {isLoading ? (
                    <div className="w-full h-9/10 px-10 pb-7 flex items-center justify-center">
                        <Loading height={"h-8"} width={"w-8"} />
                    </div>
                ) : (
                    <div className="w-full h-9/10 overflow-auto flex items-center flex-col-reverse px-10 pb-7">
                        <div ref={scrollMessage}></div>
                        {messages
                            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                            .map((message) => {
                                return (
                                    <div
                                        key={message._id}
                                        className={`w-full flex items-center mb-1 ${
                                            message.sender._id === uid
                                                ? "justify-end"
                                                : "justify-start"
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
                        <button
                            title="Load message"
                            className={`justify-self-center p-1.5 rounded-md disabled:opacity-50 text-gray-400 text-xs bg-gray-100 mb-2`}
                        >
                            Load More
                        </button>
                    </div>
                )}

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
