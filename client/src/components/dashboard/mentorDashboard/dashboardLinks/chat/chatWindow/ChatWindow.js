import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    clearMessages,
    createMessage,
    getMessages,
    getOlderMessages,
    updateNotification,
} from "../../../../../../actions/chat";
import { useSelector } from "react-redux";

import Loading from "../../../../../loading/Loading";
import ScrollToBottom from "./ScrollToBottom";
import Message from "./Message";
import { SocketContext } from "../../../../../../socket/socket";
import { authContext } from "../../../../../../contexts/authContext";

const ChatWindow = ({ selectedChat, curChat }) => {
    const socket = React.useContext(SocketContext);

    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    // accesing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);

    // accessing global store for the notification array to show notifications
    const { notifications } = useSelector((state) => state.chat);

    const dispatch = useDispatch();
    const history = useHistory();

    // div seletor for the div used as text input
    var contenteditable = document.querySelector("[contenteditable]");

    /* function to check if the custom input div is empty or not to control the send button disable status */
    const check = () => {
        if (isLoading) setDisable(true);
        else if (contenteditable.textContent.trim() === "") setDisable(true);
        else if (selectedChat === "" && localStorage.getItem("persistChat") === null)
            setDisable(true);
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

    // state for scroll to bottom element ----------------
    const [ele, setEle] = useState(null);

    useEffect(() => {
        const element = document.getElementById("scrollable");
        setEle(element);
    }, []);

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        if (ele.scrollTop < -100) {
            setVisible(true);
            localStorage.setItem("visible", true);
        } else {
            setVisible(false);
            localStorage.removeItem("visible");
            // notification removal for the move to bottom button when it is visible
            if (localStorage.getItem("selectedChat") !== null) {
                const sc = localStorage.getItem("selectedChat");
                let tmp = notifications.filter((id) => id !== sc);
                dispatch(updateNotification(tmp));
            }
        }
    };

    const scrollToBottom = () => {
        ele.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    // --------------------------------------------------------------

    // state to set the number of pages to fetch the old messages
    const [page, setPage] = useState(2);

    // api call to fetch all the messages for the selected chat
    useEffect(() => {
        setPage(2);
        if (selectedChat) {
            dispatch(getMessages(history, selectedChat, 1, setIsLoading));
            executeScroll();
            contenteditable !== null && contenteditable.focus();
        } else if (localStorage.getItem("persistChat") !== null) {
            const id = JSON.parse(localStorage.getItem("persistChat")).chatId;
            dispatch(getMessages(history, id, 1, setIsLoading));
            /* done this so that if selected chat is fetched from local storage
             then if somebody sends a message and i am on this chat then notification
             should not be shown */
            localStorage.setItem("selectedChat", id);
            executeScroll();
        } else {
            dispatch(clearMessages());
        }
        if (contenteditable !== null) {
            contenteditable.innerHTML = "";
            check();
        }
        setVisible(false);
    }, [selectedChat]);

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

    // accessing state variable for the messages array
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

    // ref used so that message can be brought into view when sent or received
    const scrollMessage = useRef();

    // function to make scroll focus to the recent post posted
    const executeScroll = () => {
        scrollMessage?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // state variable to control the loading for loding old messages
    const [oldMessageLoading, setOldMessageLoading] = useState(false);
    // load Older msg
    const loadOlderMessages = () => {
        console.log("load more msgs");
        setPage(page + 1);
        setOldMessageLoading(true);
        dispatch(getOlderMessages(history, selectedChat, page, setOldMessageLoading));
    };

    console.log("chats", chats);
    console.log("message", message);
    console.log("messages", messages);
    // console.log("selected chat", selectedChat);

    return (
        <>
            <div className="w-3/5 bg-white rounded-md h-full flex-shrink-0">
                {localStorage.getItem("selectedChat") && (
                    <div className="w-full bg-gray-600 rounded-t-md">
                        <div className="flex items-center justify-start h-full px-5 py-2.5 gap-x-4 text-white">
                            <img
                                src={
                                    curChat.avatar === ""
                                        ? `https://api.dicebear.com/9.x/personas/svg`
                                        : curChat.avatar
                                }
                                alt="IMG"
                                className="h-12 w-12 rounded-full"
                            />
                            <h4>{curChat.name}</h4>
                        </div>
                    </div>
                )}
                {isLoading ? (
                    <div className="w-full h-4/5 px-10 pb-7 flex items-center justify-center">
                        <Loading myStyle={"w-8 h-8"} />
                    </div>
                ) : (
                    <div
                        id="scrollable"
                        onScroll={toggleVisible}
                        className="w-full h-4/5 overflow-auto flex items-center flex-col-reverse px-12 pb-5 relative"
                    >
                        <div ref={scrollMessage}></div>
                        {message.length !== 0 &&
                            messages
                                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                                .map((message) => (
                                    <Message key={message._id} message={message} uid={uid} />
                                ))}
                        {messages.length !== 0 &&
                            (oldMessageLoading ? (
                                <Loading myStyle={"h-6 w-6 mb-2 mt-1"} />
                            ) : (
                                <button
                                    onClick={loadOlderMessages}
                                    title="Load message"
                                    className={`justify-self-center p-1.5 rounded-md disabled:opacity-50 text-gray-400 text-xs bg-gray-100 mb-2 mt-1 hover:text-gray-600 transition-all`}
                                >
                                    Load previous messages
                                </button>
                            ))}
                    </div>
                )}

                {visible && <ScrollToBottom scrollToBottom={scrollToBottom} />}

                {localStorage.getItem("selectedChat") && (
                    <div className="w-full h-1/10 bg-gray-600 flex items-center justify-center gap-x-6 mt-1 rounded-b-md">
                        <div className="w-17/20 flex-shrink-0 relative">
                            <div
                                onFocus={focusPlaceHol}
                                onBlur={blurPlaceHol}
                                onKeyUp={check}
                                contentEditable={true}
                                className="px-2 py-3 rounded-md max-h-16 bg-white outline-none break-words overflow-y-auto"
                            ></div>
                            <h4
                                className={`text-gray-400 absolute top-3 left-2 pointer-events-none ${placeHol}`}
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
                )}
            </div>
        </>
    );
};

export default ChatWindow;
