import React from "react";
import { useSelector } from "react-redux";
import DoubleTickIcon from "../../assets/DoubleTickIcon";
import NotificationTile from "./NotificationTile";

const Notification = ({ myStyle, nodeRef }) => {
    // getting all notifications from the state
    const { notifications } = useSelector((state) => state.notification);

    console.log("notifications from state", notifications);

    return (
        <div
            ref={nodeRef}
            className={`${myStyle} h-96 w-96 bg-gray-600 absolute z-10 top-12 -right-4 rounded-md px-3 py-2`}
        >
            <div className="h-full w-full flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between mb-2">
                    <h4 className="text-white">Notifications</h4>
                    <button className="text-blue-400 hover:text-blue-500 transition-all text-sm flex items-center justify-between gap-x-2">
                        <DoubleTickIcon myStyle={"h-4 w-4"} />
                        Mark all read
                    </button>
                </div>
                <div className="h-full overflow-auto w-full cursor-pointer">
                    {notifications
                        .sort((a, b) => {
                            return a.createdAt < b.createdAt ? 1 : -1;
                        })
                        .map((notification) => (
                            <NotificationTile key={notification._id} {...notification} />
                        ))}
                </div>
                <div className="w-9/10 border-t border-solid border-white flex items-center justify-start ">
                    <button className="py-2 hover:text-gray-300 text-white text-sm transition-all">
                        View all notifications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
