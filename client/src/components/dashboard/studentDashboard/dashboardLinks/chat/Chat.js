import React from "react";
import ChatSideBar from "./chatSideBar/ChatSideBar";
import ChatWindow from "./chatWindow/ChatWindow";

const Chat = () => {
    return (
        <>
            <div className="py-2 px-48 w-full h-full overflow-auto">
                <div className="flex gap-x-5 h-cal">
                    <ChatSideBar />
                    <ChatWindow />
                </div>
            </div>
        </>
    );
};

export default Chat;
