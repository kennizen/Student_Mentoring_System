import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { mentorGetAllMenteeSemesters } from "../../../../../../actions/mentor";
import MenteeDetailsTile from "./menteeDetailsTile/MenteeDetailsTile";

const MenteeTile = ({ slno, mentee, history }) => {
    const dispatch = useDispatch();

    // state variable to show the extended details view of the mentee
    const [showDetails, setShowDetails] = useState(false);
    // state variable to store the fetched semesters for the mentee
    const [semesters, setSemesters] = useState([]);

    console.log("semesters", semesters);

    return (
        <>
            <div className="hover:shadow-md transition-shadow duration-200 grid grid-cols-custom rounded-md py-2 px-2 mt-3 bg-white shadow-sm items-center">
                <div>
                    <h5>{slno}</h5>
                </div>

                <div className="flex justify-start items-center">
                    <div className="mr-2">
                        <img
                            className="h-9 w-9 rounded-full"
                            src={
                                mentee.avatar.url === ""
                                    ? `https://avatars.dicebear.com/api/initials/${mentee.firstname}.svg`
                                    : mentee.avatar.url
                            }
                            alt="img"
                        />
                    </div>
                    <div>
                        <h5>{`${mentee.firstname} ${mentee.middlename} ${mentee.lastname}`}</h5>
                    </div>
                </div>
                <div>
                    <h5 className="">{mentee.enrollment_no}</h5>
                </div>
                <div className="col-span-2">
                    <h5>{mentee.address}</h5>
                </div>
                <div>
                    <h5>{mentee.department}</h5>
                </div>
                <div>
                    <h5>{mentee.semester}</h5>
                </div>
                <div>
                    <h5>{mentee.phone_no}</h5>
                </div>
                <div className="flex justify-start items-center">
                    <button className="p-2 bg-gray-100 rounded-lg mr-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                    </button>
                    {showDetails === false ? (
                        <button
                            onClick={() => {
                                setShowDetails(true);
                                dispatch(
                                    mentorGetAllMenteeSemesters(history, setSemesters, mentee._id)
                                );
                            }}
                            className="p-2 bg-gray-100 rounded-lg"
                        >
                            <svg
                                className="h-4 w-4"
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
                    ) : (
                        <button
                            onClick={() => setShowDetails(false)}
                            className="p-2 bg-gray-100 rounded-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            {showDetails && <MenteeDetailsTile mentee={mentee} semesters={semesters} />}
        </>
    );
};

export default MenteeTile;
