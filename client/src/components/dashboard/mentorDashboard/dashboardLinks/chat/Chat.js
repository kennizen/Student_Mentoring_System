import React, { useEffect } from "react";
import ChatAlt2Icon from "../../../../../assets/ChatAlt2Icon";
import ChatSideBar from "./chatSideBar/ChatSideBar";
import ChatWindow from "./chatWindow/ChatWindow";

import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import ChatModal from "./chatModal/ChatModal";
import ModalOverlay from "../../../../modal/ModalOverlay";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllChat } from "../../../../../actions/chat";
import { useSelector } from "react-redux";

const Chat = () => {
    const [showModal, setShowModal] = useState(false);
    const [chatsToBeDisplayed, setChatsToBeDisplayed] = useState([]);

    // refs used for css transition to work for the modal and the overlay
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();

    // accessing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(getAllChat(history, setChatsToBeDisplayed));
    }, [dispatch, history]);

    console.log("chats", chats);
    console.log("chats to be displayed", chatsToBeDisplayed);

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
                    <ModalOverlay nodeRef={overlayRef} showModal={setShowModal} />
                </CSSTransition>
                <CSSTransition
                    nodeRef={modalRef}
                    in={showModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <ChatModal
                        nodeRef={modalRef}
                        setShowModal={setShowModal}
                        chats={chatsToBeDisplayed}
                    />
                </CSSTransition>
                <div className="bg-white flex items-center justify-between p-3 mt-2 rounded-lg">
                    <h2 className="text-gray-500">Chat with your fellow mentees...</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-between py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white"
                    >
                        <ChatAlt2Icon alt={false} myStyle={"h-5 w-5 mr-2"} />
                        Create a chat
                    </button>
                </div>
                <div className="flex gap-x-5 h-cal">
                    <ChatSideBar chats={chatsToBeDisplayed} />
                    <ChatWindow />
                </div>
            </div>
        </>
    );
};

export default Chat;
