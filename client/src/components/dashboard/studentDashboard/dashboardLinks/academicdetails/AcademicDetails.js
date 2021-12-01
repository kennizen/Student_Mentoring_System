import React from "react";
import PastDetails from "./pastDetails/PastDetails";
import Semester from "./semester/Semester";

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

    return (
        <>
            <div className="w-full h-845 pt-4 px-4 overflow-y-auto">
                <PastDetails />
                {obj.map((sem) => {
                    return <Semester semester={sem.semester} course={sem.courses} />;
                })}
            </div>
        </>
    );
};

export default AcademicDetails;
