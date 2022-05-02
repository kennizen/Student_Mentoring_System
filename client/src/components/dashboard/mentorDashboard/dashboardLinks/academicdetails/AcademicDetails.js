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
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import Plus from "../../../../../assets/icons/Plus";

const AcademicDetails = () => {
    useEffect(() => {
        dispatch(studentGetSemesterDetails(history));
        dispatch(studentGetPastEduDetails(history));
    }, []);

    // state variables
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

    const { semData, pastEducation } = useSelector((state) => state.student);

    console.log("semData", semData);
    console.log("past", pastEducation);

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

    const handleShowModal = () => {
        setShowModal(true);
        setShowOverlay(true);
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
        setShowOverlay(true);
    };

    const handleDelSemModal = () => {
        setShowOverlay(true);
        setShowDelModal(true);
    };

    // ref variables
    const overlayRef = useRef(null);
    const academicModalRef = useRef(null);
    const semesterModalRef = useRef(null);
    const semesterModalDelRef = useRef(null);

    // state variables
    const [showOverlay, setShowOverlay] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSemesterModal, setShowSemesterModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [overflow, setOverflow] = useState(true);

    return (
        <div className="w-full h-full relative">
            <div
                className={`w-full h-full pt-4 px-4 ${
                    overflow ? "overflow-y-auto" : "overflow-y-hidden"
                } `}
            >
                <CSSTransition
                    nodeRef={overlayRef}
                    in={showOverlay}
                    timeout={300}
                    classNames="overlay"
                    unmountOnExit
                >
                    <ModalOverlay nodeRef={overlayRef} />
                </CSSTransition>
                <CSSTransition
                    nodeRef={academicModalRef}
                    in={showModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <AcademicModal
                        nodeRef={academicModalRef}
                        setShowOverlay={setShowOverlay}
                        setShowModal={setShowModal}
                        setOverflow={setOverflow}
                        pastDetails={pastDetails}
                        setPastDetails={setPastDetails}
                    />
                </CSSTransition>
                <CSSTransition
                    nodeRef={semesterModalRef}
                    in={showSemesterModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <SemesterModal
                        nodeRef={semesterModalRef}
                        setShowOverlay={setShowOverlay}
                        setShowSemesterModal={setShowSemesterModal}
                        setOverflow={setOverflow}
                        semNo={semNo}
                        setSemesterDetails={setSemesterDetails}
                        setSemesterCourses={setSemesterCourses}
                        semesterCourses={semesterCourses}
                        semesterDetails={semesterDetails}
                    />
                </CSSTransition>
                <CSSTransition
                    nodeRef={semesterModalDelRef}
                    in={showDelModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <SemesterDelModal
                        semNo={semNo}
                        nodeRef={semesterModalDelRef}
                        setShowOverlay={setShowOverlay}
                        setShowDelModal={setShowDelModal}
                        setOverflow={setOverflow}
                    />
                </CSSTransition>

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
                        className="rounded-md text-gray-900 bg-gray-200 w-full p-6 disabled:opacity-50 flex justify-center items-center gap-2 mb-2"
                    >
                        {isLoading ? (
                            <Loading myStyle={"w-6 h-6"} />
                        ) : (
                            <Plus alt={true} myStyle={"w-6 h-6"} />
                        )}
                        Add Semester
                    </button>
                )}
            </div>
        </div>
    );
};

export default AcademicDetails;
