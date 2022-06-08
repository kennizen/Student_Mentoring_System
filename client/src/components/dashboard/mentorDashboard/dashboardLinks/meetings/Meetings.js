import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { authContext } from "../../../../../contexts/authContext";
import { Roles } from "../../../../../utility";
import MeetingForm from "./meetingForm/MeetingForm";
import MeetingTile from "./meetingTile/MeetingTile";

const Meetings = () => {
    // getting use role
    const { role } = useContext(authContext);
    // global meeting state
    const { meetings } = useSelector((state) => state.meeting);

    // meeting state
    const [meeting, setMeeting] = useState({
        id: "",
        participants: [],
        description: "",
        url: "",
        date: null,
        minutes: "",
    });

    console.log("meeting", meeting);
    console.log("meetings", meetings);

    return (
        <div className="h-full flex items-start justify-center gap-x-2 relative">
            <div className="h-full p-3 w-650 overflow-y-auto text-center">
                <div className="px-4 py-3 mb-4 rounded-md bg-white flex items-center justify-between shadow">
                    <h3>All meetings</h3>
                    <h3 className="rounded-lg px-1 bg-gray-200">{meetings.length}</h3>
                </div>
                {meetings
                    ?.sort((a, b) => {
                        return a.createdAt < b.createdAt ? 1 : -1;
                    })
                    ?.map((meet) => {
                        return <MeetingTile key={meet._id} {...meet} setMeeting={setMeeting} />;
                    })}
            </div>
            {role === Roles.MENTOR ? (
                <div className="h-full p-3 w-96 overflow-y-auto">
                    <MeetingForm meeting={meeting} setMeeting={setMeeting} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Meetings;
