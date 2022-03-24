import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DotIcon from "../../../../../../assets/DotIcon";
import SearchIcon from "../../../../../../assets/SearchIcon";

import moment from "moment";

const ChatSideBar = ({ setChatSelection }) => {
    // getting uid of the logged in user
    const uid = JSON.parse(localStorage.getItem("authData"))["uid"];

    // accesing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);

    // state for activating the bg of the selected chat
    // const [selectedIndex, setSelectedIndex] = useState(-1);

    const dispatch = useDispatch();

    // accessing global store for the notification array to show notifications
    const { notifications } = useSelector((state) => state.chat);

    console.log("notifications", notifications);

    // useEffect(() => {
    //     if (selectedIndex === -1 && localStorage.getItem("persistChat") !== null) {
    //         const index = JSON.parse(localStorage.getItem("persistChat")).chatIndex;
    //         localStorage.setItem("0", index);
    //     }
    // }, []);

    return (
        <>
            <div className="w-2/5 p-2 bg-white rounded-md h-full overflow-auto">
                <div className="sticky-top z-10">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="pl-11 border-none w-full focus:outline-none focus:ring-0 bg-gray-100 rounded-md"
                            placeholder="Search chat..."
                        />
                        <div className="absolute top-2.5 left-3">
                            <SearchIcon myStyle={"h-5 w-5"} alt={true} />
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
                                        //setSelectedIndex(index);
                                        localStorage.setItem("0", index);
                                        setChatSelection(chat._id);
                                        if (notifications.includes(chat._id)) {
                                            let tmp = notifications.filter(
                                                (id) => id !== chat._id.toString()
                                            );
                                            dispatch({ type: "UPDATE_NOTIFICATION", tmp });
                                        }
                                        localStorage.setItem(
                                            "persistChat",
                                            JSON.stringify({
                                                chatId: chat._id,
                                                chatIndex: index,
                                            })
                                        );
                                    }}
                                    className={`grid w-full grid-cols-chatTab p-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all ${
                                        localStorage.getItem("0") !== null &&
                                        JSON.parse(localStorage.getItem("0")) === index
                                            ? "bg-gray-200"
                                            : ""
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
                                    <div className="flex w-full mx-6 flex-col items-start justify-evenly overflow-hidden">
                                        <h3>{`${thatUser?.user?.firstname} ${thatUser?.user?.middlename} ${thatUser?.user?.lastname}`}</h3>
                                        <h6>{chat?.latestMessage?.content}</h6>
                                    </div>
                                    <div className="px-3 flex flex-col items-center justify-evenly">
                                        <h6>{moment(chat?.latestMessage?.createdAt).calendar()}</h6>
                                        {notifications.includes(chat._id) ? (
                                            <DotIcon
                                                myStyle={"h-3 w-3 bg-green-500 rounded-full"}
                                            />
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
