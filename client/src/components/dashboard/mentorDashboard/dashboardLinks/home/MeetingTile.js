import React from "react";
import moment from "moment";

const MeetingTile = ({ _id, host, url, updatedAt, date, myStyle, myStyle2 }) => {
    return (
        <div
            className={`${myStyle} flex items-center w-full px-2 py-1 mb-2 rounded-md transition-all`}
        >
            <img
                className="w-12 h-12 mr-2 rounded-full"
                src={
                    host?.avatar?.url === ""
                        ? `https://api.dicebear.com/9.x/personas/svg`
                        : host?.avatar?.url
                }
                alt=""
            />
            <div className={`${myStyle2} pb-1 w-full`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h5>{`${host?.firstname} ${host?.middlename} ${host?.lastname}`}</h5>
                        <h6 className="text-gray-600">{moment(updatedAt).format("DD/MM/yyyy")}</h6>
                    </div>
                    <h6>{moment(date).format("DD/MM/yyyy, h:mm a")}</h6>
                </div>
            </div>
        </div>
    );
};

export default MeetingTile;
