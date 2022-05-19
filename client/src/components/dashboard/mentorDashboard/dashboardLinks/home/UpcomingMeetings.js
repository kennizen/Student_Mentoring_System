import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { getMeetings } from "../../../../../actions/meeting";
import ModalOverlay from "../../../../modal/ModalOverlay";
import MeetingDetailsModal from "./meetingModal/MeetingDetailsModal";
import MeetingTile from "./MeetingTile";

const date = new Date();

const UpcomingMeetings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getMeetings(history));
    }, []);

    const { meetings } = useSelector((state) => state.meeting);

    // console.log("meetings", meetings);

    const [selectedMeeting, setSelectedMeeting] = useState(null);

    // modal refs
    const overlayRef = useRef(null);
    const meetingDetailsModalRef = useRef(null);

    // modal states
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);

    // function to handle modal
    const handleModal = (mId) => {
        let i = meetings.findIndex((m) => m._id === mId);
        setSelectedMeeting(meetings[i]);
        setShowMeetingDetailsModal(true);
        setShowOverlay(true);
    };

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
                nodeRef={meetingDetailsModalRef}
                in={showMeetingDetailsModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <MeetingDetailsModal
                    nodeRef={meetingDetailsModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowMeetingDetailsModal={setShowMeetingDetailsModal}
                    selectedMeeting={selectedMeeting}
                />
            </CSSTransition>
            <h4 className="mb-3">Upcoming Meetings</h4>
            <div className="overflow-y-auto h-60 mb-6">
                {meetings?.map((meeting, i) => {
                    if (meeting.date > date.toISOString()) {
                        return (
                            <MeetingTile
                                key={meeting._id}
                                {...meeting}
                                myStyle={"hover:bg-gray-100"}
                                handleModal={handleModal}
                            />
                        );
                    }
                    return "";
                })}
            </div>
            <hr className="bg-gray-200 h-0.5" />
            <h4 className="mb-3 mt-4">Past Meetings</h4>
            <div className="overflow-y-auto h-60">
                {meetings?.map((meeting, i) => {
                    if (meeting.date <= date.toISOString()) {
                        return (
                            <MeetingTile
                                key={meeting._id}
                                {...meeting}
                                myStyle={"bg-gray-100"}
                                handleModal={handleModal}
                            />
                        );
                    }
                    return "";
                })}
            </div>
        </>
    );
};

export default UpcomingMeetings;
