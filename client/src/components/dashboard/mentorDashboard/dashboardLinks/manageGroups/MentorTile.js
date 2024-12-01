import React from "react";
import { Abbreviate } from "../../../../../utility";
import Chip from "./Chip";

const MentorTile = ({ mentor, handleAssign, setSelectedMentor, handleView }) => {
    const handleActionViewModal = () => {
        setSelectedMentor(mentor);
        handleView(mentor._id);
    };

    const handleActionAssignModal = () => {
        setSelectedMentor(mentor);
        handleAssign();
    };

    return (
        <div className="bg-white rounded-md p-3 shadow-sm w-72">
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
            <div className="flex mb-3">
                <Chip name={`Assigned mentees ${mentor.studentCount}`} myStyle={"mr-2"} />
                <Chip name={`${mentor.designation}`} myStyle={"mr-2"} />
                <Chip name={Abbreviate(mentor.department)} />
            </div>
            <div className="flex items-center justify-between gap-x-3">
                <button
                    onClick={handleActionAssignModal}
                    className="rounded-md w-full px-2 py-1 bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-600 hover:text-green-50 transition-colors"
                >
                    Assign
                </button>
                <button
                    onClick={handleActionViewModal}
                    className="rounded-md w-full px-2 py-1 bg-blue-50 border border-blue-600 text-blue-600 text-sm hover:bg-blue-600 hover:text-blue-50 transition-colors"
                >
                    View
                </button>
            </div>
        </div>
    );
};

export default MentorTile;
