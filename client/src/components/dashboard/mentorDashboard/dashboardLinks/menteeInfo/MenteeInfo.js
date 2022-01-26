import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mentorGetAllMentees } from "../../../../../actions/mentor";
import MenteeTile from "./menteeTile/MenteeTile";

const MenteeInfo = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [mentees, setMentees] = useState([]);

    // temporary array to store the filtered results of the search
    const [tempList, setTempList] = useState([]);

    // func to set all the mentees fetched from db
    const setAllMentees = (mentees) => {
        setMentees(mentees);
    };

    useEffect(() => {
        dispatch(mentorGetAllMentees(history, setAllMentees));
    }, [dispatch, history]);

    // search function to search for mentees
    const handleSearch = (e) => {
        console.log(e.target.value);
        let value = e.target.value;
        let temp = [];

        mentees.forEach((mentee) => {
            if (mentee["firstname"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["lastname"].toString().toLowerCase().indexOf(value) > -1) {
                temp.push(mentee);
            } else if (mentee["address"].toString().toLowerCase().indexOf(value) > -1) {
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

    return (
        <div className="h-845 w-full px-5 py-5">
            <div className="w-full bg-gray-100 p-3 rounded-md shadow-md h-800 overflow-y-auto">
                <div className="w-full flex items-start justify-between">
                    <div>
                        <h2 className="font-medium mb-3">Mentee Information</h2>
                        <h5 className="font-light mb-10 flex justify-start items-center">
                            <p className="font-semibold mr-1">{mentees.length}</p> mentees found
                        </h5>
                    </div>
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <input
                                onChange={(e) => handleSearch(e)}
                                type="search"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleSearch"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-custom bg-white rounded-md py-1 px-2">
                    <div className="flex justify-start items-center">
                        <h5 className="font-semibold">Sl No.</h5>
                    </div>
                    <div className="">
                        <button className="font-semibold flex justify-between items-center text-sm gap-1 py-1 rounded-md">
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
                        <button className="font-semibold flex justify-between items-center text-sm gap-1 py-1 rounded-md">
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
                        <h5 className="font-semibold">Address</h5>
                    </div>
                    <div className="flex justify-start items-center">
                        <h5 className="font-semibold">Department</h5>
                    </div>
                    <div className="">
                        <button className="font-semibold flex justify-between items-center text-sm gap-1 py-1 rounded-md">
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
                        <h5 className="font-semibold">Mobile No.</h5>
                    </div>
                    <div className="flex justify-start items-center">
                        <h5 className="font-semibold">Actions</h5>
                    </div>
                </div>
                {mentees.length === 0 ? (
                    <div></div>
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
    );
};

export default MenteeInfo;
