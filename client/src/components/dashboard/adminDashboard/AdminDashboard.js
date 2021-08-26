import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Home from "./dashboardLinks/Home";
import Profile from "./dashboardLinks/Profile";

const AdminDashboard = () => {
    // state for maintaining the side nav bar
    const [route, setRoute] = useState({
        home: true,
        profile: false,
    });
    const [admin, setAdmin] = useState(localStorage.getItem("auth_token")); // setting the admin auth token
    const dispatch = useDispatch();
    const history = useHistory();

    // function to chnage the tabs screens of the dashboard
    const handleRouteChange = (e) => {
        const selectedTab = e.target.id;
        switch (selectedTab) {
            case "home":
                setRoute({
                    home: true,
                    profile: false,
                });
                break;
            case "profile":
                setRoute({
                    home: false,
                    profile: true,
                });
                break;
            default:
                break;
        }
    };

    // function to handle the logout
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" }); // calling dispatch directly without an action call from the actions folder because we dont need any api to be called for loging out.
        history.push("/");
        setAdmin(null);
    };

    return (
        <div className="h-screen flex">
            <nav className="w-3/20 h-screen bg-blue-600 flex flex-col">
                <div className="h-1/10 flex items-center justify-center">
                    <h1>Admin</h1>
                </div>
                <button
                    onClick={handleRouteChange}
                    id="home"
                    className={`${
                        route.home && "bg-blue-400"
                    } text-left hover:bg-blue-400 text-white mt-5 ml-4 mr-4 pt-3 pb-3 pl-3 rounded-md`}
                >
                    Home
                </button>
                <button
                    onClick={handleRouteChange}
                    id="profile"
                    className={`${
                        route.profile && "bg-blue-400"
                    } text-left hover:bg-blue-400 text-white mt-5 ml-4 mr-4 pt-3 pb-3 pl-3 rounded-md`}
                >
                    Profile
                </button>
            </nav>
            <div className="w-17/20 h-screen">
                <div className="w-full h-1/10 bg-gray-100 shadow-md flex items-center justify-end">
                    {admin ? (
                        <button onClick={handleLogout} className="mr-9 hover:bg-red-500 p-2">
                            Logout
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>
                {/* conditional rendering of the inner tab screens */}
                {route.home && <Home />}
                {route.profile && <Profile />}
            </div>
        </div>
    );
};

export default AdminDashboard;
