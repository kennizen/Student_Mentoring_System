import React from "react";
import DotIcon from "../../../../../../assets/icons/DotIcon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const ChatTile = ({ chat, index, setChatSelection, thatUser, setCurChat, setTmpList }) => {
    // getting uid of the logged in user
    let uid = "";
    if (localStorage.getItem("authData") !== null) {
        uid = JSON.parse(localStorage.getItem("authData"))["uid"];
    }

    const dispatch = useDispatch();

    // accessing global store for the notification array to show notifications
    const { notifications } = useSelector((state) => state.chat);

    console.log("notifications", notifications);

    return (
        <div className="mb-4 flex flex-col items-end">
            <div
                onClick={() => {
                    localStorage.setItem("0", index);
                    setChatSelection(chat._id);
                    if (notifications.includes(chat._id)) {
                        let tmp = notifications.filter((id) => id !== chat._id.toString());
                        dispatch({ type: "UPDATE_NOTIFICATION", tmp });
                    }
                    localStorage.setItem(
                        "persistChat",
                        JSON.stringify({
                            chatId: chat._id,
                            chatIndex: index,
                        })
                    );
                    let thisChat = chat.users.find((user) => user.user._id !== uid);
                    setCurChat({
                        avatar: thisChat.user.avatar.url,
                        name: `${thisChat.user.firstname} ${thisChat.user.middlename} ${thisChat.user.lastname}`,
                    });
                    setTmpList([]);
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
                        <DotIcon myStyle={"h-3 w-3 bg-green-500 rounded-full"} />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <div className="w-5/6 h-px bg-gray-200"></div>
        </div>
    );
};

export default ChatTile;
