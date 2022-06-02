import React, { useEffect } from "react";
import ChatAlt2Icon from "../../../../../assets/icons/ChatAlt2Icon";
import ChatSideBar from "./chatSideBar/ChatSideBar";
import ChatWindow from "./chatWindow/ChatWindow";

import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import ChatModal from "./chatModal/ChatModal";
import ModalOverlay from "../../../../modal/ModalOverlay";

const Chat = () => {
    // api call to fetch all the chats
    useEffect(() => {
        if (localStorage.getItem("visible") !== null) {
            localStorage.removeItem("visible");
        }
    }, []);

    // state to control the modal show and dont show
    const [showModal, setShowModal] = useState(false);

    // state variable for storing the selected chat id for the selected chat
    const [selectedChat, setSelectedChat] = useState("");

    // state for showing the selected chat at top of chat window
    const [curChat, setCurChat] = useState({
        avatar: "",
        name: "",
    });

    // set selected set
    const setChatSelection = (id) => {
        setSelectedChat(id);
        localStorage.setItem("selectedChat", id);
    };

    // refs used for css transition to work for the modal and the overlay
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    return (
        <>
            <div className="py-2 px-48 w-full h-full overflow-hidden relative">
                <CSSTransition
                    nodeRef={overlayRef}
                    in={showModal}
                    timeout={300}
                    classNames="overlay"
                    unmountOnExit
                >
                    <ModalOverlay nodeRef={overlayRef} />
                </CSSTransition>
                <CSSTransition
                    nodeRef={modalRef}
                    in={showModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <ChatModal nodeRef={modalRef} setShowModal={setShowModal} />
                </CSSTransition>

                <div className="bg-white flex w-full items-center justify-between p-3 mt-2 rounded-lg">
                    <h2 className="text-gray-500">Chat</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-between py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white"
                    >
                        <ChatAlt2Icon alt={false} myStyle={"h-5 w-5 mr-2"} />
                        Create a chat
                    </button>
                </div>
                <div className="flex gap-x-5 h-cal w-full mt-5">
                    <ChatSideBar setChatSelection={setChatSelection} setCurChat={setCurChat} />
                    <ChatWindow selectedChat={selectedChat} curChat={curChat} />
                </div>
            </div>
        </>
    );
};

export default Chat;
