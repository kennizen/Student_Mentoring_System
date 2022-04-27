import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdatePastEduDetails } from "../../../../../../actions/student";

const AcademicModal = ({
    setShowModal,
    setOverflow,
    pastDetails,
    setPastDetails,
    setShowOverlay,
    nodeRef,
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange10 = (e) => {
        setIsDisabled(false);
        setPastDetails({
            ...pastDetails,
            10: {
                ...pastDetails[10],
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleChange12 = (e) => {
        setIsDisabled(false);
        setPastDetails({
            ...pastDetails,
            12: {
                ...pastDetails[12],
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(studentUpdatePastEduDetails(history, pastDetails));
        handleModalActions();
    };

    const handleModalActions = () => {
        setShowOverlay(false);
        setShowModal(false);
        setOverflow(true);
    };

    console.log(pastDetails);

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 w-1/2 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Past details</h4>
                        <button onClick={handleModalActions} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-1 font-semibold">Class 10 details</h4>
                            <div className="grid grid-cols-3 gap-x-7 w-full">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="board" className="mb-2">
                                        Board
                                    </label>
                                    <input
                                        id="board"
                                        type="text"
                                        name="board"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={pastDetails[10].board}
                                        onChange={handleChange10}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="studied" className="mb-2">
                                        School / University
                                    </label>
                                    <input
                                        id="studied"
                                        type="text"
                                        name="studied"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={pastDetails[10].studied}
                                        onChange={handleChange10}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="marks" className="mb-2">
                                        Marks (grade or percentage)
                                    </label>
                                    <input
                                        id="marks"
                                        type="text"
                                        name="marks"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={pastDetails[10].marks}
                                        onChange={handleChange10}
                                    />
                                </div>
                            </div>
                            <h4 className="mb-1 font-semibold">Class 12 details</h4>
                            <div className="grid grid-cols-3 gap-x-7 w-full">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="board" className="mb-2">
                                        Board
                                    </label>
                                    <input
                                        id="board"
                                        type="text"
                                        name="board"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={pastDetails[12].board}
                                        onChange={handleChange12}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="studied" className="mb-2">
                                        School / University
                                    </label>
                                    <input
                                        id="studied"
                                        type="text"
                                        name="studied"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={pastDetails[12].studied}
                                        onChange={handleChange12}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="marks" className="mb-2">
                                        Marks (grade or percentage)
                                    </label>
                                    <input
                                        id="marks"
                                        type="text"
                                        name="marks"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={pastDetails[12].marks}
                                        onChange={handleChange12}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end">
                            <button
                                onClick={handleModalActions}
                                type="submit"
                                className="p-2 bg-blue-600 rounded-md text-white disabled:opacity-50"
                                disabled={isDisabled}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AcademicModal;
