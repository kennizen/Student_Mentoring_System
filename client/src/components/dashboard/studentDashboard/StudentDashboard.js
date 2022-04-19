import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { studentGetDetails, studentGetProfileDetails } from "../../../actions/student";
import Home from "../studentDashboard/dashboardLinks/home/Home";
import AcademicDetails from "./dashboardLinks/academicdetails/AcademicDetails";
import Chat from "../mentorDashboard/dashboardLinks/chat/Chat";
import Profile from "./dashboardLinks/profile/Profile";

import { getAllChat } from "../../../actions/chat";
import HomeIcon from "../../../assets/HomeIcon";
import AnnotationIcon from "../../../assets/AnnotationIcon";
import ChatAlt2Icon from "../../../assets/ChatAlt2Icon";
import UserCircleIcon from "../../../assets/UserCircleIcon";
import AcademicCapIcon from "../../../assets/AcademicCapIcon";
import LogoutIcon from "../../../assets/LogoutIcon";
import Post from "./dashboardLinks/post/Post";
import DotIcon from "../../../assets/DotIcon";

import {
    addMessages,
    addNotification,
    addSingleChat,
    reorderChats,
    updateLatestMessage,
} from "../../../actions/chat";

import NotifySound from "../../../assets/sounds/light-562.ogg";
import { CSSTransition } from "react-transition-group";
import NotificationCounter from "../../notification/NotificationCounter";
import NotificationModal from "../../notification/notificationModal/NotificationModal";
import ModalOverlay from "../../modal/ModalOverlay";

import { SocketContext } from "../../../socket/socket";
import BellIcon from "../../../assets/BellIcon";
import Notification from "../../notification/Notification";
import {
    addGlobalNotification,
    getAllNotifications,
    markNotificationRead,
} from "../../../actions/notification";

const StudentDashboard = () => {
    // getting the socket context from the socket provider
    const socket = React.useContext(SocketContext);

    // getting uid of the logged in user
    let uid = "";
    if (localStorage.getItem("authData")) {
        uid = JSON.parse(localStorage.getItem("authData"))["uid"];
    }

    // state for maintaining the side nav bar
    const [route, setRoute] = useState({
        home: true,
        post: false,
        chat: false,
        profile: false,
        academicDetails: false,
    });

    const [newMsgNotify, setNewMsgNotify] = useState(false);

    // setting the admin auth token
    const dispatch = useDispatch();
    const history = useHistory();

    // accessing the redux store state
    const { studentData, profileData } = useSelector((state) => state.student);

    console.log("student data in dashboard", studentData);

    // state variable to control the stream updated button
    const [streamUpdated, setStreamUpdated] = useState(false);

    useEffect(() => {
        // socket = connectSocket(token);
        // socket.emit("notify setup", uid);
        socket.emit("setup", uid);
        console.log("socket", socket);

        socket.on("new Notification", (data) => {
            console.log("new socket Notification", data);
            if (
                localStorage.getItem("postRoute") !== null &&
                JSON.parse(localStorage.getItem("postRoute"))
            ) {
                setStreamUpdated(true);
                // make the received notification as read
                dispatch(markNotificationRead(history, [{ id: data._id, willReceive: false }]));
            } else {
                if (data.event.type === "POST_CREATED") {
                    dispatch(addGlobalNotification(data));
                }
            }
        });

        return (data) => {
            socket.off("new Notification", data);
        };
    }, []);

    // fetching the admin details
    useEffect(() => {
        dispatch(studentGetDetails(history));
        dispatch(getAllChat(history));
        dispatch(getAllNotifications(history));
        dispatch(studentGetProfileDetails(history));
        localStorage.setItem("chatRoute", JSON.stringify(false));
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
        localStorage.setItem("chatRoute", false);
        localStorage.setItem("postRoute", false);
    }, [dispatch, history]);

    // useeffect call when message is received
    useEffect(() => {
        const notification = (data) => {
            const id = data.data.chat._id.toString();
            dispatch(addNotification(id));
            dispatch(reorderChats(id));
            playNotifySound();
        };

        socket.on("message received", (data) => {
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
        });

        return (data) => {
            socket.off("message received", data);
        };
    }, []);

    // play sound on notification
    const playNotifySound = () => {
        var audio = new Audio(NotifySound);
        audio.play();
    };

    // function to chnage the tabs screens of the dashboard
    const handleRouteChange = (e) => {
        const selectedTab = e.target.id;
        switch (selectedTab) {
            case "home":
                localStorage.setItem("chatRoute", JSON.stringify(false));
                localStorage.setItem("postRoute", JSON.stringify(false));
                setRoute({
                    home: true,
                    post: false,
                    chat: false,
                    profile: false,
                    academicDetails: false,
                });
                break;
            case "profile":
                localStorage.setItem("chatRoute", JSON.stringify(false));
                localStorage.setItem("postRoute", JSON.stringify(false));
                setRoute({
                    home: false,
                    chat: false,
                    profile: true,
                    academicDetails: false,
                    post: false,
                });
                break;
            case "academicDetails":
                localStorage.setItem("chatRoute", JSON.stringify(false));
                localStorage.setItem("postRoute", JSON.stringify(false));
                setRoute({
                    home: false,
                    chat: false,
                    profile: false,
                    academicDetails: true,
                    post: false,
                });
                break;
            case "chat":
                localStorage.setItem("chatRoute", JSON.stringify(true));
                localStorage.setItem("postRoute", JSON.stringify(false));
                setNewMsgNotify(false);
                setRoute({
                    home: false,
                    chat: true,
                    profile: false,
                    academicDetails: false,
                    post: false,
                });
                break;
            case "post":
                localStorage.setItem("chatRoute", JSON.stringify(false));
                localStorage.setItem("postRoute", JSON.stringify(true));
                setRoute({
                    home: false,
                    chat: false,
                    profile: false,
                    academicDetails: false,
                    post: true,
                });
                break;
            default:
                break;
        }
    };

    // function to handle the logout
    const handleLogout = () => {
        // calling dispatch directly without an action call from the actions folder because we dont need any api to be called for loging out.
        dispatch({ type: "LOGOUT_STUDENT" });
        history.push("/");
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

    return (
        <div className="h-screen flex bg-gray-50">
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
                    <h1>Student</h1>
                </div>
                <button
                    onClick={handleRouteChange}
                    id="home"
                    className={`${
                        route.home ? "text--gray-700 bg-gray-100" : "text-gray-400"
                    } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <HomeIcon
                        myStyle={"h-5 w-5 mr-3".concat(" ").concat(route.home && "text-blue-600")}
                        alt={true}
                    />
                    Home
                </button>
                <button
                    onClick={handleRouteChange}
                    id="post"
                    className={`${
                        route.post ? "text--gray-700 bg-gray-100" : "text-gray-400"
                    } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <AnnotationIcon
                        myStyle={"h-5 w-5 mr-3".concat(" ").concat(route.post && "text-blue-600")}
                        alt={true}
                    />
                    Post
                </button>
                <button
                    onClick={handleRouteChange}
                    id="chat"
                    className={`${
                        route.chat ? "text--gray-700 bg-gray-100" : "text-gray-400"
                    } flex items-center space-x-12 text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <span className="flex items-center">
                        <ChatAlt2Icon
                            myStyle={"h-5 w-5 mr-3"
                                .concat(" ")
                                .concat(route.chat && "text-blue-600")}
                            alt={true}
                        />
                        Chat
                    </span>
                    {newMsgNotify && (
                        <DotIcon myStyle={"h-3 w-3 bg-blue-500 rounded-full float-right"} />
                    )}
                </button>
                <button
                    onClick={handleRouteChange}
                    id="profile"
                    className={`${
                        route.profile ? "text--gray-700 bg-gray-100" : "text-gray-400"
                    } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <UserCircleIcon
                        myStyle={"h-5 w-5 mr-3"
                            .concat(" ")
                            .concat(route.profile && "text-blue-600")}
                        alt={true}
                    />
                    Profile
                </button>
                <button
                    onClick={handleRouteChange}
                    id="academicDetails"
                    className={`${
                        route.academicDetails ? "text--gray-700 bg-gray-100" : "text-gray-400"
                    } flex items-center text-left hover:bg-gray-100 mt-5 ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md`}
                >
                    <AcademicCapIcon
                        myStyle={"h-5 w-5 mr-3"
                            .concat(" ")
                            .concat(route.academicDetails && "text-blue-600")}
                        alt={true}
                    />
                    Academics
                </button>
                <button
                    onClick={handleLogout}
                    id="profile"
                    className={`flex items-center text-left hover:bg-red-200 text-gray-700 mt-10  ml-8 mr-8 pt-3 pb-3 pl-10 rounded-md bg-red-100 transition-all`}
                >
                    <LogoutIcon myStyle={"h-5 w-5 mr-3 text-red-600"} alt={true} />
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
                                    setShowNotificationDropDown(!showNotificationDropDown);
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
                            <img
                                src={
                                    profileData?.avatar?.url === ""
                                        ? `https://avatars.dicebear.com/api/initials/${profileData?.firstname}.svg`
                                        : profileData?.avatar?.url
                                }
                                alt="avatar"
                                className="w-14 h-14 rounded-full"
                            />
                            <span>
                                <h3>{`${studentData?.data?.user?.firstname} ${studentData?.data?.user?.middlename} ${studentData?.data?.user?.lastname}`}</h3>
                                <h6>{`${studentData?.data?.user?.email}`}</h6>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="h-9/10 bg-gray-100 overflow-hidden">
                    {/* conditional rendering of the inner tab screens */}
                    {route.academicDetails && <AcademicDetails />}
                    {route.profile && <Profile profileData={profileData} />}
                    {route.home && <Home />}
                    {route.chat && <Chat />}
                    {route.post && (
                        <Post
                            socket={socket}
                            streamUpdated={streamUpdated}
                            setStreamUpdated={setStreamUpdated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
