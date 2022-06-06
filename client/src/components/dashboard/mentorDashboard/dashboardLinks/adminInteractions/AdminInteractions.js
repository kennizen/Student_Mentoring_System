import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminBanUser, adminGetMentorMentee } from "../../../../../actions/admin";

const AdminInteractions = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [selected, setSelected] = useState("mentors");

    // accessing global state for fetching the list of mentors and mentees
    const {
        mentorMenteeDetails: { mentors, students },
    } = useSelector((state) => state.admin);

    // fetching mentor mentee details
    useEffect(() => {
        dispatch(adminGetMentorMentee(history));
    }, [dispatch, history]);

    // function to handle the tab selection
    const handleSelection = (e) => {
        const selection = e.target.name;
        setSelected(selection);
    };

    // function to handle block user
    const blockUser = (e) => {
        dispatch(adminBanUser(e.target.name, history));
    };

    console.log("mentor mentee in interactions", mentors, students);

    return (
        <div className="h-full px-10 py-5 w-full">
            <div className="flex items-center justify-between gap-x-3 w-1/2 mr-auto ml-auto mt-24">
                <button
                    name="mentors"
                    onClick={handleSelection}
                    className={`border-2 border-blue-600 py-2 px-3 w-full rounded-full ${
                        selected === "mentors" ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                >
                    Mentors
                </button>
                <button
                    name="mentees"
                    onClick={handleSelection}
                    className={` border-2 border-blue-600 py-2 px-3 w-full rounded-full ${
                        selected === "mentees" ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                >
                    Mentees
                </button>
                <button
                    name="interactions"
                    onClick={handleSelection}
                    className={` border-2 border-blue-600 py-2 px-3 w-full rounded-full ${
                        selected === "interactions" ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                >
                    Interactions
                </button>
            </div>

            <section className="mt-20">
                {selected === "mentors" && (
                    <div className="flex items-start justify-start flex-wrap gap-x-5 gap-y-5">
                        {mentors?.map((mentor) => {
                            return (
                                <div
                                    key={mentor._id}
                                    className="bg-white rounded-md p-3 shadow-sm w-72"
                                >
                                    <div className="flex items-center justify-start mb-3 gap-x-3">
                                        <img
                                            className="h-24 w-24 rounded-full"
                                            src={
                                                mentor.avatar.url === ""
                                                    ? `https://avatars.dicebear.com/api/initials/${mentor.firstname}.svg`
                                                    : mentor.avatar.url
                                            }
                                            alt="img"
                                        />
                                        <div className="">
                                            <h4 className="">{`${mentor.firstname} ${mentor.middlename} ${mentor.lastname}`}</h4>
                                            <h6 className="text-gray-500">{mentor.phone}</h6>
                                            <h6 className="text-gray-500">{mentor.email}</h6>
                                        </div>
                                    </div>

                                    {mentor.isBanned ? (
                                        <button
                                            name={mentor._id}
                                            onClick={blockUser}
                                            className="rounded-md w-full px-2 py-1 bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-600 hover:text-green-50 transition-colors"
                                        >
                                            Unblock user
                                        </button>
                                    ) : (
                                        <button
                                            name={mentor._id}
                                            onClick={blockUser}
                                            className="rounded-md w-full px-2 py-1 bg-red-50 border border-red-600 text-red-600 text-sm hover:bg-red-600 hover:text-red-50 transition-colors"
                                        >
                                            Block user
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
                {selected === "mentees" && (
                    <div className="flex items-start justify-start flex-wrap gap-x-5 gap-y-5">
                        {students?.map((student) => {
                            return (
                                <div
                                    key={student._id}
                                    className="bg-white rounded-md p-3 shadow-sm w-72"
                                >
                                    <div className="flex items-center justify-start mb-3 gap-x-3">
                                        <img
                                            className="h-24 w-24 rounded-full"
                                            src={
                                                student.avatar.url === ""
                                                    ? `https://avatars.dicebear.com/api/initials/${student.firstname}.svg`
                                                    : student.avatar.url
                                            }
                                            alt="img"
                                        />
                                        <div className="">
                                            <h4 className="">{`${student.firstname} ${student.middlename} ${student.lastname}`}</h4>
                                            <h6 className="text-gray-500">{student.phone}</h6>
                                            <h6 className="text-gray-500">{student.email}</h6>
                                        </div>
                                    </div>

                                    {student.isBanned ? (
                                        <button
                                            name={student._id}
                                            onClick={blockUser}
                                            className="rounded-md w-full px-2 py-1 bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-600 hover:text-green-50 transition-colors"
                                        >
                                            Unblock user
                                        </button>
                                    ) : (
                                        <button
                                            name={student._id}
                                            onClick={blockUser}
                                            className="rounded-md w-full px-2 py-1 bg-red-50 border border-red-600 text-red-600 text-sm hover:bg-red-600 hover:text-red-50 transition-colors"
                                        >
                                            Block user
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminInteractions;
