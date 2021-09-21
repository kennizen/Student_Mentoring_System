import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { adminGetMentorMentee, adminSaveGroup } from "../../../../../actions/admin";
import MyButton from "../../../../myButton/MyButton";
import ListComponent from "./listComponent/ListComponent";
import TickComponent from "./tickComponent/TickComponent";

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
                studentIds: [],
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
                <div className="w-full mt-32">
                    <div className="grid grid-cols-12 py-3 gap-x-4">
                        <div className="bg-white col-span-3 flex flex-col py-2 px-3 rounded-md shadow-md">
                            <div className="">
                                <h1>top options</h1>
                            </div>
                            <div className="h-450 overflow-y-auto">
                                {mentorMenteeDetails.mentors.map((mentor) => {
                                    return (
                                        <div
                                            onClick={() => handleSelectedMentor(mentor._id)}
                                            key={mentor._id}
                                            title={mentor.name}
                                            className="p-2 grid grid-cols-7 gap-2 hover:bg-gray-100 cursor-pointer rounded-md border-gray-200 border-solid border-2 mb-3"
                                        >
                                            <ListComponent {...mentor} isInGroup={false} />
                                            {group.mentorId === mentor._id ? (
                                                <TickComponent color="#2563EB" isCross={false} />
                                            ) : (
                                                <TickComponent color="" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bg-white col-span-9 flex flex-col py-2 px-3 rounded-md shadow-md">
                            <div className="">
                                <h1>top options</h1>
                            </div>
                            <div className="h-450 overflow-y-auto grid grid-cols-3 grid-rows-5">
                                {mentorMenteeDetails.students.map((student) => {
                                    return (
                                        <div
                                            onClick={() => handleSelectedStudent(student._id)}
                                            key={student._id}
                                            className="py-2 px-4 grid grid-cols-7 gap-3 hover:bg-gray-100 cursor-pointer place-self-center rounded-md border-gray-200 border-solid border-2"
                                        >
                                            <ListComponent {...student} isInGroup={false} />
                                            {group.studentIds.includes(student._id) ? (
                                                <TickComponent color="#2563EB" isCross={false} />
                                            ) : (
                                                <TickComponent color="" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 py-3 gap-x-4">
                        <div className="bg-white col-span-3 py-2 px-3 rounded-md shadow-md">
                            <div className="h-450 flex items-center justify-center">
                                {mentor.map((m) => {
                                    return (
                                        <div key={m._id} className="flex flex-col p-2 items-center">
                                            <img
                                                src={m.avatar.url}
                                                alt={m.name}
                                                className="h-24 w-24 mb-3"
                                            />
                                            <div className="text-center">
                                                <h2>{m.name}</h2>
                                                <h6 className="mb-1">Assitant Proffesor - CSE</h6>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bg-white col-span-9 flex flex-col py-2 px-3 rounded-md shadow-md">
                            <div className="place-self-end mr-3">
                                <MyButton btnText="Save" handlerfunction={handleSaveGroup} />
                            </div>
                            <div className="h-450 overflow-y-auto grid grid-cols-3 grid-rows-5">
                                {students.map((s) => {
                                    return (
                                        <div
                                            key={s._id}
                                            onClick={() => handleSelectedStudent(s._id)}
                                            className="py-2 px-4 grid grid-cols-7 gap-3 hover:bg-gray-100 cursor-pointer place-self-center rounded-md border-gray-200 border-solid border-2"
                                        >
                                            <ListComponent {...s} isInGroup={true} />
                                            <TickComponent color="#DC2610" isCross={true} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGroups;
