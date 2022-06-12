import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MenteeTile from "./menteeTile/MenteeTile";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const MenteeInfo = () => {
    const history = useHistory();
    // temporary array to store the filtered results of the search
    const [tempList, setTempList] = useState([]);

    // state to sort based on term
    const [term, setTerm] = useState("name");

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
        let selTerm = e.target.name;
        let temp = mentees;

        if (term === selTerm) {
            temp.reverse();
        } else if (selTerm === "roll") {
            temp.sort((a, b) => {
                return a.enrollment_no.toLowerCase() > b.enrollment_no.toLowerCase() ? 1 : -1;
            });
            setTerm(selTerm);
        } else {
            temp.sort((a, b) => {
                return a.semester.toLowerCase() > b.semester.toLowerCase() ? 1 : -1;
            });
            setTerm(selTerm);
        }

        // setting the tempList to the sorted mentee list
        setTempList([...temp]);
    };

    console.log("mentees in mentee info", mentees);
    console.log("mentees in mentee info", term);

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
                                className="pl-11 rounded-md xl:w-96 border border-blueGray-300"
                                placeholder="Search anything..."
                            />
                            <div className="absolute top-2.5 left-3">
                                <SearchIcon alt={true} myStyle={"h-5 w-5"} />
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
                            <UnfoldMoreRoundedIcon
                                fontSize="small"
                                className="pointer-events-none"
                            />
                        </button>
                    </div>
                    <div className="">
                        <button
                            name="roll"
                            onClick={sortBasedOnTerm}
                            className=" flex justify-between items-center text-sm gap-1 py-1 rounded-md"
                        >
                            Roll No.
                            <UnfoldMoreRoundedIcon
                                fontSize="small"
                                className="pointer-events-none"
                            />
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
                            <UnfoldMoreRoundedIcon
                                fontSize="small"
                                className="pointer-events-none"
                            />
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
