import React, { useState } from "react";
import PastDetails from "./pastDetails/PastDetails";
import Semester from "./semester/Semester";
import AcademicModal from "./academicModal/AcademicModal";
import { useHistory } from "react-router";

const AcademicDetails = () => {
    //dummy
    const obj = [
        {
            semester: 1,
            student_id: 1,
            courses: [
                {
                    code: 123,
                    title: "CN",
                    credit: 3,
                    type: "C",
                    grade: "B+",
                },
            ],
        },
        {
            semester: 2,
            student_id: 1,
            courses: [
                {
                    code: 234,
                    title: "CN Lab",
                    credit: 3,
                    type: "C",
                    grade: "B+",
                },
            ],
        },
        {
            semester: 3,
            student_id: 1,
            courses: [
                {
                    code: 345,
                    title: "OS",
                    credit: 3,
                    type: "C",
                    grade: "B+",
                },
            ],
        },
        {
            semester: 4,
            student_id: 1,
            courses: [
                {
                    code: 456,
                    title: "OS Lab",
                    credit: 2,
                    type: "C",
                    grade: "B+",
                },
            ],
        },
        {
            semester: 5,
            student_id: 1,
            courses: [
                {
                    code: 567,
                    title: "AI",
                    credit: 3,
                    type: "E",
                    grade: "B+",
                },
            ],
        },
        {
            semester: 6,
            student_id: 1,
            courses: [
                {
                    code: 678,
                    title: "IOT",
                    credit: 2,
                    type: "E",
                    grade: "A+",
                },
            ],
        },
    ];

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

    const [showModal, setShowModal] = useState(false);
    const [overflow, setOverflow] = useState(true);
    const history = useHistory();

    // function to show modal
    const handleShowModalFromModal = (setOp, setSc) => {
        setOp("opacity-0");
        setSc("scale-0");
        setTimeout(() => {
            setShowModal(false);
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

    return (
        <>
            <div
                className={`w-full h-845 pt-4 px-4 ${
                    overflow ? "overflow-y-auto" : "overflow-y-hidden"
                } relative`}
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
                <PastDetails
                    handleShowModal={handleShowModal}
                    setOverflow={setOverflow}
                    stuPastDetails={stuPastDetails}
                />
                {obj.map((sem) => {
                    return (
                        <Semester key={sem.semester} semester={sem.semester} course={sem.courses} />
                    );
                })}
            </div>
        </>
    );
};

export default AcademicDetails;
