import React from "react";
import MenteeTile from "../MenteeTile";

const ViewModal = ({
    nodeRef,
    selectedMentor,
    setShowOverlay,
    setShowViewModal,
    viewMentees,
    group,
    handleSelection,
    setGroup,
    handleRemoveMentees,
}) => {
    const handleActions = () => {
        setShowOverlay(false);
        setShowViewModal(false);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    };

    const handleChange = (e) => {
        handleSelection(selectedMentor._id, e.target.id);
    };

    return (
        <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
            <div
                ref={nodeRef}
                className="max-h-500 w-1/2 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
            >
                <div className="flex items-center justify-between mb-3">
                    <h4 className="mr-5">
                        Assigned mentees to
                        {` ${selectedMentor.firstname} ${selectedMentor.middlename} ${selectedMentor.lastname}`}
                    </h4>
                    <button onClick={handleActions} className="text-2xl">
                        &times;
                    </button>
                </div>

                <h5 className="mb-2">Selected - {group.studentIds.length}</h5>

                <div className="flex items-start justify-start gap-x-3 gap-y-3 flex-wrap">
                    {viewMentees.map((mentee) => {
                        return (
                            <MenteeTile
                                key={mentee._id}
                                mentee={mentee}
                                handleChange={handleChange}
                            />
                        );
                    })}
                </div>

                <div className="w-full mt-2 flex items-center justify-end">
                    <button
                        onClick={handleRemoveMentees}
                        disabled={group.studentIds.length === 0 ? true : false}
                        className="flex items-center justify-between py-2 px-4 rounded-md bg-red-600 hover:bg-red-800 transition-colors text-white disabled:opacity-50"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
