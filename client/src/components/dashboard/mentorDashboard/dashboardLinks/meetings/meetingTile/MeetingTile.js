import React from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Tooltip } from "@mui/material";

const curDate = new Date();

const MeetingTile = ({
    _id,
    host,
    url,
    updatedAt,
    date,
    description,
    participants,
    setMeeting,
}) => {
    const handleSelectedMeeting = () => {
        let part = [];
        participants.forEach((pa) => {
            part.push(pa.user._id);
        });
        setMeeting({
            id: _id,
            description: description,
            url: url,
            date: date,
            participants: part,
        });
    };

    return (
        <div
            className={`p-4 w-full border border-gray-300 rounded-md flex flex-col gap-y-4 text-left ${
                curDate.toISOString() > date ? "bg-gray-200" : "bg-white"
            } mb-4`}
        >
            <div className="flex items-start justify-start">
                <img className="w-12 h-12 mr-2 rounded-full" src={host?.avatar?.url} alt="img" />
                <div className="flex-grow">
                    <h5>{`${host?.firstname} ${host?.middlename} ${host?.lastname}`}</h5>
                    <h6 className="text-gray-600">{moment(updatedAt).format("DD/MM/yyyy")}</h6>
                </div>
                <button
                    onClick={handleSelectedMeeting}
                    className="hover:bg-gray-600 hover:text-white text-gray-600 transition-all rounded-full w-8 h-8 text-center"
                >
                    <EditIcon fontSize="small" />
                </button>
            </div>
            <p className="">{description}</p>
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
                        href={url}
                    >
                        {url}
                    </a>
                </span>
                <h6 className="flex-shrink-0">
                    <span className="text-gray-500">Meeting on: </span>
                    {moment(date).format("DD/MM/yyyy, h:mm a")}
                </h6>
            </div>
            <div className="w-full flex items-start gap-x-2 flex-wrap">
                {participants?.map((p, i) => {
                    return (
                        <Tooltip
                            key={i}
                            arrow
                            title={`${p?.user?.firstname} ${p?.user?.middlename} ${p?.user?.lastname}`}
                        >
                            <Chip
                                avatar={
                                    <img
                                        className="rounded-full"
                                        alt="img"
                                        src={p?.user?.avatar.url}
                                    />
                                }
                                label={p?.user?.enrollment_no}
                                size="small"
                            />
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};

export default MeetingTile;
