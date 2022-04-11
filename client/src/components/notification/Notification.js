import React from "react";
import { useSelector } from "react-redux";
import DoubleTickIcon from "../../assets/DoubleTickIcon";
import NotificationTile from "./NotificationTile";

const Notification = ({
    myStyle,
    nodeRef,
    setShowNotificationModal,
    setShowOverlay,
    setModalContent,
}) => {
    // getting all notifications from the state
    const { notifications } = useSelector((state) => state.notification);

    console.log("notifications from state", notifications);

    return (
        <div
            ref={nodeRef}
            className={`${myStyle} h-96 w-96 bg-gray-600 absolute z-10 top-12 -right-4 rounded-md px-3 py-2`}
        >
            <div className="h-full w-full flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-start mb-2">
                    <h4 className="text-white">Notifications</h4>
                </div>
                <div className="h-full overflow-auto w-full cursor-pointer">
                    {notifications
                        .sort((a, b) => {
                            return a.createdAt < b.createdAt ? 1 : -1;
                        })
                        .map((notification) => (
                            <NotificationTile
                                key={notification._id}
                                {...notification}
                                setShowNotificationModal={setShowNotificationModal}
                                setShowOverlay={setShowOverlay}
                                setModalContent={setModalContent}
                            />
                        ))}
                </div>
                <div className="w-full">
                    <button className="text-white w-full bg-gray-700 p-2 hover:bg-gray-800 transition-all text-sm flex items-center justify-center gap-x-2 mt-2 rounded-md">
                        <DoubleTickIcon myStyle={"h-4 w-4"} />
                        Mark all read
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
