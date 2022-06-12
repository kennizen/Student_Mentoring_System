import React, { useContext, useEffect, useState } from "react";
import DotIcon from "../../assets/icons/DotIcon";
import moment from "moment";
import AnnotationIcon from "../../assets/icons/AnnotationIcon";
import DoubleTickIcon from "../../assets/icons/DoubleTickIcon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { markNotificationRead } from "../../actions/notification";
import UserGroupIcon from "../../assets/icons/UserGroupIcon";
import { authContext } from "../../contexts/authContext";

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
    const { uid } = useContext(authContext);

    const dispatch = useDispatch();
    const history = useHistory();

    // useeffect to show the post and find the users for which notification is unread
    useEffect(() => {
        let text = "";
        if (event.type === "MEETING_CREATED") text = content?.description;
        else if (event.type === "POST_CREATED") text = content?.body.replace(/<[^>]+>/g, "");
        const thisUser = receivers?.find(
            (receiver) => receiver.user._id.toString() === uid.toString()
        );
        setText(text);
        setUser(thisUser);
    }, [receivers]);

    // state for the unread user and text content
    const [text, setText] = useState("");
    const [user, setUser] = useState(null);

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
                <div className="text-white w-full">
                    <h4 className="text-left">{event?.detail}</h4>
                    <p className="w-56 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {text}
                    </p>
                    <div className="text-gray-400 flex items-center justify-start">
                        <h6 className="text-left">{`${creator?.firstname} ${creator?.middlename} ${creator?.lastname}`}</h6>
                        <div className="mx-2 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <h6>{moment(content?.createdAt).format("LLL")}</h6>
                    </div>
                </div>
            </div>
            {event?.type === "POST_CREATED" && (
                <AnnotationIcon myStyle={"h-8 w-8 text-blue-500 flex-shrink-0"} alt={false} />
            )}
            {event?.type === "MEETING_CREATED" && (
                <UserGroupIcon myStyle={"h-8 w-8 text-blue-500 flex-shrink-0"} alt={false} />
            )}
        </div>
    );
};

export default NotificationTile;
