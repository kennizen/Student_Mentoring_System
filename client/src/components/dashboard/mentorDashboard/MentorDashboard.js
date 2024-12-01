import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {
    logoutMentor,
    mentorGetAllMentees,
    mentorGetDetails,
    mentorGetProfile,
} from "../../../actions/mentor";
import ChatAlt2Icon from "../../../assets/icons/ChatAlt2Icon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import AnnotationIcon from "../../../assets/icons/AnnotationIcon";
import AcademicCapIcon from "../../../assets/icons/AcademicCapIcon";
import Code from "../../../assets/icons/Code";
import Chat from "./dashboardLinks/chat/Chat";
import MenteeInfo from "./dashboardLinks/menteeInfo/MenteeInfo";
import Post from "./dashboardLinks/post/Post";
import Profile from "./dashboardLinks/profile/Profile";
import AcademicDetails from "./dashboardLinks/academicdetails/AcademicDetails";
import ManageGroups from "./dashboardLinks/manageGroups/ManageGroups";
import Logs from "./dashboardLinks/logs/Logs";

import { getAllChat, logoutChats } from "../../../actions/chat";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import UserCircleIcon from "../../../assets/icons/UserCircleIcon";
import DotIcon from "../../../assets/icons/DotIcon";
import { SocketContext } from "../../../socket/socket";

import {
    addMessages,
    addNotification,
    addSingleChat,
    reorderChats,
    updateLatestMessage,
} from "../../../actions/chat";

import NotifySound from "../../../assets/sounds/light-562.ogg";
import BellIcon from "../../../assets/icons/BellIcon";
import Notification from "../../notification/Notification";
import {
    addGlobalNotification,
    getAllNotifications,
    logoutNotifications,
    markNotificationRead,
} from "../../../actions/notification";
import { CSSTransition } from "react-transition-group";
import NotificationCounter from "../../notification/NotificationCounter";
import NotificationModal from "../../notification/notificationModal/NotificationModal";
import ModalOverlay from "../../modal/ModalOverlay";
import {
    logoutStudent,
    studentGetDetails,
    studentGetProfileDetails,
} from "../../../actions/student";
import Home from "./dashboardLinks/home/Home";
import { getAllPosts, logoutPosts } from "../../../actions/post";
import { Roles } from "../../../utility";
import DocumentTextIcon from "../../../assets/icons/DocumentTextIcon";
import Plus from "../../../assets/icons/Plus";
import UserGroupIcon from "../../../assets/icons/UserGroupIcon";
import { adminFetchLogs, adminGetDetails, logoutAdmin } from "../../../actions/admin";
import Meetings from "./dashboardLinks/meetings/Meetings";
import { getMeetings } from "../../../actions/meeting";
import Loading from "../../loading/Loading";
import AdminInteractions from "./dashboardLinks/adminInteractions/AdminInteractions";
import { authContext } from "../../../contexts/authContext";
import { ToastContainer } from "react-toastify";

const MentorDashboard = () => {
    let uid = "";
    let role = "";

    // getting the socket context from the provider
    const socket = useContext(SocketContext);

    // setting the admin auth token
    const dispatch = useDispatch();
    const history = useHistory();

    // getting uid and role of the logged in user
    if (localStorage.getItem("authData") == null) {
        history.push("/");
    } else {
        uid = JSON.parse(localStorage.getItem("authData"))["uid"];
        role = JSON.parse(localStorage.getItem("authData"))["role"];
    }

    // fetching details
    useEffect(() => {
        const dis = [];
        if (role === Roles.ADMIN) {
            dis.push(dispatch(adminGetDetails(history)));
            dis.push(dispatch(adminFetchLogs(history)));
        } else {
            if (role === Roles.MENTOR) {
                dis.push(dispatch(mentorGetDetails(history)));
                dis.push(dispatch(mentorGetProfile(history)));
                dis.push(dispatch(mentorGetAllMentees(history)));
            } else if (role === Roles.STUDENT) {
                dis.push(dispatch(studentGetDetails(history)));
                dis.push(dispatch(studentGetProfileDetails(history)));
            }

            //dis.push(dispatch(getAllPosts(history, 1)));
            dis.push(dispatch(getAllChat(history)));
            dis.push(dispatch(getAllNotifications(history)));
            dis.push(dispatch(getMeetings(history)));
        }

        const func = async (disArray) => {
            try {
                await Promise.all(disArray);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
            console.log("waiting");
        };
        func(dis);

        if (localStorage.getItem("persistChat") !== null) {
            localStorage.removeItem("persistChat");
        }
        if (localStorage.getItem("selectedChat") !== null) {
            localStorage.removeItem("selectedChat");
        }
        if (localStorage.getItem("chats") !== null) {
            localStorage.removeItem("chats");
        }
        if (localStorage.getItem("0") !== null) {
            localStorage.removeItem("0");
        }
        if (localStorage.getItem("visible") !== null) {
            localStorage.removeItem("visible");
        }
        localStorage.setItem("chatRoute", JSON.stringify(false));
        localStorage.setItem("postRoute", JSON.stringify(false));
    }, [dispatch, history, role]);

    // state for maintaining the side nav bar
    const [route, setRoute] = useState({
        home: role === Roles.ADMIN ? false : true,
        post: false,
        menteeInfo: false,
        profile: false,
        chat: false,
        academicDetails: false,
        manageGroups: false,
        logs: false,
        meetings: false,
        allInteractions: role === Roles.ADMIN ? true : false,
    });

    // state to control the chat notification on the dashboard tab
    const [newMsgNotify, setNewMsgNotify] = useState(false);

    // accessing profile data of the required user
    const { profileData } = useSelector((state) => {
        if (role === Roles.MENTOR) return state.mentor;
        else if (role === Roles.STUDENT) return state.student;
        return state;
    });

    // accesing admin data
    const { adminData } = useSelector((state) => {
        if (role === Roles.ADMIN) return state.admin;
        return state;
    });

    console.log("profile data in dashboard", profileData);
    console.log("admin data in dashboard", adminData);

    // state variable to control the stream updated button
    const [streamUpdated, setStreamUpdated] = useState(false);

    // socket to setup the user for the socket and to listen to new notification
    useEffect(() => {
        socket.emit("setup", uid);
        console.log("socket", socket);

        const handleNewNoti = (data) => {
            console.log("new socket Notification", data);
            if (
                data.event.type === "POST_CREATED" &&
                localStorage.getItem("postRoute") !== null &&
                JSON.parse(localStorage.getItem("postRoute"))
            ) {
                setStreamUpdated(true);
                // make the received notification as read
                dispatch(markNotificationRead(history, [{ id: data._id, willReceive: false }]));
            } else {
                dispatch(addGlobalNotification(history, data));
            }
        };

        socket.on("new Notification", handleNewNoti);

        return () => {
            socket.off("new Notification", handleNewNoti);
            //socket.disconnect();
        };
    }, []);

    // useeffect call when message is received
    useEffect(() => {
        const notification = (data) => {
            const id = data.data.chat._id.toString();
            dispatch(addNotification(id));
            dispatch(reorderChats(id));
            playNotifySound();
        };

        const handleMsgRec = (data) => {
            /* this is to create the chat automatically if chat not shown and message came in user chat */
            if (localStorage.getItem("chats") !== null) {
                let chats = JSON.parse(localStorage.getItem("chats"));
                let val = false;
                for (let i = 0; i < chats.length; i++) {
                    if (chats[i]._id.toString() === data.data.chat._id.toString()) {
                        val = true;
                        break;
                    }
                }
                if (val === false) {
                    dispatch(addSingleChat(data.data.chat));
                }
            }

            if (localStorage.getItem("selectedChat") === data.data.chat._id.toString()) {
                if (
                    localStorage.getItem("visible") !== null &&
                    JSON.parse(localStorage.getItem("visible"))
                )
                    notification(data); // notification when scroll to bottom button visible
                else if (!JSON.parse(localStorage.getItem("chatRoute"))) {
                    setNewMsgNotify(true);
                    // notification when selected chat is same but in different tab
                    notification(data);
                }
                dispatch(addMessages(data));
                dispatch(updateLatestMessage(data));
            } else {
                if (!JSON.parse(localStorage.getItem("chatRoute"))) setNewMsgNotify(true);
                // if message for unintended person then store chat id in global store to show notification
                notification(data);
                dispatch(updateLatestMessage(data));
            }
        };

        if (role !== Roles.ADMIN) {
            socket.on("message received", handleMsgRec);
        }

        return () => {
            socket.off("message received", handleMsgRec);
            //socket.disconnect();
        };
    }, []);

    // function to set the states of the chatRoute and the postRoute
    const setVals = ({ chatRoute, postRoute }) => {
        localStorage.setItem("chatRoute", JSON.stringify(chatRoute));
        localStorage.setItem("postRoute", JSON.stringify(postRoute));
    };

    // function to chnage the tabs screens of the dashboard
    const handleRouteChange = (e) => {
        const selectedTab = e.target.id;
        switch (selectedTab) {
            case "home":
                setVals({ chatRoute: false, postRoute: false });
                setRoute({
                    home: true,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "post":
                setVals({ chatRoute: false, postRoute: true });
                setRoute({
                    home: false,
                    post: true,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "profile":
                setVals({ chatRoute: false, postRoute: false });
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: true,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "menteeInfo":
                setVals({ chatRoute: false, postRoute: false });
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: true,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "chat":
                setVals({ chatRoute: true, postRoute: false });
                setNewMsgNotify(false);
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: true,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "academicDetails":
                setVals({ chatRoute: false, postRoute: false });
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: true,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "manageGroups":
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: true,
                    logs: false,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "logs":
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: true,
                    meetings: false,
                    allInteractions: false,
                });
                break;
            case "allInteractions":
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: false,
                    allInteractions: true,
                });
                break;
            case "meetings":
                setVals({ chatRoute: false, postRoute: false });
                setRoute({
                    home: false,
                    post: false,
                    menteeInfo: false,
                    profile: false,
                    chat: false,
                    academicDetails: false,
                    manageGroups: false,
                    logs: false,
                    meetings: true,
                    allInteractions: false,
                });
                break;
            default:
                break;
        }
    };

    // function to handle the logout
    const handleLogout = () => {
        if (role === Roles.MENTOR) dispatch(logoutMentor());
        if (role === Roles.STUDENT) dispatch(logoutStudent());
        if (role === Roles.ADMIN) dispatch(logoutAdmin());
        dispatch(logoutChats());
        dispatch(logoutNotifications());
        dispatch(logoutPosts());
        //socket.disconnect();
        history.push("/");
    };

    // play sound on notification
    const playNotifySound = () => {
        var audio = new Audio(NotifySound);
        audio.play();
    };

    // state variable to store and show the notification content in the notification modal
    const [modalContent, setModalContent] = useState(null);

    // state to control notification panel show and dont show
    const [showNotificationDropDown, setShowNotificationDropDown] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);

    // node ref used in css transition for the notification panel
    const notificationDropDownRef = useRef(null);
    const overlayRef = useRef(null);
    const notificationModalRef = useRef(null);

    // loading state for the dashboard
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? (
                <div className="w-full h-screen flex items-center justify-center gap-x-3">
                    <Loading />
                    <h3>Loading user data...</h3>
                </div>
            ) : (
                <authContext.Provider value={{ uid, role }}>
                    <div className="h-screen flex bg-gray-50 overflow-hidden">
                        <nav className="w-3/20 h-screen bg-white flex flex-col z-10">
                            <div className="h-1/10 flex items-center justify-center">
                                <Code alt={true} myStyle={"w-7 h-7 mr-4"} />
                                {role === Roles.MENTOR && <h1>Mentor</h1>}
                                {role === Roles.STUDENT && <h1>Student</h1>}
                                {role === Roles.ADMIN && <h1>Admin</h1>}
                            </div>
                            {role === Roles.ADMIN && (
                                <button
                                    id="manageGroups"
                                    onClick={handleRouteChange}
                                    className={`flex items-center justify-between text-left bg-blue-600 hover:bg-blue-800 text-white mt-5 mb-9 ml-8 mr-8 pt-3 pb-3 pl-8 pr-8 rounded-md`}
                                >
                                    Manage groups
                                    <Plus
                                        alt={true}
                                        myStyle={"h-6 w-6 text-white pointer-events-none"}
                                    />
                                </button>
                            )}
                            {role !== Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="home"
                                    className={`${route.home ? "text--gray-700 bg-gray-100" : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <HomeIcon
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.home && "text-blue-600")}
                                        alt={true}
                                    />
                                    Home
                                </button>
                            )}
                            {role === Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="allInteractions"
                                    className={`${route.allInteractions
                                        ? "text--gray-700 bg-gray-100"
                                        : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <UserGroupIcon
                                        alt={true}
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.allInteractions && "text-blue-600")}
                                    />
                                    Users
                                </button>
                            )}
                            {role !== Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="post"
                                    className={`${route.post ? "text--gray-700 bg-gray-100" : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <AnnotationIcon
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.post && "text-blue-600")}
                                        alt={true}
                                    />
                                    Post
                                </button>
                            )}
                            {role !== Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="meetings"
                                    className={`${route.meetings
                                        ? "text--gray-700 bg-gray-100"
                                        : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <UserGroupIcon
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.meetings && "text-blue-600")}
                                        alt={true}
                                    />
                                    Meetings
                                </button>
                            )}
                            {role === Roles.MENTOR && (
                                <button
                                    onClick={handleRouteChange}
                                    id="menteeInfo"
                                    className={`${route.menteeInfo
                                        ? "text--gray-700 bg-gray-100"
                                        : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <AcademicCapIcon
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.menteeInfo && "text-blue-600")}
                                        alt={true}
                                    />
                                    Mentees
                                </button>
                            )}
                            {role === Roles.STUDENT && (
                                <button
                                    onClick={handleRouteChange}
                                    id="academicDetails"
                                    className={`${route.academicDetails
                                        ? "text--gray-700 bg-gray-100"
                                        : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <AcademicCapIcon
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.academicDetails && "text-blue-600")}
                                        alt={true}
                                    />
                                    Academics
                                </button>
                            )}
                            {role !== Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="chat"
                                    className={`${route.chat ? "text--gray-700 bg-gray-100" : "text-gray-400"
                                        } flex items-center space-x-12 text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <span className="flex items-center pointer-events-none">
                                        <ChatAlt2Icon
                                            alt={true}
                                            myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                                .concat(" ")
                                                .concat(route.chat && "text-blue-600")}
                                        />
                                        Chat
                                    </span>
                                    {newMsgNotify && (
                                        <DotIcon
                                            myStyle={"h-3 w-3 bg-blue-500 rounded-full float-right"}
                                        />
                                    )}
                                </button>
                            )}
                            {role !== Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="profile"
                                    className={`${route.profile
                                        ? "text--gray-700 bg-gray-100"
                                        : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <UserCircleIcon
                                        alt={true}
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.profile && "text-blue-600")}
                                    />
                                    Profile
                                </button>
                            )}
                            {role === Roles.ADMIN && (
                                <button
                                    onClick={handleRouteChange}
                                    id="logs"
                                    className={`${route.logs ? "text-gray-700 bg-gray-100" : "text-gray-400"
                                        } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                                >
                                    <DocumentTextIcon
                                        myStyle={"h-5 w-5 mr-3 pointer-events-none"
                                            .concat(" ")
                                            .concat(route.logs && "text-blue-600")}
                                        alt={true}
                                    />
                                    Logs
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                id="profile"
                                className={`flex items-center text-left hover:bg-red-200 text-gray-800 mt-10  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md bg-red-100 transition-all`}
                            >
                                <LogoutIcon
                                    myStyle={"h-5 w-5 mr-3 text-red-600 pointer-events-none"}
                                    alt={true}
                                />
                                Logout
                            </button>
                        </nav>
                        <div className="w-17/20 h-screen">
                            <CSSTransition
                                nodeRef={overlayRef}
                                in={showOverlay}
                                timeout={300}
                                classNames="overlay"
                                unmountOnExit
                            >
                                <ModalOverlay nodeRef={overlayRef} />
                            </CSSTransition>
                            <CSSTransition
                                nodeRef={notificationModalRef}
                                in={showNotificationModal}
                                timeout={300}
                                classNames="modal"
                                unmountOnExit
                            >
                                <NotificationModal
                                    nodeRef={notificationDropDownRef}
                                    setShowNotificationModal={setShowNotificationModal}
                                    setShowOverlay={setShowOverlay}
                                    notification={modalContent}
                                />
                            </CSSTransition>
                            <div className="relative w-full h-1/10 bg-white shadow-md flex items-center justify-end">
                                <div className="flex items-center justify-evenly w-1/5">
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setShowNotificationDropDown(
                                                    !showNotificationDropDown
                                                );
                                            }}
                                            className="hover:bg-gray-200 transition-all p-2 rounded-full relative"
                                        >
                                            <BellIcon
                                                myStyle={"h-7 w-7 text-blue-600"}
                                                alt={!showNotificationDropDown}
                                            />
                                            <NotificationCounter />
                                        </button>
                                        <CSSTransition
                                            nodeRef={notificationDropDownRef}
                                            in={showNotificationDropDown}
                                            timeout={300}
                                            classNames="modal"
                                            unmountOnExit
                                        >
                                            <Notification
                                                nodeRef={notificationDropDownRef}
                                                setShowNotificationModal={setShowNotificationModal}
                                                setShowOverlay={setShowOverlay}
                                                setModalContent={setModalContent}
                                            />
                                        </CSSTransition>
                                    </div>

                                    <span className="flex items-center justify-between gap-x-3">
                                        {role === Roles.ADMIN ? (
                                            <>
                                                <img
                                                    src={
                                                        adminData?.avatar?.url === ""
                                                            ? `https://api.dicebear.com/9.x/personas/svg`
                                                            : adminData?.avatar?.url
                                                    }
                                                    alt="avatar"
                                                    className="w-14 h-14 rounded-full"
                                                />
                                                <span>
                                                    <h3>{`${adminData?.firstname} ${adminData?.middlename} ${adminData?.lastname}`}</h3>
                                                    <h6>{`${adminData?.email}`}</h6>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    src={
                                                        profileData?.avatar?.url === ""
                                                            ? `https://api.dicebear.com/9.x/personas/svg`
                                                            : profileData?.avatar?.url
                                                    }
                                                    alt="avatar"
                                                    className="w-14 h-14 rounded-full"
                                                />
                                                <span>
                                                    <h3>{`${profileData?.firstname} ${profileData?.middlename} ${profileData?.lastname}`}</h3>
                                                    <h6>{`${profileData?.email}`}</h6>
                                                </span>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className={`h-9/10 bg-gray-100 overflow-hidden}`}>
                                {/* conditional rendering of the inner tab screens */}
                                {route.post && (
                                    <Post
                                        socket={socket}
                                        streamUpdated={streamUpdated}
                                        setStreamUpdated={setStreamUpdated}
                                    />
                                )}
                                {route.menteeInfo && <MenteeInfo />}
                                {route.chat && <Chat />}
                                {route.profile && <Profile profileData={profileData} />}
                                {route.academicDetails && <AcademicDetails />}
                                {route.home && (
                                    <Home
                                        name={
                                            profileData !== undefined
                                                ? `${profileData?.firstname} ${profileData?.middlename} ${profileData?.lastname}`
                                                : `${adminData?.firstname} ${adminData?.middlename} ${adminData?.lastname}`
                                        }
                                    />
                                )}
                                {route.manageGroups && <ManageGroups />}
                                {route.logs && <Logs />}
                                {route.meetings && <Meetings />}
                                {route.allInteractions && <AdminInteractions />}
                            </div>
                        </div>
                    </div>
                </authContext.Provider>
            )}
            <ToastContainer limit={5} draggable={false} pauseOnFocusLoss={false} />
        </>
    );
};

export default MentorDashboard;
