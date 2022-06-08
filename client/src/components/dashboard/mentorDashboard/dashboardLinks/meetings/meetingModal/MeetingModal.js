import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMeeting, updateMeeting } from "../../../../../../actions/meeting";
import MeetingChip from "../meetingChip/MeetingChip";

const MeetingModal = ({
    nodeRef,
    setShowOverlay,
    setShowMeetingModal,
    setMeeting,
    meeting,
    socket,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // function to hide modal from within the modal
    const handleHideModalOperations = () => {
        setShowOverlay(false);
        setShowMeetingModal(false);
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
    const handleCreateMeeting = (e) => {
        const name = e.target.name;
        if (name === "update") {
            dispatch(updateMeeting(history, meeting, socket));
        } else {
            dispatch(createMeeting(history, meeting, socket));
        }
        handleHideModalOperations();
        setMeeting({
            id: "",
            participants: [],
            description: "",
            url: "",
            date: null,
        });
    };

    const { mentees } = useSelector((state) => state.mentor);

    console.log("mentees", mentees);

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
                        {mentees.length > 0 &&
                            mentees.map((mentee) => {
                                return (
                                    <MeetingChip
                                        key={mentee._id}
                                        mentee={mentee}
                                        participants={meeting.participants}
                                        handleChange={handleChange}
                                    />
                                );
                            })}
                    </div>

                    <div className="w-full flex items-center justify-end gap-x-4">
                        {meeting.id !== "" && (
                            <button
                                name="update"
                                disabled={meeting.participants.length > 0 ? false : true}
                                onClick={handleCreateMeeting}
                                type="submit"
                                className="mt-3 py-1 px-2 hover:bg-blue-600 rounded-md text-white bg-blue-500 transition-all disabled:opacity-50"
                            >
                                Update
                            </button>
                        )}
                        <button
                            name="createNew"
                            disabled={meeting.participants.length > 0 ? false : true}
                            onClick={handleCreateMeeting}
                            type="submit"
                            className="mt-3 py-1 px-2 hover:bg-blue-600 rounded-md text-white bg-blue-500 transition-all disabled:opacity-50"
                        >
                            Create new
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingModal;
