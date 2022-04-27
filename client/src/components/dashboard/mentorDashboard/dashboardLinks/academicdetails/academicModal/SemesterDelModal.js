import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentDeleteSemesterDetails } from "../../../../../../actions/student";

const SemesterDelModal = ({ semNo, setOverflow, nodeRef, setShowOverlay, setShowDelModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        dispatch(studentDeleteSemesterDetails(history, { sem: semNo }));
        handleModalActions();
    };

    const handleModalActions = () => {
        setOverflow(true);
        setShowOverlay(false);
        setShowDelModal(false);
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Delete semester</h4>
                        <button onClick={handleModalActions} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <p>Are you sure you want to delete the semester details?</p>

                    <div className="w-full flex items-center justify-end">
                        <button
                            onClick={handleModalActions}
                            type="submit"
                            className="p-2 hover:bg-gray-200 rounded-md text-gray-600 mt-5 mr-3 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            type="submit"
                            className="p-2 hover:bg-red-300 rounded-md text-gray-800 mt-5 bg-red-200 transition-all"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SemesterDelModal;
