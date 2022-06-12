import React from "react";
import moment from "moment";

const Message = ({ message, uid }) => {
    return (
        <div
            className={`w-full flex items-center mb-1 ${
                message.sender._id === uid ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`px-2 max-w-3/5 py-1 flex flex-col ${
                    message.sender._id === uid ? "bg-gray-200" : "bg-blue-200"
                } rounded-lg`}
            >
                <h5 className="mr-5 break-words">{message.content}</h5>
                <h6 className="text-gray-500 place-self-end">
                    {moment(message.createdAt).format("LLL")}
                </h6>
            </div>
        </div>
    );
};

export default Message;
