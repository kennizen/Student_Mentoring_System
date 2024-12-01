import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    adminBanUser,
    adminGetInteractions,
    adminGetMentorMentee,
} from "../../../../../actions/admin";
import DotIcon from "../../../../../assets/icons/DotIcon";
import moment from "moment";
import { Chip, Tooltip } from "@mui/material";

const AdminInteractions = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [selected, setSelected] = useState("mentors");
    const [interactions, setInteractions] = useState([]);

    // accessing global state for fetching the list of mentors and mentees
    const {
        mentorMenteeDetails: { mentors, students },
    } = useSelector((state) => state.admin);

    // fetching mentor mentee details
    useEffect(() => {
        dispatch(adminGetMentorMentee(history));
        dispatch(adminGetInteractions(history, setInteractions));
    }, [dispatch, history]);

    // function to handle the tab selection
    const handleSelection = (e) => {
        const selection = e.target.name;
        setSelected(selection);
    };

    // function to handle block user
    const blockUser = (e) => {
        dispatch(adminBanUser(e.target.name));
    };

    console.log("mentor mentee in interactions", mentors, students);

    return (
        <div className="h-full px-10 py-5 w-full overflow-hidden">
            <div className="flex items-center justify-between gap-x-3 w-1/2 mr-auto ml-auto">
                <button
                    name="mentors"
                    onClick={handleSelection}
                    className={`border-2 border-blue-600 py-2 px-3 w-full rounded-full ${selected === "mentors" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                >
                    Mentors
                </button>
                <button
                    name="mentees"
                    onClick={handleSelection}
                    className={` border-2 border-blue-600 py-2 px-3 w-full rounded-full ${selected === "mentees" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                >
                    Mentees
                </button>
                <button
                    name="interactions"
                    onClick={handleSelection}
                    className={` border-2 border-blue-600 py-2 px-3 w-full rounded-full ${selected === "interactions" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                >
                    Interactions
                </button>
            </div>
            <section className="w-full h-9/10 mt-5">
                {selected === "mentors" && (
                    <div
                        onClick={blockUser}
                        className="flex items-start justify-start flex-wrap gap-x-5 gap-y-5"
                    >
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
                                                    ? `https://api.dicebear.com/9.x/personas/svg`
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
                                            className="rounded-md w-full px-2 py-1 bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-600 hover:text-green-50 transition-colors"
                                        >
                                            Unblock user
                                        </button>
                                    ) : (
                                        <button
                                            name={mentor._id}
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
                    <div
                        onClick={blockUser}
                        className="flex items-start justify-start flex-wrap gap-x-5 gap-y-5"
                    >
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
                                                    ? `https://api.dicebear.com/9.x/personas/svg`
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
                                            className="rounded-md w-full px-2 py-1 bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-600 hover:text-green-50 transition-colors"
                                        >
                                            Unblock user
                                        </button>
                                    ) : (
                                        <button
                                            name={student._id}
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
                {selected === "interactions" && (
                    <div className="w-full h-full overflow-y-auto">
                        {interactions.map((int, i) => {
                            return (
                                <div
                                    key={i}
                                    className="w-full shadow p-4 bg-white mb-4 rounded-md flex flex-col gap-y-3"
                                >
                                    <div className="flex items-center justify-start gap-x-4">
                                        <img
                                            src={
                                                int?.mentor?.avatar?.url === ""
                                                    ? `https://api.dicebear.com/9.x/personas/svg`
                                                    : int?.mentor?.avatar?.url
                                            }
                                            alt="img"
                                            className="w-24 h-24 rounded-full"
                                        />
                                        <div className="flex flex-col items-start">
                                            <h4>{`${int?.mentor?.firstname} ${int?.mentor?.middlename} ${int?.mentor?.lastname}`}</h4>
                                            <hr className="w-full h-0.5 bg-gray-500" />
                                            <div className="flex items-center justify-start gap-x-4">
                                                <h6>{int?.mentor?.email}</h6>
                                                <DotIcon alt={true} myStyle={"w-1 h-1"} />
                                                <h6>{int?.mentor?.department}</h6>
                                                <DotIcon alt={true} myStyle={"w-1 h-1"} />
                                                <h6>{int?.mentor?.designation}</h6>
                                                <DotIcon alt={true} myStyle={"w-1 h-1"} />
                                                <h6>{int?.mentor?.phone}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-x-5">
                                        <hr className="h-0.5 bg-gray-500 w-full" />
                                        <h3>Meetings</h3>
                                        <hr className="h-0.5 bg-gray-500 w-full" />
                                    </div>
                                    <div className="flex gap-x-10 flex-wrap gap-y-5 w-full">
                                        {int?.meetings?.map((meet) => {
                                            return (
                                                <div
                                                    key={meet._id}
                                                    className={`flex-grow p-4 w-1/5 border border-gray-500 rounded-md flex flex-col gap-y-4 text-left bg-white`}
                                                >
                                                    <p className="text-gray-600">
                                                        created on -{" "}
                                                        {moment(meet?.createdAt).format("LLL")}
                                                    </p>
                                                    <p className="">{meet?.description}</p>
                                                    <div className="flex items-start justify-between gap-x-3 w-full">
                                                        <span
                                                            style={{
                                                                overflowWrap: "break-word",
                                                                wordWrap: "break-word",
                                                                wordBreak: "break-all",
                                                                WebkitHyphens: "auto",
                                                                msHyphens: "auto",
                                                                MozHyphens: "auto",
                                                                hyphens: "auto",
                                                            }}
                                                            className="text-xs inline-block"
                                                        >
                                                            <a
                                                                className="underline hover:text-blue-500"
                                                                rel="noreferrer"
                                                                target={"_blank"}
                                                                href={meet?.url}
                                                            >
                                                                {meet?.url}
                                                            </a>
                                                        </span>
                                                        <h6 className="flex-shrink-0">
                                                            <span className="text-gray-500">
                                                                Meeting on:
                                                            </span>
                                                            {moment(meet?.date).format(
                                                                "DD/MM/yyyy, h:mm a"
                                                            )}
                                                        </h6>
                                                    </div>
                                                    <div className="w-full flex items-start gap-x-2 flex-wrap">
                                                        {meet?.participants?.map((p, i) => {
                                                            return (
                                                                <Tooltip
                                                                    key={i}
                                                                    arrow
                                                                    title={`${p?.user?.firstname} ${p?.user?.middlename} ${p?.user?.lastname}`}
                                                                >
                                                                    <Chip
                                                                        avatar={
                                                                            <img
                                                                                className="rounded-full"
                                                                                alt="img"
                                                                                src={
                                                                                    p?.user?.avatar
                                                                                        .url === ""
                                                                                        ? `https://api.dicebear.com/9.x/personas/svg`
                                                                                        : p?.user
                                                                                            ?.avatar
                                                                                            .url
                                                                                }
                                                                            />
                                                                        }
                                                                        label={
                                                                            p?.user?.enrollment_no
                                                                        }
                                                                        size="small"
                                                                    />
                                                                </Tooltip>
                                                            );
                                                        })}
                                                    </div>
                                                    {meet?.minutes ? (
                                                        <h5 className="">{meet?.minutes}</h5>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex items-center justify-between gap-x-5">
                                        <hr className="h-0.5 bg-gray-500 w-full" />
                                        <h3>Posts</h3>
                                        <hr className="h-0.5 bg-gray-500 w-full" />
                                    </div>
                                    <div className="flex gap-x-10 flex-wrap gap-y-5 w-full">
                                        {int?.posts?.map((post) => {
                                            return (
                                                <div
                                                    key={post._id}
                                                    className="bg-white mb-5 py-3 px-4 rounded-md border border-gray-500 flex flex-col flex-grow w-1/5"
                                                >
                                                    <p className="mb-3 text-gray-600">
                                                        created on -{" "}
                                                        {moment(post.createdAt).format("LLL")}
                                                    </p>
                                                    <p
                                                        className="mb-4 a-tag break-normal break-words"
                                                        dangerouslySetInnerHTML={{
                                                            __html: `${post.body}`,
                                                        }}
                                                    ></p>
                                                    {post.commentEnabled && (
                                                        <h4 className="flex items-center justify-end">
                                                            Comments {post.commentCount}
                                                        </h4>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
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
