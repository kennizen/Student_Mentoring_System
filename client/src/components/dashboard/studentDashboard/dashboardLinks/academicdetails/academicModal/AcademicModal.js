import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { studentUpdatePastEduDetails } from "../../../../../../actions/student";

const AcademicModal = ({
    header,
    handleShowModal,
    setOverflow,
    pastDetails,
    setPastDetails,
    history,
}) => {
    const [op, setOp] = useState("opacity-0");
    const [sc, setSc] = useState("scale-0");
    const [isDisabled, setIsDisabled] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setOp("opacity-50");
            setSc("scale-100");
        }, 0);
    }, []);

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
        handleShowModal(setOp, setSc);
    };

    console.log(pastDetails);

    return (
        <>
            <div
                onClick={() => {
                    handleShowModal(setOp, setSc);
                    setOverflow(true);
                }}
                className={`${op} absolute flex items-center justify-center bg-black w-full h-full top-0 right-0 z-30 transition-opacity`}
            ></div>
            <div
                className={`${sc} absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 max-h-500 overflow-y-auto w-3/4 z-50 p-6 bg-white transition-all rounded-md`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold">{header}</h4>
                    <button
                        onClick={() => {
                            handleShowModal(setOp, setSc);
                            setOverflow(true);
                        }}
                        className="text-2xl"
                    >
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
                            onClick={() => setOverflow(true)}
                            type="submit"
                            className="p-2 bg-blue-600 rounded-md text-white disabled:opacity-50"
                            disabled={isDisabled}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AcademicModal;
