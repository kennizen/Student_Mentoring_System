import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NotificationCounter = () => {
    // getting uid of the logged in user
    let uid = "";
    if (localStorage.getItem("authData")) {
        uid = JSON.parse(localStorage.getItem("authData"))["uid"];
    }

    // accessing the global notification store
    const { notifications } = useSelector((state) => state.notification);

    // function to find the no. of unread notifications
    useEffect(() => {
        let count = 0;
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
    }, [notifications]);

    // state to manage the unread notification count
    const [readNotifications, setReadNotifications] = useState(0);

    if (readNotifications)
        return (
            <h5 className="w-5 h-5 bg-red-500 text-center rounded-full text-white flex items-center justify-center absolute top-0 right-0">
                {readNotifications}
            </h5>
        );
    return <div></div>;
};

export default NotificationCounter;
