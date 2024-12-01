import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { mentorGetAllMentees, mentorGetAllMenteeSemesters } from "../../../../../../actions/mentor";
import MenteeDetailsTile from "./menteeDetailsTile/MenteeDetailsTile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AnnotationIcon from "../../../../../../assets/icons/AnnotationIcon";

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
                                    ? `https://api.dicebear.com/9.x/personas/svg`
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
                <div className="flex items-center gap-x-20">
                    <button className="p-2 bg-gray-100 rounded-lg">
                        <AnnotationIcon alt={true} myStyle={"h-4 w-4"} />
                    </button>
                    {showDetails === false ? (
                        <button
                            onClick={() => {
                                setShowDetails(true);
                                dispatch(
                                    mentorGetAllMenteeSemesters(history, setSemesters, mentee._id)
                                );
                                dispatch(mentorGetAllMentees());
                            }}
                            className="p-1 bg-gray-100 rounded-lg"
                        >
                            <KeyboardArrowDownIcon fontSize="small" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowDetails(false)}
                            className="p-1 bg-gray-100 rounded-lg"
                        >
                            <KeyboardArrowUpIcon fontSize="small" />
                        </button>
                    )}
                </div>
            </div>
            {showDetails && <MenteeDetailsTile mentee={mentee} semesters={semesters} />}
        </>
    );
};

export default MenteeTile;
