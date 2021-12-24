import React, { useState, useEffect } from "react";
import PastDetails from "./pastDetails/PastDetails";
import Semester from "./semester/Semester";
import AcademicModal from "./academicModal/AcademicModal";
import { useHistory } from "react-router";
import SemesterModal from "./academicModal/SemesterModal";
import { useDispatch, useSelector } from "react-redux";
import { studentGetSemesterDetails } from "../../../../../actions/student";

const AcademicDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSemesterModal, setShowSemesterModal] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const [semNo, setSemNo] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(studentGetSemesterDetails(history));
    }, [dispatch, history]);

    const { semData } = useSelector((state) => state.student);

    console.log("semData", semData);

    const [obj, setObj] = useState([]);

    const stuPastDetails = {
        10: {
            class: "Class 10",
            board: "SEBA",
            studied: "A - New High School",
            marks: "85.7 %",
        },
        12: {
            class: "Class 12",
            board: "AHSEC",
            studied: "Salt Brook Academy",
            marks: "75.5 %",
        },
    };

    const [pastDetails, setPastDetails] = useState({
        10: {
            class: "",
            board: "",
            studied: "",
            marks: "",
        },
        12: {
            class: "",
            board: "",
            studied: "",
            marks: "",
        },
    });

    const [semesterDetails, setSemesterDetails] = useState({
        semester: 0,
        courses: [],
    });

    const [semesterCourses, setSemesterCourses] = useState([
        {
            code: "",
            title: "",
            credit: 0,
            type: "",
            grade: "",
        },
    ]);

    // function to show modal
    const handleShowModalFromModal = (setOp, setSc) => {
        setOp("opacity-0");
        setSc("scale-0");
        setTimeout(() => {
            setShowModal(false);
            setShowSemesterModal(false);
        }, 100);
    };

    const handleShowModal = () => {
        setShowModal(true);
        setPastDetails({
            10: {
                class: stuPastDetails[10].class,
                board: stuPastDetails[10].board,
                studied: stuPastDetails[10].studied,
                marks: stuPastDetails[10].marks,
            },
            12: {
                class: stuPastDetails[12].class,
                board: stuPastDetails[12].board,
                studied: stuPastDetails[12].studied,
                marks: stuPastDetails[12].marks,
            },
        });
    };

    const addSemester = (len) => {
        if (obj.length > 1) {
            setObj([
                ...obj,
                {
                    semester: (obj.length += 1),
                    courses: [
                        {
                            code: "",
                            title: "",
                            credit: 0,
                            type: "",
                            grade: "",
                        },
                    ],
                },
            ]);
        } else {
            semData.map((sem) => {
                return setObj((state) => [
                    ...state,
                    {
                        semester: sem.semester,
                        courses: sem.courses,
                    },
                ]);
            });
            setObj((state) => [
                ...state,
                {
                    semester: (len += 1),
                    courses: [
                        {
                            code: "",
                            title: "",
                            credit: 0,
                            type: "",
                            grade: "",
                        },
                    ],
                },
            ]);
        }
    };

    console.log("obj", obj);

    const removeSemester = (i) => {
        let formValues = obj;
        formValues.splice(i, 1);
        setObj([...formValues]);
    };

    const handleSemesterModal = (i) => {
        if (semData !== 0) {
            let tempCourses = semData[i]?.courses;
            if (tempCourses === undefined) {
                tempCourses = [];
                setSemesterCourses([...tempCourses]);
            } else {
                setSemesterCourses([...tempCourses]);
            }
        }
        setShowSemesterModal(true);
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

                <PastDetails
                    handleShowModal={handleShowModal}
                    setOverflow={setOverflow}
                    stuPastDetails={stuPastDetails}
                />

                {obj.length <= 1
                    ? semData.map((sem, index) => {
                          return (
                              <Semester
                                  key={sem.semester}
                                  semester={sem.semester}
                                  courses={sem.courses}
                                  handleSemesterModal={handleSemesterModal}
                                  setOverflow={setOverflow}
                                  setSemNo={setSemNo}
                                  removeSemester={removeSemester}
                                  index={index}
                              />
                          );
                      })
                    : obj.map((sem, index) => {
                          return (
                              <Semester
                                  key={sem.semester}
                                  semester={sem.semester}
                                  courses={sem.courses}
                                  handleSemesterModal={handleSemesterModal}
                                  setOverflow={setOverflow}
                                  setSemNo={setSemNo}
                                  removeSemester={removeSemester}
                                  index={index}
                              />
                          );
                      })}

                <button
                    onClick={() => addSemester(semData.length)}
                    type="button"
                    className="rounded-md text-gray-900 bg-gray-200 w-full p-6 disabled:opacity-50 flex justify-center align-middle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-6"
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
                    Add Semester
                </button>
            </div>
        </div>
    );
};

export default AcademicDetails;
