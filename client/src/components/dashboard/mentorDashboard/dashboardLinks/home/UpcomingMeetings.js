import React from "react";
import { useSelector } from "react-redux";
import MeetingTile from "./MeetingTile";

const date = new Date();

const UpcomingMeetings = () => {
    const { meetings } = useSelector((state) => state.meeting);

    return (
        <div className="bg-white py-2 rounded-md w-10/12 h-full overflow-y-auto px-4 flex flex-col items-start gap-y-3">
            <h4 className="">Upcoming Meetings</h4>
            <div className="overflow-y-auto w-full h-80 p-1">
                {meetings
                    ?.sort((a, b) => {
                        return a.date > b.date ? 1 : -1;
                    })
                    ?.map((meeting) => {
                        if (meeting.date > date.toISOString()) {
                            return (
                                <MeetingTile
                                    key={meeting._id}
                                    {...meeting}
                                    myStyle2={"border-b border-gray-300"}
                                />
                            );
                        }
                        return "";
                    })}
            </div>
            <hr className="bg-gray-200 h-0.5 w-full" />
            <h4 className="">Held Meetings</h4>
            <div className="overflow-y-auto w-full h-80 p-1">
                {meetings
                    ?.sort((a, b) => {
                        return a.date < b.date ? 1 : -1;
                    })
                    ?.map((meeting) => {
                        if (meeting.date <= date.toISOString()) {
                            return (
                                <MeetingTile
                                    key={meeting._id}
                                    {...meeting}
                                    myStyle={"bg-gray-100"}
                                />
                            );
                        }
                        return "";
                    })}
            </div>
        </div>
    );
};

export default UpcomingMeetings;
