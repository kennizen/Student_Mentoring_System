import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { mentorGetDetails } from "../../../actions/mentor";
import Loading from "../../loading/Loading";
import MenteeInfo from "./dashboardLinks/menteeInfo/MenteeInfo";
import Post from "./dashboardLinks/post/Post";

const MentorDashboard = () => {
    // state for maintaining the side nav bar
    const [route, setRoute] = useState({
        home: true,
        post: false,
        menteeInfo: false,
        profile: false,
    });
    // setting the admin auth token
    const dispatch = useDispatch();
    const history = useHistory();
    // accessing the redux store state
    const data = useSelector((state) => state.mentor);

    console.log("mentor data in dashboard", data);

    // fetching the admin details
    useEffect(() => {
        dispatch(mentorGetDetails(history));
    }, [dispatch, history]);

    // function to chnage the tabs screens of the dashboard
    const handleRouteChange = (e) => {
        const selectedTab = e.target.id;
        switch (selectedTab) {
            case "home":
                setRoute({
                    home: true,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                });
                break;
            case "post":
                setRoute({
                    home: false,
                    post: true,
                    menteeInfo: false,
                    profile: false,
                });
                break;
            case "profile":
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: true,
                });
                break;
            case "menteeInfo":
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: true,
                    profile: false,
                });
                break;
            default:
                break;
        }
    };

    // function to handle the logout
    const handleLogout = () => {
        // calling dispatch directly without an action call from the actions folder because we dont need any api to be called for loging out.
        dispatch({ type: "LOGOUT_MENTOR" });
        history.push("/");
    };

    return (
        <div className="h-screen flex bg-gray-50">
            {!data && <Loading />}
            <nav className="w-3/20 h-screen bg-white flex flex-col z-10">
                <div className="h-1/10 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#2962ff"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                    </svg>
                    <h1>Mentor</h1>
                </div>
                <button
                    onClick={handleRouteChange}
                    id="home"
                    className={`${
                        route.home && "text-gray-700"
                    } flex items-center text-left hover:bg-gray-100 text-gray-400 mt-5  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${route.home && "text-blue-600"} h-5 w-5 mr-3`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </button>
                <button
                    onClick={handleRouteChange}
                    id="post"
                    className={`${
                        route.post && "text-gray-700"
                    } flex items-center text-left hover:bg-gray-100 text-gray-400 mt-5  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${route.post && "text-blue-600"} h-5 w-5 mr-3`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Post
                </button>
                <button
                    onClick={handleRouteChange}
                    id="menteeInfo"
                    className={`${
                        route.menteeInfo && "text-gray-700"
                    } flex items-center text-left hover:bg-gray-100 text-gray-400 mt-5  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${route.menteeInfo && "text-blue-600"} h-5 w-5 mr-3`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                    </svg>
                    Mentee Info
                </button>
                <button
                    onClick={handleRouteChange}
                    id="profile"
                    className={`${
                        route.profile && "text-gray-700"
                    } flex items-center text-left hover:bg-gray-100 text-gray-400 mt-5  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${route.profile && "text-blue-600"} h-5 w-5 mr-3`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Profile
                </button>
                <button
                    onClick={handleLogout}
                    id="profile"
                    className={`flex items-center text-left hover:bg-gray-100 text-gray-800 mt-10  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Logout
                </button>
            </nav>
            <div className="w-17/20 h-screen">
                <div className="w-full h-1/10 bg-white shadow-md flex items-center justify-end">
                    <div className="flex items-center justify-evenly w-1/5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <img
                            src={data?.user?.avatar?.url}
                            alt="avatar"
                            className="w-14 h-14 rounded-full"
                        />
                        <h4>{data?.user?.name}</h4>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    {/* conditional rendering of the inner tab screens */}
                    {route.post && <Post />}
                    {route.menteeInfo && <MenteeInfo />}
                </div>
            </div>
        </div>
    );
};

export default MentorDashboard;
