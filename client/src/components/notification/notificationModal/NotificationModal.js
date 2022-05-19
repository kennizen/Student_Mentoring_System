import React from "react";
import moment from "moment";

const NotificationModal = ({ notification, nodeRef, setShowNotificationModal, setShowOverlay }) => {
    console.log("notification in modal", notification);

    const handleNotificationContent = () => {
        if (notification && notification.event.type === "POST_CREATED") {
            return (
                <div className="bg-white mb-5 py-3 px-4 rounded-md border flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between mb-5">
                            <img
                                className="h-12 w-12 rounded-full mr-5"
                                src={
                                    notification?.creator.avatar.url === ""
                                        ? `https://avatars.dicebear.com/api/initials/${notification?.creator.firstname}.svg`
                                        : notification?.creator.avatar.url
                                }
                                alt="authorImage"
                            />
                            <div>
                                <h3>{`${notification?.creator.firstname} ${notification?.creator.middlename} ${notification?.creator.lastname}`}</h3>
                                <div className="flex items-center justify-center">
                                    <h6>
                                        {moment(notification?.content?.createdAt).format("LLL")}
                                    </h6>
                                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                                    <h6>
                                        {notification?.creator.designation
                                            ? notification?.creator.designation
                                            : notification?.creator.role === "Mentor"
                                            ? "Designation not found"
                                            : "Student"}
                                    </h6>
                                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                                    <h6>
                                        {notification?.creator.department
                                            ? notification?.creator.department
                                            : "Department not found"}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between"></div>
                    </div>
                    <p
                        className="mb-4 a-tag"
                        dangerouslySetInnerHTML={{ __html: `${notification?.content.body}` }}
                    ></p>
                </div>
            );
        }
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Notification details</h4>
                        <button
                            onClick={() => {
                                setShowNotificationModal(false);
                                setShowOverlay(false);
                            }}
                            className="text-2xl"
                        >
                            &times;
                        </button>
                    </div>
                    {handleNotificationContent()}
                </div>
            </div>
        </>
    );
};

export default NotificationModal;
