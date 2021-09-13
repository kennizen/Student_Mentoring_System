import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { adminGetMentorMentee } from "../../../../actions/admin";

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
        if (id === group.mentorId) {
            setGroup({
                ...group,
                mentorId: "",
            });
            setMentor([]);
        } else if (group.mentorId === "") {
            setGroup({
                ...group,
                mentorId: id,
            });
            setMentor(mentorMenteeDetails.mentors.filter((mentor) => mentor._id === id));
        } else {
            setGroup({
                ...group,
                mentorId: id,
            });
            setMentor(mentorMenteeDetails.mentors.filter((mentor) => mentor._id === id));
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

    console.log(group.mentorId);
    console.log(group.studentIds);
    console.log(mentor);
    console.log(students);

    return (
        <div className="w-screen pl-4 pr-4 pb-4">
            {mentorMenteeDetails === null ? (
                <h1>LOADING...</h1>
            ) : (
                <div className="flex items-center justify-between mt-32">
                    <section className="bg-white h-650 w-1/3 rounded-md shadow-md p-3  overflow-y-auto mr-4">
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
                                        <h2>{mentor.name}</h2>
                                        <h6 className="mb-1">Assitant Proffesor - CSE</h6>
                                        <hr />
                                    </div>
                                    {group.mentorId === mentor._id ? (
                                        <div className="w-6 h-6 rounded-full bg-blue-500 place-self-center flex justify-center items-center">
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
                    <section className="bg-white h-650 w-1/3 rounded-md shadow-md p-3 overflow-y-auto mr-4">
                        {mentorMenteeDetails.students.map((student) => {
                            return (
                                <div
                                    onClick={() => handleSelectedStudent(student._id)}
                                    key={student._id}
                                    className="w-full p-2 grid grid-cols-7 gap-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img
                                        src={student.avatar.url}
                                        alt={student.name}
                                        className="h-9 w-9 place-self-center"
                                    />
                                    <div className="col-span-5">
                                        <h2>{student.name}</h2>
                                        <h6 className="mb-1">Assitant Proffesor - CSE</h6>
                                        <hr />
                                    </div>
                                    {group.studentIds.includes(student._id) ? (
                                        <div className="w-6 h-6 rounded-full bg-blue-500 place-self-center flex justify-center items-center">
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
                    <section className="bg-white h-650 w-1/3 rounded-md shadow-md p-3 overflow-y-auto">
                        {mentor.map((m) => {
                            return (
                                <div
                                    key={m._id}
                                    className="w-full p-2 grid grid-cols-7 gap-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img
                                        src={m.avatar.url}
                                        alt={m.name}
                                        className="h-9 w-9 place-self-center"
                                    />
                                    <div className="col-span-5">
                                        <h2>{m.name}</h2>
                                        <h6 className="mb-1">Assitant Proffesor - CSE</h6>
                                        <hr />
                                    </div>
                                </div>
                            );
                        })}
                        {students.map((s) => {
                            return (
                                <div
                                    key={s._id}
                                    className="w-full p-2 grid grid-cols-7 gap-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img
                                        src={s.avatar.url}
                                        alt={s.name}
                                        className="h-9 w-9 place-self-center"
                                    />
                                    <div className="col-span-5">
                                        <h2>{s.name}</h2>
                                        <h6 className="mb-1">Assitant Proffesor - CSE</h6>
                                        <hr />
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            )}
        </div>
    );
};

export default ManageGroups;
