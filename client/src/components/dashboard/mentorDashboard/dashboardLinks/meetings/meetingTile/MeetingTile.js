import React, { useContext, useRef, useState } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../../modal/ModalOverlay";
import MeetingMinutesModal from "../meetingModal/MeetingMinutesModal";
import { authContext } from "../../../../../../contexts/authContext";
import { Roles } from "../../../../../../utility";
import { useDispatch } from "react-redux";
import { updateMeeting, updateMinutes } from "../../../../../../actions/meeting";
import { useHistory } from "react-router-dom";

const curDate = new Date();

const MeetingTile = ({
    _id,
    host,
    url,
    updatedAt,
    date,
    description,
    participants,
    minutes,
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
            minutes: minutes === undefined ? "" : minutes,
        });
    };

    // getting user role
    const { role } = useContext(authContext);

    // state to control the modal show and dont show
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMeetingMinutesModal, setShowMeetingMinutesModal] = useState(false);
    // minutes state
    const [meetMinutes, setMeetMinutes] = useState({ id: "", minutes: "" });

    // node refs for the modals
    const meetingMinutesModalRef = useRef(null);
    const overlayRef = useRef(null);

    // function to show minutes meeting modal
    const handleMinutesMeetingModal = () => {
        setShowOverlay(true);
        setShowMeetingMinutesModal(true);
        setMeetMinutes({ id: _id, minutes: minutes === undefined ? "" : minutes });
    };

    const dispatch = useDispatch();

    // function to handle minute submit
    const handleMinutesSubmit = () => {
        dispatch(updateMinutes(meetMinutes));
        setMeetMinutes({ id: "", minutes: "" });
        setShowOverlay(false);
        setShowMeetingMinutesModal(false);
    };

    console.log("meet minutes", meetMinutes);

    return (
        <div
            className={`p-4 w-full border border-gray-300 rounded-md flex flex-col gap-y-4 text-left ${
                curDate.toISOString() > date ? "bg-gray-200" : "bg-white"
            } mb-4`}
        >
            <CSSTransition
                nodeRef={overlayRef}
                in={showOverlay}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            <CSSTransition
                nodeRef={meetingMinutesModalRef}
                in={showMeetingMinutesModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <MeetingMinutesModal
                    nodeRef={meetingMinutesModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowMeetingMinutesModal={setShowMeetingMinutesModal}
                    handleMinutesSubmit={handleMinutesSubmit}
                    meetMinutes={meetMinutes}
                    setMeetMinutes={setMeetMinutes}
                />
            </CSSTransition>
            <div className="flex items-start justify-start">
                <img
                    className="w-12 h-12 mr-2 rounded-full"
                    src={
                        host?.avatar?.url === ""
                            ? `https://api.dicebear.com/9.x/personas/svg`
                            : host?.avatar?.url
                    }
                    alt="img"
                />
                <div className="flex-grow">
                    <h5>{`${host?.firstname} ${host?.middlename} ${host?.lastname}`}</h5>
                    <h6 className="text-gray-600">{moment(updatedAt).format("DD/MM/yyyy")}</h6>
                </div>
                {role === Roles.MENTOR && (
                    <>
                        <Tooltip arrow title="add meeting minutes" enterDelay={500}>
                            <button
                                onClick={handleMinutesMeetingModal}
                                className="hover:bg-gray-600 hover:text-white text-gray-600 transition-all rounded-full w-8 h-8 text-center mr-3"
                            >
                                <AddIcon fontSize="medium" />
                            </button>
                        </Tooltip>

                        <Tooltip arrow title="edit meeting" enterDelay={500}>
                            <button
                                onClick={handleSelectedMeeting}
                                className="hover:bg-gray-600 hover:text-white text-gray-600 transition-all rounded-full w-8 h-8 text-center"
                            >
                                <EditIcon fontSize="small" />
                            </button>
                        </Tooltip>
                    </>
                )}
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
                                        src={
                                            p?.user?.avatar?.url === ""
                                                ? `https://api.dicebear.com/9.x/personas/svg`
                                                : p?.user?.avatar?.url
                                        }
                                    />
                                }
                                label={p?.user?.enrollment_no}
                                size="small"
                            />
                        </Tooltip>
                    );
                })}
            </div>
            {minutes ? <h5 className="whitespace-pre">{minutes}</h5> : ""}
        </div>
    );
};

export default MeetingTile;
