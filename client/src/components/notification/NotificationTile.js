import React, { useEffect, useState } from "react";
import DotIcon from "../../assets/DotIcon";
import moment from "moment";
import AnnotationIcon from "../../assets/AnnotationIcon";
import DoubleTickIcon from "../../assets/DoubleTickIcon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { markNotificationRead } from "../../actions/notification";

const NotificationTile = ({
    content,
    creator,
    event,
    receivers,
    _id,
    setShowNotificationModal,
    setShowOverlay,
    setModalContent,
}) => {
    // getting uid of the logged in user
    let uid = "";
    if (localStorage.getItem("authData")) {
        uid = JSON.parse(localStorage.getItem("authData"))["uid"];
    }

    const dispatch = useDispatch();
    const history = useHistory();

    // useeffect to show the post and find the users for which notification is unread
    useEffect(() => {
        const text = content?.body.replace(/<[^>]+>/g, "");
        const thisUser = receivers?.find(
            (receiver) => receiver.user._id.toString() === uid.toString()
        );
        setText(text);
        setUser(thisUser);
    }, [receivers]);

    // state for the unread user and text content
    const [text, setText] = useState("");
    const [user, setUser] = useState(null);

    // function to return the appropiate icon based on the notification event type
    const returnIcon = () => {
        if (event?.type === "POST_CREATED") {
            return <AnnotationIcon myStyle={"h-10 w-10 text-blue-600 flex-shrink-0"} alt={false} />;
        }
    };

    // console.log("receiver user", user);
    // function for notification tile clicked action
    const handleAction = () => {
        setShowNotificationModal(true);
        setShowOverlay(true);
        let modalCon = {
            content,
            creator,
            event,
        };
        setModalContent(modalCon);
        dispatch(markNotificationRead(history, [{ id: _id, willReceive: true }]));
    };

    return (
        <div
            onClick={handleAction}
            className={`${
                !user?.read
                    ? "bg-gray-700 shadow-sm hover:shadow-md rounded-md"
                    : "border-b border-gray-500"
            } flex items-center justify-between p-2 gap-x-3 mb-2 transition-all mr-2`}
        >
            <div className="flex items-start gap-x-3 justify-between w-full">
                {!user?.read ? (
                    <DotIcon myStyle={"h-2 w-2 bg-blue-500 rounded-full"} />
                ) : (
                    <DoubleTickIcon myStyle={"h-4 w-4 text-blue-500 flex-shrink-0"} />
                )}
                <div className="text-white w-full overflow-hidden">
                    <h4 className="text-left">{event?.detail}</h4>
                    <h5 className="w-56 text-truncate">{text}</h5>
                    <div className="text-gray-400 flex items-center justify-start">
                        <h6 className="text-left">{`${creator?.firstname} ${creator?.middlename} ${creator.lastname}`}</h6>
                        <div className="mx-2 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <h6>{moment(content.createdAt).format("LLL")}</h6>
                    </div>
                </div>
            </div>
            {returnIcon()}
        </div>
    );
};

export default NotificationTile;