import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MenteeTile from "./menteeTile/MenteeTile";

const MenteeInfo = () => {
    const history = useHistory();
    // temporary array to store the filtered results of the search
    const [tempList, setTempList] = useState([]);

    const { mentees } = useSelector((state) => state.mentor);

    // search function to search for mentees
    const handleSearch = (e) => {
        let value = e.target.value;
        let temp = [];

        mentees.forEach((mentee) => {
            if (mentee["firstname"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["lastname"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["address"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["enrollment_no"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["department"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["semester"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            }
        });

        // setting mentees for the temp list
        setTempList(temp);
    };

    // sorting function to sort according to name, roll and semester
    const sortBasedOnTerm = (e) => {
        let term = e.target.name;
        let temp = mentees;

        temp.sort((a, b) => {
            if (term === "name") {
                if (a.firstname === b.firstname) {
                    return a.lastname.toLowerCase() > b.lastname.toLowerCase() ? 1 : -1;
                } else {
                    return a.firstname.toLowerCase() > b.firstname.toLowerCase() ? 1 : -1;
                }
            } else if (term === "roll") {
                return a.enrollment_no.toLowerCase() > b.enrollment_no.toLowerCase() ? 1 : -1;
            } else {
                return a.semester.toLowerCase() > b.semester.toLowerCase() ? 1 : -1;
            }
        });

        // setting the tempList to the sorted mentee list
        setTempList([...temp]);
    };

    return (
        <div className="h-full w-full px-5 py-5">
            <div className="w-full p-3 rounded-md h-full">
                <div className="w-full mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="font-medium mb-3">Mentee Information</h2>
                        <h5 className="font-light flex justify-start items-center">
                            <p className=" mr-1">{mentees.length}</p> mentees found
                        </h5>
                    </div>
                    <div className="flex justify-end items-end">
                        <div className="relative">
                            <input
                                onChange={handleSearch}
                                type="text"
                                className="pl-11 rounded-full xl:w-96 border-0 shadow-md"
                                placeholder="Search anything..."
                            />
                            <div className="absolute top-2.5 left-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-custom bg-white rounded-md py-1 px-2 mb-2 mr-2">
                    <div className="flex justify-start items-center">
                        <h5 className="">Sl No.</h5>
                    </div>
                    <div className="">
                        <button
                            name="name"
                            onClick={sortBasedOnTerm}
                            className=" flex justify-between items-center text-sm gap-1 py-1 rounded-md"
                        >
                            Name
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                className="svg-inline--fa fa-caret-down fa-w-10 w-4 h-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="">
                        <button
                            name="roll"
                            onClick={sortBasedOnTerm}
                            className=" flex justify-between items-center text-sm gap-1 py-1 rounded-md"
                        >
                            Roll No.
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                className="svg-inline--fa fa-caret-down fa-w-10 w-4 h-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div className="col-span-2 flex justify-start items-center">
                        <h5 className="">Address</h5>
                    </div>
                    <div className="flex justify-start items-center">
                        <h5 className="">Department</h5>
                    </div>
                    <div className="">
                        <button
                            name="semester"
                            onClick={sortBasedOnTerm}
                            className=" flex justify-between items-center text-sm gap-1 py-1 rounded-md"
                        >
                            Semester
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                className="svg-inline--fa fa-caret-down fa-w-10 w-4 h-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-start items-center">
                        <h5 className="">Mobile No.</h5>
                    </div>
                    <div className="flex justify-start items-center">
                        <h5 className="">Actions</h5>
                    </div>
                </div>
                <div className="h-4/5 overflow-y-auto pr-2">
                    {mentees.length === 0 ? (
                        <></>
                    ) : tempList.length === 0 ? (
                        mentees.map((mentee, index) => {
                            return (
                                <MenteeTile
                                    key={index}
                                    slno={index + 1}
                                    mentee={mentee}
                                    history={history}
                                />
                            );
                        })
                    ) : (
                        tempList.map((mentee, index) => {
                            return (
                                <MenteeTile
                                    key={index}
                                    slno={index + 1}
                                    mentee={mentee}
                                    history={history}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenteeInfo;
