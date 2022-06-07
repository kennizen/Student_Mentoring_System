import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLogs } from "../../../../../../actions/logs";
import moment from "moment";
import UserGroupIcon from "../../../../../../assets/icons/UserGroupIcon";
import ChatIcon from "../../../../../../assets/icons/ChatIcon";
import AnnotationIcon from "../../../../../../assets/icons/AnnotationIcon";
import UserCircleIcon from "../../../../../../assets/icons/UserCircleIcon";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Loading from "../../../../../loading/Loading";
import FeedIcon from "@mui/icons-material/Feed";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const RecentActivities = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [logs, setlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getLogs(history, setlogs, setLoading));
    }, [dispatch, history]);

    console.log(logs);

    return (
        <>
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                logs
                    ?.map((log) => {
                        return (
                            <div key={log._id} className="flex items-center gap-x-5 mb-3">
                                <div className="w-11 h-11 bg-gray-600 text-blue-300 rounded-full flex items-center justify-center">
                                    {log?.event_type === "LOGIN" && <LoginIcon />}
                                    {log?.event_type === "LOGOUT" && <LogoutIcon />}
                                    {log?.event_type === "SIGNUP" && <HowToRegIcon />}
                                    {(log?.event_type === "COMMENT_CREATED" ||
                                        log?.event_type === "COMMENT_DELETED") && (
                                        <ChatIcon alt={true} myStyle={"h-6 w-6"} />
                                    )}
                                    {(log?.event_type === "POST_CREATED" ||
                                        log?.event_type === "POST_UPDATED" ||
                                        log?.event_type === "POST_DELETED") && (
                                        <AnnotationIcon alt={true} myStyle={"h-6 w-6"} />
                                    )}
                                    {(log?.event_type === "AVATAR_UPDATED" ||
                                        log?.event_type === "PROFILE_UPDATED") && (
                                        <UserCircleIcon alt={true} myStyle={"h-6 w-6"} />
                                    )}
                                    {(log?.event_type === "MEETING_CREATED" ||
                                        log?.event_type === "MEETING_UPDATED") && (
                                        <UserGroupIcon alt={true} myStyle={"h-6 w-6"} />
                                    )}
                                    {(log?.event_type === "UPDATED_PAST_EDUCATION" ||
                                        log?.event_type === "DELETED_SEMESTER" ||
                                        log?.event_type === "UPDATED_SEMESTER") && <FeedIcon />}
                                </div>
                                <div className="pb-1 flex-grow border-b border-gray-300 flex items-center justify-between">
                                    <div>
                                        <h4>{log?.event_type.replace("_", " ")}</h4>
                                        <h5>{log?.event_detail}</h5>
                                    </div>
                                    <h5>{moment(log?.createdAt).format("Do MMMM YYYY, h:mm a")}</h5>
                                </div>
                            </div>
                        );
                    })
                    .reverse()
            )}
        </>
    );
};

export default RecentActivities;
