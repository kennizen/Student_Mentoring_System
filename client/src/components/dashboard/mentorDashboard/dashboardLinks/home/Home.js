import React, { useState } from "react";
import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import AnnotationIcon from "../../../../../assets/icons/AnnotationIcon";
import ChatAltIcon from "../../../../../assets/icons/ChatAltIcon";

import InfoCards from "./InfoCards";
import MeetingForm from "./MeetingForm";
import UpcomingMeetings from "./UpcomingMeetings";
import { Roles } from "../../../../../utility";

const Home = ({ name }) => {
    let role = "";
    if (localStorage.getItem("authData")) {
        role = JSON.parse(localStorage.getItem("authData"))["role"];
    }

    return (
        <div className="h-full relative">
            <div className={`w-full h-full px-36 py-10 grid grid-cols-5 overflow-y-auto`}>
                <div className="w-full col-span-3 flex flex-col justify-start gap-y-10">
                    <h1 className="">Welcome back, {name}!</h1>
                    <div className="flex flex-wrap items-center justify-between">
                        <InfoCards
                            myStyle={"p-4 bg-rose-500 rounded-md bg-right-top w-60 shadow-md"}
                            total={53}
                            text={"Total Mentees"}
                        >
                            <AcademicCapIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                        <InfoCards
                            myStyle={"p-4 bg-purple-500 rounded-md bg-right-top w-60 shadow-md"}
                            total={34}
                            text={"Total Posts"}
                        >
                            <AnnotationIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                        <InfoCards
                            myStyle={"p-4 bg-cyan-500 rounded-md bg-right-top w-60 shadow-md"}
                            total={`${34} / ${102}`}
                            text={"Total Comments"}
                        >
                            <ChatAltIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                    </div>
                    <div className="w-full bg-red-200 h-60">chart</div>
                    <div className="w-full bg-blue-200 h-60">Recent activities</div>
                </div>
                <div className="col-span-2 py-4 flex flex-col items-end gap-y-4">
                    {role === Roles.MENTOR && (
                        <div className="bg-white py-2 rounded-md w-3/4 px-4">
                            <MeetingForm />
                        </div>
                    )}
                    <div className="bg-white py-2 rounded-md w-3/4 px-4">
                        <UpcomingMeetings />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
