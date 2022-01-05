import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { studentUpdateSemesterDetails } from "../../../../../../actions/student";

const SemesterModal = ({
    handleShowModal,
    setOverflow,
    semesterCourses,
    semesterDetails,
    setSemesterCourses,
    semNo,
    setSemesterDetails,
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

    const handleChange = (e, i) => {
        setIsDisabled(false);
        let formValues = semesterCourses;
        formValues[i][e.target.name] = e.target.value;
        setSemesterCourses([...formValues]);
        setSemesterDetails({
            semester: semNo,
            courses: semesterCourses,
        });
    };

    const addField = () => {
        setSemesterCourses([
            ...semesterCourses,
            { code: "", title: "", credit: "", type: "", grade: "" },
        ]);
    };

    const removeField = (i) => {
        let formValues = semesterCourses;
        formValues.splice(i, 1);
        setSemesterCourses([...formValues]);
        setSemesterDetails({
            semester: semNo,
            courses: semesterCourses,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(studentUpdateSemesterDetails(history, semesterDetails));
        handleShowModal(setOp, setSc);
    };

    console.log("sem details", semesterDetails);
    console.log("sem courses", semesterCourses);

    return (
        <>
            <div
                onClick={() => {
                    handleShowModal(setOp, setSc);
                    setOverflow(true);
                }}
                className={`${op} absolute flex items-center justify-center bg-black w-full top-0 right-0 z-30 transition-opacity h-full`}
            ></div>
            <div
                className={`${sc} absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 max-h-800 overflow-y-auto w-3/4 z-50 p-6 bg-white transition-all rounded-md`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold">{`Semester ${semNo} details`}</h4>
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
                        {semesterCourses.map((course, index) => {
                            return (
                                <div className="grid grid-cols-6 gap-x-7 w-full" key={index}>
                                    <div className="flex flex-col mb-3">
                                        <label htmlFor="code" className="mb-2">
                                            Code
                                        </label>
                                        <input
                                            id="code"
                                            type="text"
                                            name="code"
                                            required
                                            className="rounded-lg border-gray-300"
                                            value={course.code}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </div>
                                    <div className="flex flex-col mb-6">
                                        <label htmlFor="title" className="mb-2">
                                            Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            required
                                            className="rounded-lg border-gray-300"
                                            value={course.title}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </div>
                                    <div className="flex flex-col mb-6">
                                        <label htmlFor="credit" className="mb-2">
                                            Credit
                                        </label>
                                        <input
                                            id="credit"
                                            type="text"
                                            name="credit"
                                            required
                                            className="rounded-lg border-gray-300"
                                            value={course.credit}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </div>
                                    <div className="flex flex-col mb-6">
                                        <label htmlFor="type" className="mb-2">
                                            Type
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            className="rounded-lg border-gray-300"
                                            value={course.type}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                            selected={course.type}
                                        >
                                            <option value="">Select type</option>
                                            <option value="C">C</option>
                                            <option value="E">E</option>
                                            <option value="OE">OE</option>
                                            <option value="Audit">Audit</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col mb-6">
                                        <label htmlFor="grade" className="mb-2">
                                            Grade
                                        </label>
                                        <select
                                            id="grade"
                                            name="grade"
                                            className="rounded-lg border-gray-300"
                                            value={course.grade}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                            selected={course.grade}
                                        >
                                            <option value="">Select grade</option>
                                            <option value="O">O</option>
                                            <option value="A+">A+</option>
                                            <option value="A">A</option>
                                            <option value="B+">B+</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="P">P</option>
                                            <option value="S">S</option>
                                            <option value="F">F</option>
                                            <option value="X">X</option>
                                        </select>
                                    </div>
                                    {semesterCourses.length <= 2 ? (
                                        <div></div>
                                    ) : (
                                        <button
                                            onClick={() => removeField(index)}
                                            type="button"
                                            className="p-2 bg-blue-600 rounded-full text-white disabled:opacity-50 place-self-center mt-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20 12H4"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex items-center justify-between">
                        {semesterCourses.length === 12 ? (
                            <div></div>
                        ) : (
                            <div>
                                <button
                                    onClick={addField}
                                    type="button"
                                    className="p-2 bg-blue-600 rounded-full text-white disabled:opacity-50 mr-5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
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

export default SemesterModal;
