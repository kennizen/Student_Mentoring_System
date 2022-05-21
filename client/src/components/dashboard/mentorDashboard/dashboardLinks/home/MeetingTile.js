import React from "react";
import moment from "moment";

const MeetingTile = ({ _id, host, url, createdAt, date, myStyle, handleModal }) => {
    const handleClick = () => {
        handleModal(_id);
    };

    return (
        <div
            onClick={handleClick}
            className={`${myStyle} flex items-center w-full px-3 py-1 mb-2 cursor-pointer rounded-md transition-all`}
        >
            <img className="w-12 h-12 mr-2 rounded-full" src={host?.avatar?.url} alt="" />
            <div className="border-b border-gray-300 pb-1 w-full">
                <div className="flex items-center justify-between">
                    <div>
                        <h5>{`${host?.firstname} ${host?.middlename} ${host?.lastname}`}</h5>
                        <h6 className="text-gray-600">{moment(createdAt).format("DD/MM/yyyy")}</h6>
                    </div>
                    <h6>{moment(date).format("DD/MM/yyyy, h:mm a")}</h6>
                </div>
                <div>
                    <span className="text-xs">
                        <a
                            className="underline hover:text-blue-500"
                            rel="noreferrer"
                            target={"_blank"}
                            href={url}
                        >
                            {url}
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MeetingTile;
