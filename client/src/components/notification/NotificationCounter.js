import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authContext } from "../../contexts/authContext";

const NotificationCounter = () => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    // accessing the global notification store
    const { notifications } = useSelector((state) => state.notification);

    console.log("notifications in counter", notifications);

    // function to find the no. of unread notifications
    useEffect(() => {
        let count = 0;
        if (notifications && notifications.length > 0) {
            notifications.forEach((notification) => {
                // console.log(notification.receivers.find((r) => r.user._id === uid));
                if (
                    notification.receivers.find(
                        (receiver) => receiver.user._id.toString() === uid.toString()
                    ).read === false
                ) {
                    count++;
                }
            });
            setReadNotifications(count);
        }
    }, [notifications, uid]);

    // state to manage the unread notification count
    const [readNotifications, setReadNotifications] = useState(0);

    return (
        <>
            {readNotifications > 0 ? (
                <h5
                    className={`bg-red-500 text-center w-6 h-6 rounded-full text-white flex items-center justify-center absolute -top-1 right-0 ${
                        readNotifications > 99 ? "text-xs" : ""
                    }`}
                >
                    {readNotifications > 99 ? "99+" : readNotifications}
                </h5>
            ) : (
                ""
            )}
        </>
    );
};

export default NotificationCounter;
