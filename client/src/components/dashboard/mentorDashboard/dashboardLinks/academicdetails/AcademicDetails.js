import React, { useState, useEffect, useRef } from "react";
import PastDetails from "./pastDetails/PastDetails";
import Semester from "./semester/Semester";
import AcademicModal from "./academicModal/AcademicModal";
import { useHistory } from "react-router";
import SemesterModal from "./academicModal/SemesterModal";
import { useDispatch, useSelector } from "react-redux";
import {
    studentGetSemesterDetails,
    studentAddSemesterDetails,
    studentGetPastEduDetails,
} from "../../../../../actions/student";
import SemesterDelModal from "./academicModal/SemesterDelModal";
import Loading from "../../../../loading/Loading";

const AcademicDetails = () => {
    // state variables
    const [showModal, setShowModal] = useState(false);
    const [showSemesterModal, setShowSemesterModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [semNo, setSemNo] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [pastDetails, setPastDetails] = useState({
        10: {
            board: "",
            studied: "",
            marks: "",
        },
        12: {
            board: "",
            studied: "",
            marks: "",
        },
    });
    const [semesterDetails, setSemesterDetails] = useState({
        semester: 0,
        courses: [],
    });
    const [semesterCourses, setSemesterCourses] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(studentGetSemesterDetails(history));
        dispatch(studentGetPastEduDetails(history));
    }, [dispatch, history]);

    const { semData, pastEducation } = useSelector((state) => state.student);

    console.log("semData", semData);
    console.log("past", pastEducation);

    // function to show modal
    const handleShowModalFromModal = (setOp, setSc) => {
        setOp("opacity-0");
        setSc("scale-0");
        setTimeout(() => {
            setShowModal(false);
            setShowSemesterModal(false);
            setShowDelModal(false);
        }, 100);
    };

    const handleShowModal = () => {
        setShowModal(true);
        setPastDetails({
            10: {
                board: pastEducation["10"].board,
                studied: pastEducation["10"].studied,
                marks: pastEducation["10"].marks,
            },
            12: {
                board: pastEducation["12"].board,
                studied: pastEducation["12"].studied,
                marks: pastEducation["12"].marks,
            },
        });
    };

    // logic to add semester dynamically
    const mount = useRef();

    useEffect(() => {
        // mount is a reference variable that is set true after first time component renders
        if (!mount.current) {
            mount.current = true;
        } else {
            // if the courses length is 1 that means user is trying to add new semester
            if (
                semesterDetails.courses.length === 1 &&
                semesterDetails.courses[0].code === "" &&
                semesterDetails.courses[0].title === "" &&
                semesterDetails.courses[0].credit === "" &&
                semesterDetails.courses[0].type === "" &&
                semesterDetails.courses[0].grade === ""
            ) {
                dispatch(studentAddSemesterDetails(history, semesterDetails, setIsLoading));
            }
        }
    }, [dispatch, history, semesterDetails]);

    const addSemester = (length) => {
        setSemesterDetails({
            semester: (length += 1),
            courses: [
                {
                    code: "",
                    title: "",
                    credit: "",
                    type: "",
                    grade: "",
                },
            ],
        });
        setIsLoading(true);
    };

    const handleSemesterModal = (index) => {
        if (semData.length !== 0) {
            let tempC = [];
            semData[index].courses.forEach((course) => {
                let temp = {
                    code: course.code,
                    title: course.title,
                    credit: course.credit,
                    type: course.type,
                    grade: course.grade,
                };

                tempC.push(temp);
            });
            setSemesterCourses([...tempC]);
        }
        setShowSemesterModal(true);
    };

    const handleDelSemModal = () => {
        setShowDelModal(true);
    };

    return (
        <div className="w-full relative">
            <div
                className={`w-full h-845 pt-4 px-4 ${
                    overflow ? "overflow-y-auto" : "overflow-y-hidden"
                } `}
            >
                {showModal && (
                    <AcademicModal
                        header="Past Details"
                        handleShowModal={handleShowModalFromModal}
                        setOverflow={setOverflow}
                        pastDetails={pastDetails}
                        setPastDetails={setPastDetails}
                        history={history}
                    />
                )}

                {showSemesterModal && (
                    <SemesterModal
                        handleShowModal={handleShowModalFromModal}
                        setOverflow={setOverflow}
                        semesterCourses={semesterCourses}
                        semesterDetails={semesterDetails}
                        setSemesterCourses={setSemesterCourses}
                        semNo={semNo}
                        setSemesterDetails={setSemesterDetails}
                        history={history}
                    />
                )}

                {showDelModal && (
                    <SemesterDelModal
                        semNo={semNo}
                        handleShowModal={handleShowModalFromModal}
                        b1Text="Cancel"
                        b2Text="Delete"
                        body="If you delete the semester than all the course details for this semester will also be deleted."
                        header="Delete semester details ?"
                        history={history}
                        setOverflow={setOverflow}
                    />
                )}

                <PastDetails
                    handleShowModal={handleShowModal}
                    setOverflow={setOverflow}
                    pastEducation={pastEducation}
                />

                {semData.map((sem, index) => {
                    return (
                        <Semester
                            key={sem._id}
                            semester={sem.semester}
                            courses={sem.courses}
                            index={index}
                            handleSemesterModal={handleSemesterModal}
                            handleDelSemModal={handleDelSemModal}
                            setOverflow={setOverflow}
                            setSemNo={setSemNo}
                            semDataLength={semData.length}
                        />
                    );
                })}

                {semData.length === 10 ? (
                    <div></div>
                ) : (
                    <button
                        onClick={() => addSemester(semData.length)}
                        type="button"
                        className="rounded-md text-gray-900 bg-gray-200 w-full p-6 disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <Loading myStyle={"w-6 h-6"} />
                        ) : (
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
                        )}
                        Add Semester
                    </button>
                )}
            </div>
        </div>
    );
};

export default AcademicDetails;
