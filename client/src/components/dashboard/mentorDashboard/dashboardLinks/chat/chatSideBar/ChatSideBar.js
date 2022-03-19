import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

const ChatSideBar = ({ chats, setSelectedChat, showNotification }) => {
    // getting uid of the logged in user
    const uid = JSON.parse(localStorage.getItem("authData"))["uid"];

    // state for activating the bg of the selected chat
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // const dispatch = useDispatch();
    // const history = useHistory();

    return (
        <>
            <div className="w-2/5 mt-5 p-2 bg-white rounded-md h-full overflow-auto">
                <div className="sticky-top z-10">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="pl-11 border-none w-full focus:outline-none focus:ring-0 bg-gray-100 rounded-md"
                            placeholder="Search chat..."
                        />
                        <div className="absolute top-2.5 left-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {chats?.map((chat, index) => {
                    if (chat.users.find((user) => user.user._id !== uid)) {
                        let thatUser = chat.users.find((user) => user.user._id !== uid);
                        return (
                            <div key={chat._id} className="mb-4 flex flex-col items-end">
                                <div
                                    onClick={() => {
                                        setSelectedIndex(index);
                                        setSelectedChat(chat._id);
                                    }}
                                    className={`grid w-full grid-cols-chatTab p-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all ${
                                        selectedIndex === index ? "bg-gray-200" : ""
                                    }`}
                                >
                                    <img
                                        className="h-12 w-12 rounded-full"
                                        src={
                                            thatUser?.user?.avatar?.url === ""
                                                ? `https://avatars.dicebear.com/api/initials/${thatUser?.user?.firstname}.svg`
                                                : thatUser?.user?.avatar?.url
                                        }
                                        alt="img"
                                    />
                                    <div className="flex mx-6 flex-col items-start justify-evenly">
                                        <h3>{`${thatUser?.user?.firstname} ${thatUser?.user?.middlename} ${thatUser?.user?.lastname}`}</h3>
                                        <h6>{chat?.latestMessage}</h6>
                                    </div>
                                    <div className="px-3 flex flex-col items-center justify-evenly">
                                        <h6>a min ago</h6>
                                        {showNotification.chatId === chat._id &&
                                        showNotification.isShow ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="#ef5350"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-5/6 h-px bg-gray-200"></div>
                            </div>
                        );
                    }
                    return <div key={chat._id}></div>;
                })}
            </div>
        </>
    );
};

export default ChatSideBar;
