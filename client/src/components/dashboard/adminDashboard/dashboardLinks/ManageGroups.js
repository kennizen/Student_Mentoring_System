import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { adminGetMentorMentee, adminSaveGroup } from "../../../../actions/admin";

const ManageGroups = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // state variable to save the group state and send to the backend
    const [group, setGroup] = useState({
        mentorId: "",
        studentIds: [],
    });

    // mentor list in third form
    const [mentor, setMentor] = useState([]);
    // mentor list in third form
    const [students, setStudents] = useState([]);

    // accessing global state for fetching the list of mentors and mentees
    const { mentorMenteeDetails } = useSelector((state) => state.admin);

    console.log("mentor mentee data in manage groups", mentorMenteeDetails);

    useEffect(() => {
        dispatch(adminGetMentorMentee(history));
    }, [dispatch, history]);

    // function to handle the change for setting mentor
    function handleSelectedMentor(id) {
        let alreadyAssignedStudents = [];
        let assignedStudentIds = [];

        if (id === group.mentorId) {
            setGroup({
                ...group,
                mentorId: "",
            });
            setMentor([]);
        } else if (group.mentorId === "") {
            setMentor(mentorMenteeDetails.mentors.filter((mentor) => mentor._id === id));
            console.log("running 1");
            for (let i = 0; i < mentorMenteeDetails.students.length; i++) {
                if (id === mentorMenteeDetails.students[i].mentoredBy) {
                    alreadyAssignedStudents.push(mentorMenteeDetails.students[i]);
                    assignedStudentIds.push(mentorMenteeDetails.students[i]._id);
                }
            }
            console.log("already assigned 1", alreadyAssignedStudents);
            setStudents(alreadyAssignedStudents);
            setGroup({
                ...group,
                mentorId: id,
                studentIds: assignedStudentIds,
            });
        } else {
            setMentor(mentorMenteeDetails.mentors.filter((mentor) => mentor._id === id));
            console.log("running 2");
            for (let i = 0; i < mentorMenteeDetails.students.length; i++) {
                if (id === mentorMenteeDetails.students[i].mentoredBy) {
                    alreadyAssignedStudents.push(mentorMenteeDetails.students[i]);
                    assignedStudentIds.push(mentorMenteeDetails.students[i]._id);
                }
            }
            console.log("already assigned 2", alreadyAssignedStudents);
            setStudents(alreadyAssignedStudents);
            setGroup({
                ...group,
                mentorId: id,
                studentIds: assignedStudentIds,
            }); /// just testing the outcome working 30% to make it perfect ///
        }
    }

    // function to handle the change for setting students
    function handleSelectedStudent(id) {
        if (!group.studentIds.includes(id)) {
            setGroup({
                ...group,
                studentIds: [...group.studentIds, id],
            });
            const stu = mentorMenteeDetails.students.find((st) => st._id === id);
            setStudents([...students, stu]);
        } else {
            setGroup({
                ...group,
                studentIds: [...group.studentIds].filter((stuid) => stuid !== id),
            });
            setStudents([...students].filter((student) => student._id !== id));
        }
    }

    // function to save the formed group
    function handleSaveGroup() {
        dispatch(adminSaveGroup(group, history));
        setMentor([]);
        setStudents([]);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    }

    console.log(group.mentorId);
    console.log(group.studentIds);
    console.log(mentor);
    console.log(students);

    return (
        <div className="w-screen pl-4 pr-4 pb-4">
            {mentorMenteeDetails === null ? (
                <h1>LOADING...</h1>
            ) : (
                <div className="grid grid-cols-12 grid-rows-2 mt-32 gap-y-4">
                    <section className="bg-white h-450 rounded-md shadow-md p-3 overflow-y-auto mr-4 col-span-3">
                        {mentorMenteeDetails.mentors.map((mentor) => {
                            return (
                                <div
                                    onClick={() => handleSelectedMentor(mentor._id)}
                                    key={mentor._id}
                                    className="w-full p-2 grid grid-cols-7 gap-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img
                                        src={mentor.avatar.url}
                                        alt={mentor.name}
                                        className="h-9 w-9 place-self-center"
                                    />
                                    <div className="col-span-5">
                                        <h2 className="select-none">{mentor.name}</h2>
                                        <h6 className="mb-1 select-none">
                                            Assistant Proffessor - CSE
                                        </h6>
                                        <hr />
                                    </div>
                                    {group.mentorId === mentor._id ? (
                                        <div className="w-6 h-6 rounded-full bg-blue-600 place-self-center flex justify-center items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="#ffffff"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            );
                        })}
                    </section>
                    <section
                        className={`bg-white h-450 rounded-md shadow-md p-3 overflow-y-auto grid grid-cols-3 grid-rows-6 col-span-9`}
                    >
                        {group.mentorId === "" ? (
                            <p className="col-span-3 row-span-6 place-self-center">
                                Select a mentor to view the student list
                            </p>
                        ) : (
                            mentorMenteeDetails.students.map((student) => {
                                return (
                                    <div
                                        onClick={() => handleSelectedStudent(student._id)}
                                        key={student._id}
                                        className="w-full p-2 grid grid-cols-7 gap-2 place-content-center hover:bg-gray-100 cursor-pointer"
                                    >
                                        <img
                                            src={student.avatar.url}
                                            alt={student.name}
                                            className="h-9 w-9 place-self-center"
                                        />
                                        <div className="col-span-5">
                                            <h2 className="select-none">{student.name}</h2>
                                            <h6 className="mb-1 select-none">
                                                Assitant Proffesor - CSE
                                            </h6>
                                            <hr />
                                        </div>
                                        {group.studentIds.includes(student._id) ? (
                                            <div className="w-6 h-6 rounded-full bg-blue-600 place-self-center flex justify-center items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="#ffffff"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </section>
                    <div className="row-start-2 col-span-12">
                        <section
                            className={`bg-white h-450 rounded-md shadow-md p-3 overflow-y-auto grid grid-cols-12`}
                        >
                            {group.mentorId === "" ? (
                                <p className="col-span-12 place-self-center">
                                    Select a mentor to view the group
                                </p>
                            ) : (
                                <>
                                    <div className="col-span-3 grid grid-cols-1 place-content-center">
                                        {mentor.map((m) => {
                                            return (
                                                <div key={m._id}>
                                                    <div className="w-full p-2 flex flex-col mb-5">
                                                        <img
                                                            src={m.avatar.url}
                                                            alt={m.name}
                                                            className="h-18 w-18 place-self-center"
                                                        />
                                                        <div className="text-center">
                                                            <h2>{m.name}</h2>
                                                            <h6 className="mb-1">
                                                                Assitant Proffesor - CSE
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="col-span-9 grid grid-cols-3 grid-rows-6">
                                        {students.length === 0 && group.mentorId !== "" ? (
                                            <p className="col-span-3 place-self-center row-span-6">
                                                No Mentees assigned
                                            </p>
                                        ) : (
                                            students.map((s) => {
                                                return (
                                                    <div
                                                        key={s._id}
                                                        className="w-full p-2 grid grid-cols-7 place-content-center gap-2"
                                                    >
                                                        <img
                                                            src={s.avatar.url}
                                                            alt={s.name}
                                                            className="h-9 w-9 place-self-center"
                                                        />
                                                        <div className="col-span-4">
                                                            <h2 className="select-none">
                                                                {s.name}
                                                            </h2>
                                                            <h6 className="mb-1 select-none">
                                                                Assitant Proffesor - CSE
                                                            </h6>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </>
                            )}
                        </section>
                        {group.mentorId !== "" && students.length !== 0 ? (
                            <div className="relative">
                                <button
                                    onClick={handleSaveGroup}
                                    className="bg-blue-600 absolute -top-12 right-9 rounded-md pl-3 pr-3 pt-2 pb-2 flex items-center text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="#ffffff"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                        />
                                    </svg>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGroups;
