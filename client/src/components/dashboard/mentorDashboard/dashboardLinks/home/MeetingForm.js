import React, { useRef, useState } from "react";
import DTP from "./dtp/DTP";
import EventIcon from "@mui/icons-material/Event";
import LinkIcon from "@mui/icons-material/Link";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import MeetingModal from "./meetingModal/MeetingModal";

const MeetingForm = () => {
    const [date, setDate] = useState(null);
    const [isValidDateTime, setIsValidDateTime] = useState(true);
    const [meeting, setMeeting] = useState({
        participants: [],
        description: "",
        url: "",
        date: null,
    });
    const [disabled, setDisabled] = useState(true);

    // function to handle the date change adn logic to prevent previous date selection
    const handleDateChange = (newDate) => {
        if (newDate === null) {
            setDisabled(true);
            setMeeting({ ...meeting, date: null });
            setDate(newDate);
            setIsValidDateTime(true);
        } else {
            let date = new Date();
            if (newDate.toISOString() < date.toISOString()) {
                setIsValidDateTime(false);
                setDisabled(true);
                setMeeting({ ...meeting, date: null });
            } else {
                setIsValidDateTime(true);
                setDisabled(false);
                setMeeting({ ...meeting, date: newDate.toISOString() });
            }
            setDate(newDate);
        }
    };

    // function to handle change of the state value of the meeting state obj
    const handleChange = (e) => {
        if (meeting.date === null) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        setMeeting({
            ...meeting,
            [e.target.name]: e.target.value,
        });
    };

    // function to handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowMeetingModal(true);
        setShowOverlay(true);
    };

    console.log("date", date);
    console.log("meeting", meeting);

    // state to control the modal show and dont show
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMeetingModal, setShowMeetingModal] = useState(false);

    // node refs for the modals
    const meetingModalRef = useRef(null);
    const overlayRef = useRef(null);

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
                />
            </CSSTransition>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-3">
                    <textarea
                        onChange={handleChange}
                        value={meeting.description}
                        required
                        style={{}}
                        name="description"
                        id="description"
                        rows={2}
                        placeholder="Meeting description"
                        className="resize-none rounded-md border-blueGray-200 border-2 focus:ring-0"
                    ></textarea>
                    {meeting.description ? (
                        <h6 className="ml-2 text-gray-500">Meeting description</h6>
                    ) : (
                        <></>
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
                        placeholder="Meeting link if any"
                        className="rounded-lg border-blueGray-200 border-2 focus:ring-0 pr-10"
                    />
                    <div className="absolute top-2.5 right-3">
                        <LinkIcon className="text-gray-500" />
                    </div>
                    {meeting.url ? <h6 className="ml-2 text-gray-500">Meeting url</h6> : <></>}
                </div>

                <DTP date={date} handleDateChange={handleDateChange} />
                {meeting.date ? (
                    <h6 className="ml-2 text-gray-500">Meeting date and time</h6>
                ) : (
                    <></>
                )}
                {isValidDateTime ? <></> : <h6 className="ml-2 text-red-600">Invalid time</h6>}

                <div className="w-full flex items-end justify-end mt-3">
                    <button
                        disabled={disabled}
                        type="submit"
                        className="flex items-center gap-x-2 py-1 px-2 hover:bg-blue-600 rounded-md text-white bg-blue-500 transition-all disabled:opacity-50"
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
