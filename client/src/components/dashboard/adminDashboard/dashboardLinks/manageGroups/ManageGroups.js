import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { adminGetMentorMentee, adminSaveGroup } from "../../../../../actions/admin";
import GenPopupMenu from "../../../../modal/GenPopupMenu";
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
    const [toggleMenu, setToggleMenu] = useState(false);

    const progArray = ["Phd", "M.Tech(CSE)", "M.Tech(IT)", "MCA", "B.Tech"];

    // accessing global state for fetching the list of mentors and mentees
    const { mentorMenteeDetails } = useSelector((state) => state.admin);

    console.log("mentor mentee data in manage groups", mentorMenteeDetails);

    useEffect(() => {
        dispatch(adminGetMentorMentee(history));
    }, [dispatch, history]);

    // function to handle the change for setting mentor
    const handleSelectedMentor = (id) => {
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
    };

    // function to handle the change for setting students
    const handleSelectedStudent = (id) => {
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
    };

    // function to save the formed group
    const handleSaveGroup = () => {
        dispatch(adminSaveGroup(group, history));
        setMentor([]);
        setStudents([]);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    };

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

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
                            {/* <div className="mb-1 flex items-center justify-end">
                                <button className="text-gray-600 flex items-center justify-between py-px px-3 mb-1 text-sm hover:bg-gray-300 bg-gray-200 rounded-full">
                                    Department
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </div> */}
                            <div className="h-450 overflow-y-auto">
                                {mentorMenteeDetails.mentors.map((mentor) => {
                                    return (
                                        <div
                                            onClick={() => handleSelectedMentor(mentor._id)}
                                            key={mentor._id}
                                            title={mentor.name}
                                            className="p-2 grid grid-cols-7 gap-2 hover:bg-gray-100 cursor-pointer rounded-md border-gray-200 border-solid border mb-2"
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
                            <div className="mb-1 flex items-center justify-start px-3">
                                <button
                                    onClick={handleToggleMenu}
                                    className="text-gray-600 flex items-center justify-between py-px px-3 mb-1 text-sm hover:bg-gray-300 bg-gray-200 rounded-full relative"
                                >
                                    Programme
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                    <GenPopupMenu
                                        toggleMenu={toggleMenu}
                                        top={8}
                                        right={0}
                                        handleToggleMenu={handleToggleMenu}
                                        itemArray={progArray}
                                    />
                                </button>
                            </div>
                            <div className="h-450 overflow-y-auto grid grid-cols-3 grid-rows-6">
                                {mentorMenteeDetails.students.map((student) => {
                                    return (
                                        <div
                                            onClick={() => handleSelectedStudent(student._id)}
                                            key={student._id}
                                            className="py-2 px-4 grid grid-cols-7 hover:bg-gray-100 cursor-pointer place-self-center rounded-md border-gray-200 border-solid border"
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
                                                src={
                                                    m.avatar.url === ""
                                                        ? `https://avatars.dicebear.com/api/initials/${m.name}.svg`
                                                        : m.avatar.url
                                                }
                                                alt={m.name}
                                                className="h-24 w-24 mb-3 rounded-full"
                                            />
                                            <div className="text-center">
                                                <h2>{m.name}</h2>
                                                <div className="flex items-center justify-between">
                                                    <h6 className="mb-1 select-none">
                                                        Assistant Proffessor
                                                    </h6>
                                                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                                                    <h6>CSE</h6>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bg-white col-span-9 flex flex-col py-2 px-3 rounded-md shadow-md">
                            <div className="place-self-end mr-3">
                                <button
                                    onClick={handleSaveGroup}
                                    disabled={mentor.length === 0 ? true : false}
                                    className="p-2 bg-blue-600 rounded-md text-white flex items-center justify-between disabled:opacity-50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Save
                                </button>
                            </div>
                            <div className="h-450 overflow-y-auto grid grid-cols-3 grid-rows-6">
                                {students.map((s) => {
                                    return (
                                        <div
                                            key={s._id}
                                            onClick={() => handleSelectedStudent(s._id)}
                                            className="py-2 px-4 grid grid-cols-7 hover:bg-gray-100 cursor-pointer place-self-center rounded-md border-gray-200 border-solid border"
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
