import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CSSTransition } from "react-transition-group";
import { mentorGetProfile } from "../../../../../actions/mentor";

import AcademicCapIcon from "../../../../../assets/AcademicCapIcon";
import PencilIcon from "../../../../../assets/PencilIcon";
import TrashIcon from "../../../../../assets/TrashIcon";
import UploadIcon from "../../../../../assets/UploadIcon";
import UserCircleIcon from "../../../../../assets/UserCircleIcon";
import UserGroupIcon from "../../../../../assets/UserGroupIcon";

import ModalOverlay from "../../../../modal/ModalOverlay";
import ProfilePicModal from "../../../studentDashboard/dashboardLinks/profile/profilePicModal/ProfilePicModal";
import ProfileModal from "./ProfileModal";

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // function to fetch profile data for the mentor
    useEffect(() => {
        dispatch(mentorGetProfile(history));
    }, []);

    // accessing the global state for the mentor profile data
    const { profileData } = useSelector((state) => state.mentor);

    // state for the modal field values
    const [mentorProfileData, setMentorProfileData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        department: "",
        designation: "",
        studentCount: 0,
    });

    // state for modals show and hide
    const [showOverlay, setShowOverlay] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [hiddenProfilePicModal, setHiddenProfilePicModal] = useState(false);

    // refs used for css transition to work for the modal and the overlay
    const editModalRef = useRef(null);
    const overlayRef = useRef(null);
    const profilePicEditModalOverlay = useRef(null);

    // function to handle modal show hide
    const handleShowModal = () => {
        setShowOverlay(true);
        setShowEditModal(true);
        setMentorProfileData({
            firstname: profileData.firstname ? profileData.firstname : "",
            middlename: profileData.middlename ? profileData.middlename : "",
            lastname: profileData.lastname ? profileData.lastname : "",
            email: profileData.email ? profileData.email : "",
            phone: profileData.phone ? profileData.phone : "",
            address: profileData.address ? profileData.address : "",
            department: profileData.department ? profileData.department : "",
            designation: profileData.designation ? profileData.designation : "",
            studentCount: profileData.studentCount ? profileData.studentCount : 0,
        });
    };

    console.log("profile data", profileData);
    console.log(mentorProfileData);

    return (
        <div className="w-full h-full flex items-center justify-center relative">
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
                nodeRef={editModalRef}
                in={showEditModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ProfileModal
                    nodeRef={editModalRef}
                    mentorProfileData={mentorProfileData}
                    setMentorProfileData={setMentorProfileData}
                    setShowOverlay={setShowOverlay}
                    setShowEditModal={setShowEditModal}
                />
            </CSSTransition>
            <CSSTransition
                nodeRef={profilePicEditModalOverlay}
                in={hiddenProfilePicModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ProfilePicModal
                    setShowOverlay={setShowOverlay}
                    setHiddenProfilePicModal={setHiddenProfilePicModal}
                    nodeRef={profilePicEditModalOverlay}
                />
            </CSSTransition>
            <div className="w-3/5 rounded-md p-4">
                <div className="flex gap-x-2 mb-3">
                    <div className="bg-white px-5 py-10 shadow-md rounded-md">
                        <h3 className="mb-5 flex items-center">
                            Profile Photo <UserCircleIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                        </h3>
                        <div className="flex items-center">
                            <img
                                className="w-32 h-32 rounded-md mr-5"
                                src={
                                    profileData?.avatar?.url === ""
                                        ? `https://avatars.dicebear.com/api/initials/${profileData?.firstname}.svg`
                                        : profileData?.avatar?.url
                                }
                                alt="menteeName"
                            />
                            <div className="flex flex-col items-center justify-between">
                                <button
                                    onClick={() => {
                                        setHiddenProfilePicModal(true);
                                        setShowOverlay(true);
                                    }}
                                    className="p-2 bg-blue-600 border border-blue-600 hover:bg-blue-800 hover:border-blue-800 transition-all rounded-md text-white flex items-center justify-between mb-5"
                                >
                                    <UploadIcon alt={false} myStyle={"h-5 w-5 mr-2"} />
                                    Change
                                </button>
                                <button
                                    // onClick={handleShowModalDelProfilePic}
                                    className="p-2 border border-red-600 text-red-600 rounded-md flex items-center justify-between hover:bg-red-600 hover:text-white transition-all"
                                >
                                    <TrashIcon alt={false} myStyle={"h-5 w-5 mr-2"} />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-5 py-10 rounded-md flex-grow shadow-md">
                        <h3 className="mb-5 flex items-center">
                            Personal Information
                            <UserGroupIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                        </h3>
                        <div className="grid grid-cols-3 w-full">
                            <div className="flex items-start justify-center flex-col mb-4">
                                <h4 className="text-gray-400">First Name</h4>
                                <h4>{profileData?.firstname}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col mb-4">
                                <h4 className="text-gray-400">Middle Name</h4>
                                <h4>{profileData?.middlename}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col mb-4">
                                <h4 className="text-gray-400">Last Name</h4>
                                <h4>{profileData?.lastname}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <h4 className="text-gray-400">Email</h4>
                                <h4>{profileData?.email}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <h4 className="text-gray-400">Phone No.</h4>
                                <h4>{profileData?.phone}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <h4 className="text-gray-400">Address</h4>
                                <h4>{profileData?.address}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-5 py-10 shadow-md rounded-md">
                    <h3 className="mb-5 flex items-center">
                        Professional Details
                        <AcademicCapIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                    </h3>
                    <div className="flex items-end justify-between">
                        <div className="grid grid-cols-2 w-full">
                            <div className="flex items-start justify-center flex-col mb-4">
                                <h4 className="text-gray-400">Department</h4>
                                <h4 className="break-normal w-9/10">{profileData?.department}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col mb-4">
                                <h4 className="text-gray-400">Designation</h4>
                                <h4>{profileData?.designation}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <h4 className="text-gray-400">Assigned</h4>
                                <h4>{profileData?.assigned}</h4>
                            </div>
                            <div className="flex items-start justify-center flex-col">
                                <h4 className="text-gray-400">Students under you</h4>
                                <h4>{profileData?.studentCount}</h4>
                            </div>
                        </div>
                        <button
                            onClick={handleShowModal}
                            title="edit"
                            className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white flex-shrink-0"
                        >
                            <PencilIcon alt={true} myStyle={"h-5 w-5 mr-2"} />
                            Update Information
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
