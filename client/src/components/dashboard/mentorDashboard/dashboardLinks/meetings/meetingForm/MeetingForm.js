import React, { useContext, useRef, useState } from "react";
import DTP from "../dtp/DTP";
import EventIcon from "@mui/icons-material/Event";
import LinkIcon from "@mui/icons-material/Link";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../../modal/ModalOverlay";
import MeetingModal from "../meetingModal/MeetingModal";
import { SocketContext } from "../../../../../../socket/socket";

const MeetingForm = ({ meeting, setMeeting }) => {
    const [isValidDateTime, setIsValidDateTime] = useState(true);
    const [dateProvided, setDateProvided] = useState(true);

    // function to handle the date change adn logic to prevent previous date selection
    const handleDateChange = (newDate) => {
        if (newDate == null) {
            setMeeting({ ...meeting, date: newDate });
            setIsValidDateTime(true);
        } else {
            const curDate = new Date();
            if (newDate.toISOString() < curDate.toISOString()) {
                setIsValidDateTime(false);
                setMeeting({ ...meeting, date: null });
            } else {
                setIsValidDateTime(true);
                setDateProvided(true);
                setMeeting({ ...meeting, date: newDate.toISOString() });
            }
        }
    };

    // function to handle change of the state value of the meeting state obj
    const handleChange = (e) => {
        setMeeting({
            ...meeting,
            [e.target.name]: e.target.value,
        });
    };

    // function to handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (meeting.date == null) {
            setDateProvided(false);
            return;
        }
        setShowMeetingModal(true);
        setShowOverlay(true);
    };

    console.log("date", meeting.date);

    // state to control the modal show and dont show
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMeetingModal, setShowMeetingModal] = useState(false);

    // node refs for the modals
    const meetingModalRef = useRef(null);
    const overlayRef = useRef(null);

    const socket = useContext(SocketContext);

    return (
        <>
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
                nodeRef={meetingModalRef}
                in={showMeetingModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <MeetingModal
                    nodeRef={meetingModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowMeetingModal={setShowMeetingModal}
                    setMeeting={setMeeting}
                    meeting={meeting}
                    socket={socket}
                />
            </CSSTransition>
            <h3 className="px-4 py-3 mb-4 rounded-md bg-white shadow">Schedule a meeting</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3">
                    <textarea
                        onChange={handleChange}
                        value={meeting.description}
                        required
                        name="description"
                        id="description"
                        rows={4}
                        placeholder="Meeting description"
                        className="resize-y rounded-md border-gray-300 border focus:ring-0"
                    ></textarea>
                    {meeting.description ? (
                        <h6 className="ml-2 text-gray-500">Meeting description</h6>
                    ) : (
                        ""
                    )}
                </div>

                <div className="flex flex-col mb-3 relative">
                    <input
                        required
                        onChange={handleChange}
                        value={meeting.url}
                        id="url"
                        name="url"
                        type="text"
                        placeholder="Meeting link"
                        className="rounded-lg border-blueGray-300 border focus:ring-0 pr-10"
                    />
                    <div className="absolute top-2.5 right-3">
                        <LinkIcon className="text-gray-500" />
                    </div>
                    {meeting.url ? <h6 className="ml-2 text-gray-500">Meeting url</h6> : ""}
                </div>

                <DTP date={meeting.date} handleDateChange={handleDateChange} />
                {meeting.date ? <h6 className="ml-2 text-gray-500">Meeting date and time</h6> : ""}
                {isValidDateTime ? "" : <h6 className="ml-2 text-red-600">Invalid time</h6>}
                {dateProvided ? "" : <h6 className="ml-2 text-blue-600">Date required</h6>}

                <div className="w-full flex items-center mt-3">
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-x-2 py-1.5 px-2 hover:bg-blue-600 rounded-md text-white bg-blue-500 transition-all disabled:opacity-50"
                    >
                        <EventIcon fontSize="small" />
                        Schedule
                    </button>
                </div>
            </form>
        </>
    );
};

export default MeetingForm;
