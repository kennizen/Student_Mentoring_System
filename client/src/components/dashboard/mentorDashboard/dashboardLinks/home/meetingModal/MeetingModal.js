import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMeeting } from "../../../../../../actions/meeting";
import { mentorGetAllMentees } from "../../../../../../actions/mentor";
import ChatTiles from "../../chat/chatModal/ChatTiles";

const MeetingModal = ({ nodeRef, setShowOverlay, setShowMeetingModal, setMeeting, meeting }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [mentees, setMentees] = useState([]);

    useEffect(() => {
        dispatch(mentorGetAllMentees(history, setMentees));
    }, []);

    // function to hide modal from within the modal
    const handleHideModalOperations = () => {
        setShowOverlay(false);
        setShowMeetingModal(false);
        setMeeting({ ...meeting, participants: [] });
        handleMeetingSubmission();
    };

    // function to add and remove the chat ids from the state variable chatIds
    const handleChange = (e) => {
        const checked = e.target.checked;
        const id = e.target.id;
        if (checked) {
            setMeeting((prevState) => ({
                ...prevState,
                participants: [...prevState.participants, id],
            }));
        } else {
            const newSelections = meeting.participants.filter(
                (menteeId) => menteeId.toString() !== id.toString()
            );
            setMeeting((prevState) => ({
                ...prevState,
                participants: newSelections,
            }));
        }
    };

    // function to schedule the meeting
    const handleMeetingSubmission = () => {
        dispatch(createMeeting(meeting, history));
    };

    console.log(mentees);

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Select participants</h4>
                        <button onClick={handleHideModalOperations} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <h5 className="mb-3">Selected - {meeting.participants.length}</h5>
                    <div className="flex items-center flex-wrap justify-start gap-x-3">
                        {mentees.map((mentee) => {
                            return (
                                <ChatTiles
                                    key={mentee._id}
                                    mentee={mentee}
                                    handleChange={handleChange}
                                />
                            );
                        })}
                    </div>

                    <div className="w-full flex items-center justify-end">
                        <button
                            disabled={meeting.participants.length > 0 ? false : true}
                            onClick={handleHideModalOperations}
                            type="submit"
                            className="mt-3 py-1 px-2 hover:bg-blue-600 rounded-md text-white bg-blue-500 transition-all disabled:opacity-50"
                        >
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingModal;
