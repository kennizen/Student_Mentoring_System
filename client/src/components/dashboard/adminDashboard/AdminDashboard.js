import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { adminGetDetails } from "../../../actions/admin";
import Loading from "../../loading/Loading";
import Home from "./dashboardLinks/home/Home";
import Profile from "./dashboardLinks/profile/Profile";
import ManageGroups from "./dashboardLinks/manageGroups/ManageGroups";

import Code from "../../../assets/Code";
import Plus from "../../../assets/Plus";
import HomeIcon from "../../../assets/HomeIcon";
import UserCircleIcon from "../../../assets/UserCircleIcon";
import LogoutIcon from "../../../assets/LogoutIcon";
import DocumentTextIcon from "../../../assets/DocumentTextIcon";
import Logs from "./dashboardLinks/logs/Logs";

const AdminDashboard = () => {
    // state for maintaining the side nav bar
    const [route, setRoute] = useState({
        home: true,
        profile: false,
        manageGroups: false,
        logs: false,
    });
    // setting the admin auth token
    const dispatch = useDispatch();
    const history = useHistory();
    // accessing the redux store state
    const data = useSelector((state) => state.admin);

    console.log("admin data in dashboard", data);

    // fetching the admin details
    useEffect(() => {
        dispatch(adminGetDetails(history));
    }, [dispatch, history]);

    // function to chnage the tabs screens of the dashboard
    const handleRouteChange = (e) => {
        const selectedTab = e.target.id;
        switch (selectedTab) {
            case "home":
                setRoute({
                    home: true,
                    profile: false,
                    manageGroups: false,
                    logs: false,
                });
                break;
            case "profile":
                setRoute({
                    home: false,
                    profile: true,
                    manageGroups: false,
                    logs: false,
                });
                break;
            case "manageGroups":
                setRoute({
                    home: false,
                    profile: false,
                    manageGroups: true,
                    logs: false,
                });
                break;
            case "logs":
                setRoute({
                    home: false,
                    profile: false,
                    manageGroups: false,
                    logs: true,
                });
                break;
            default:
                break;
        }
    };

    // function to handle the logout
    const handleLogout = () => {
        // calling dispatch directly without an action call from the actions folder because we dont need any api to be called for loging out.
        dispatch({ type: "LOGOUT_ADMIN" });
        history.push("/");
    };

    return (
        <div className="flex">
            {!data && <Loading />}
            <nav className="w-3/20 h-screen bg-white flex flex-col z-10 fixed">
                <div className="h-1/10 flex items-center justify-center">
                    <Code myStyle={"mr-4 h-7 w-7"} alt={true} />
                    <h1>Admin</h1>
                </div>
                <button
                    id="manageGroups"
                    onClick={handleRouteChange}
                    className={`flex items-center justify-between text-left bg-blue-600 hover:bg-blue-800 text-white mt-5 mb-9 ml-8 mr-8 pt-3 pb-3 pl-8 pr-8 rounded-md`}
                >
                    Manage Groups
                    <Plus alt={true} myStyle={"h-6 w-6 text-white"} />
                </button>
                <button
                    onClick={handleRouteChange}
                    id="home"
                    className={`${
                        route.home && "text-gray-700"
                    } flex items-center text-left hover:bg-gray-100 text-gray-400 mt-5  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <HomeIcon
                        myStyle={"h-5 w-5 mr-3".concat(" ").concat(route.home && "text-blue-600")}
                        alt={true}
                    />
                    Home
                </button>
                <button
                    onClick={handleRouteChange}
                    id="profile"
                    className={`${
                        route.profile && "text-gray-700"
                    } flex items-center text-left hover:bg-gray-100 text-gray-400 mt-5  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <UserCircleIcon
                        myStyle={"h-5 w-5 mr-3"
                            .concat(" ")
                            .concat(route.profile && "text-blue-600")}
                        alt={false}
                    />
                    Profile
                </button>
                <button
                    onClick={handleRouteChange}
                    id="logs"
                    className={`${
                        route.logs ? "text-gray-700 bg-gray-100" : "text-gray-400"
                    } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <DocumentTextIcon
                        myStyle={"h-5 w-5 mr-3".concat(" ").concat(route.logs && "text-blue-600")}
                        alt={true}
                    />
                    Logs
                </button>
                <button
                    onClick={handleLogout}
                    id="profile"
                    className={`flex items-center text-left hover:bg-gray-100 text-gray-800 mt-10  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <LogoutIcon alt={true} myStyle={"h-5 w-5 text-red-500 mr-3"} />
                    Logout
                </button>
            </nav>
            {/* temp div under the nav */}
            <div className="w-3/20 h-screen"></div>
            <div className="w-17/20 h-screen">
                <div className="relative w-full h-1/10 bg-white shadow-md flex items-center justify-end">
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
                            alt="admin name"
                            className="w-14 h-14 rounded-full"
                        />
                        <h4>{data?.user?.name}</h4>
                    </div>
                </div>
                <div className="h-9/10 bg-gray-100 overflow-auto">
                    {/* conditional rendering of the inner tab screens */}
                    {route.manageGroups && <ManageGroups />}
                    {route.home && <Home />}
                    {route.profile && <Profile details={data.adminData} />}
                    {route.logs && <Logs />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
