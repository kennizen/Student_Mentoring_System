import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdateSemesterDetails } from "../../../../../../actions/student";
import MinusSmIcon from "../../../../../../assets/icons/MinusSmIcon";
import Plus from "../../../../../../assets/icons/Plus";

const SemesterModal = ({
    nodeRef,
    setShowOverlay,
    setShowSemesterModal,
    setOverflow,
    semNo,
    setSemesterDetails,
    semesterCourses,
    semesterDetails,
    setSemesterCourses,
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e, i) => {
        setIsDisabled(false);
        let formValues = semesterCourses;
        formValues[i][e.target.name] = e.target.value;
        setSemesterCourses([...formValues]);
        if (
            semesterCourses.length === 1 &&
            semesterCourses[0].code === "" &&
            semesterCourses[0].title === "" &&
            semesterCourses[0].credit === "" &&
            semesterCourses[0].type === "" &&
            semesterCourses[0].grade === ""
        )
            return;
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
        if (
            semesterCourses.length === 1 &&
            semesterCourses[0].code === "" &&
            semesterCourses[0].title === "" &&
            semesterCourses[0].credit === "" &&
            semesterCourses[0].type === "" &&
            semesterCourses[0].grade === ""
        )
            return;
        setSemesterDetails({
            semester: semNo,
            courses: semesterCourses,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(studentUpdateSemesterDetails(history, semesterDetails));
    };

    const handleModalActions = () => {
        setShowOverlay(false);
        setShowSemesterModal(false);
        setOverflow(true);
    };

    console.log("sem details", semesterDetails);
    console.log("sem courses", semesterCourses);

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 w-9/12 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Past details</h4>
                        <button onClick={handleModalActions} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-start justify-center">
                            {semesterCourses.map((course, index) => {
                                return (
                                    <div className="grid grid-cols-5 gap-x-7 w-full" key={index}>
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
                                                type="number"
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
                                                <option value="Minor Project">Minor Project</option>
                                                <option value="Major Project">Major Project</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between mb-6">
                                            <div className="flex flex-col">
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

                                            {semesterCourses.length > 1 ? (
                                                <button
                                                    onClick={() => removeField(index)}
                                                    type="button"
                                                    className="p-2 bg-blue-600 rounded-full text-white disabled:opacity-50 place-self-end mt-2"
                                                >
                                                    <MinusSmIcon alt={true} myStyle={"w-6 h-6"} />
                                                </button>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
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
                                        <Plus alt={true} myStyle={"w-6 h-6"} />
                                    </button>
                                </div>
                            )}
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

export default SemesterModal;
