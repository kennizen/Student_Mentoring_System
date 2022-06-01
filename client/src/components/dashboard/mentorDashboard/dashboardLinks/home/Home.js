import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStats } from "../../../../../actions/stats";
import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import AnnotationIcon from "../../../../../assets/icons/AnnotationIcon";
import ChatAltIcon from "../../../../../assets/icons/ChatAltIcon";
import ChartData from "./chartData/ChartData";

import InfoCards from "./InfoCards";
import RecentActivities from "./recentActivities/RecentActivities";
import UpcomingMeetings from "./UpcomingMeetings";

const Home = ({ name }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // state for stats
    const [stats, setStats] = useState({
        posts: 0,
        comments: 0,
        mentees: 0,
    });

    useEffect(() => {
        dispatch(getStats(history, setStats));
    }, []);

    return (
        <div className="h-full relative overflow-y-auto">
            <div className={`w-full h-full px-36 py-10 grid grid-cols-5 gap-4`}>
                <div className="w-full col-span-3 flex flex-col justify-start gap-y-10">
                    <h1 className="">Welcome back, {name}!</h1>
                    <div className="flex items-center justify-between">
                        <InfoCards
                            myStyle={"p-4 bg-rose-500 rounded-md bg-right-top w-48 shadow-md"}
                            total={stats.mentees}
                            text={"Total Mentees"}
                        >
                            <AcademicCapIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                        <InfoCards
                            myStyle={"p-4 bg-purple-500 rounded-md bg-right-top w-48 shadow-md"}
                            total={stats.posts}
                            text={"Total Posts"}
                        >
                            <AnnotationIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                        <InfoCards
                            myStyle={"p-4 bg-cyan-500 rounded-md bg-right-top w-48 shadow-md"}
                            total={stats.comments}
                            text={"Total Comments"}
                        >
                            <ChatAltIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                    </div>
                    <div className="w-full bg-white h-64 rounded-md px-4 py-2">
                        <ChartData />
                    </div>
                    <div className="w-full bg-white h-60 rounded-md overflow-y-auto px-4 py-2">
                        <h4 className="mb-3">Activities last 7 days</h4>
                        <RecentActivities />
                    </div>
                </div>
                <div className="col-span-2 py-4 flex items-start justify-end h-full">
                    <UpcomingMeetings />
                </div>
            </div>
        </div>
    );
};

export default Home;
