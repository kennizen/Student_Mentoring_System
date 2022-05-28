import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import AnnotationIcon from "../../../../../assets/icons/AnnotationIcon";
import ChatAltIcon from "../../../../../assets/icons/ChatAltIcon";

import InfoCards from "./InfoCards";
import UpcomingMeetings from "./UpcomingMeetings";

const Home = ({ name }) => {
    const { posts } = useSelector((state) => state.post);
    const { mentees } = useSelector((state) => state.mentor);

    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        let count = 0;
        posts?.forEach((post) => {
            count += post.postData.commentCount;
        });
        setCommentCount(count);
    }, [posts]);

    return (
        <div className="h-full relative">
            <div className={`w-full h-full px-36 py-10 grid grid-cols-5 gap-4`}>
                <div className="w-full col-span-3 flex flex-col justify-start gap-y-12">
                    <h1 className="">Welcome back, {name}!</h1>
                    <div className="flex flex-wrap items-center justify-between">
                        <InfoCards
                            myStyle={"p-4 bg-rose-500 rounded-md bg-right-top w-60 shadow-md"}
                            total={mentees?.length}
                            text={"Total Mentees"}
                        >
                            <AcademicCapIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                        <InfoCards
                            myStyle={"p-4 bg-purple-500 rounded-md bg-right-top w-60 shadow-md"}
                            total={posts?.length}
                            text={"Total Posts"}
                        >
                            <AnnotationIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                        <InfoCards
                            myStyle={"p-4 bg-cyan-500 rounded-md bg-right-top w-60 shadow-md"}
                            total={`${commentCount}`}
                            text={"Total Comments"}
                        >
                            <ChatAltIcon alt={true} myStyle={"w-6 h-6 text-white"} />
                        </InfoCards>
                    </div>
                    <div className="w-full bg-red-200 h-60">chart</div>
                    <div className="w-full bg-blue-200 h-60">Recent activities</div>
                </div>
                <div className="col-span-2 py-4 flex items-start justify-end h-full">
                    <UpcomingMeetings />
                </div>
            </div>
        </div>
    );
};

export default Home;
