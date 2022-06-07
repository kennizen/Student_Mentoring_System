import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { markNotificationRead } from "../../actions/notification";
import DoubleTickIcon from "../../assets/icons/DoubleTickIcon";
import NotificationTile from "./NotificationTile";
import Loading from "../loading/Loading";
import { authContext } from "../../contexts/authContext";

const Notification = ({
    myStyle,
    nodeRef,
    setShowNotificationModal,
    setShowOverlay,
    setModalContent,
}) => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    const dispatch = useDispatch();
    const history = useHistory();

    // getting all notifications from the state
    const { notifications } = useSelector((state) => state.notification);

    console.log("notifications from state", notifications);

    const handleMarkAllRead = () => {
        setLoading(true);
        let ids = [];
        notifications.forEach((notification) => {
            if (
                notification.receivers.find(
                    (r) => r.user._id.toString() === uid.toString() && !r.read
                )
            ) {
                ids.push({ id: notification._id, willReceive: true });
            }
        });
        dispatch(markNotificationRead(history, ids, setLoading));
    };

    // loading state for mark all read
    const [loading, setLoading] = useState(false);

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
                    <button
                        onClick={handleMarkAllRead}
                        className="text-white w-full bg-gray-700 p-2 hover:bg-gray-800 transition-all text-sm flex items-center justify-center gap-x-2 mt-2 rounded-md"
                    >
                        {loading ? (
                            <Loading myStyle={"h-5 w-5"} />
                        ) : (
                            <>
                                <DoubleTickIcon myStyle={"h-4 w-4"} />
                                Mark all read
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
