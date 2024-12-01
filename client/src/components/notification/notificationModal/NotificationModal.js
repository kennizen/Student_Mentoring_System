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
                                        ? `https://api.dicebear.com/9.x/personas/svg`
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
        } else if (notification && notification.event.type === "MEETING_CREATED") {
            return (
                <div
                    className={`p-4 w-full border border-gray-300 rounded-md flex flex-col gap-y-4 text-left bg-white mb-4`}
                >
                    <div className="flex items-start justify-start">
                        <img
                            className="w-12 h-12 mr-2 rounded-full"
                            src={
                                notification?.creator.avatar.url === ""
                                    ? `https://api.dicebear.com/9.x/personas/svg`
                                    : notification?.creator.avatar.url
                            }
                            alt="img"
                        />
                        <div className="flex-grow">
                            <h5>{`${notification?.creator?.firstname} ${notification?.creator?.middlename} ${notification?.creator?.lastname}`}</h5>
                            <h6 className="text-gray-600">
                                {moment(notification?.content?.updatedAt).format("DD/MM/yyyy")}
                            </h6>
                        </div>
                    </div>
                    <p className="">{notification?.content?.description}</p>
                    <div className="flex items-start justify-between gap-x-3 w-full">
                        <span
                            style={{
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                wordBreak: "break-all",
                                WebkitHyphens: "auto",
                                msHyphens: "auto",
                                MozHyphens: "auto",
                                hyphens: "auto",
                            }}
                            className="text-xs inline-block"
                        >
                            <a
                                className="underline hover:text-blue-500"
                                rel="noreferrer"
                                target={"_blank"}
                                href={notification?.content?.url}
                            >
                                {notification?.content?.url}
                            </a>
                        </span>
                        <h6 className="flex-shrink-0">
                            <span className="text-gray-500">Meeting on: </span>
                            {moment(notification?.content.date).format("DD/MM/yyyy, h:mm a")}
                        </h6>
                    </div>
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
