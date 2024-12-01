import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CSSTransition } from "react-transition-group";
import { mentorGetProfile } from "../../../../../actions/mentor";
import { studentGetProfileDetails } from "../../../../../actions/student";

import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import OfficeBuildingIcon from "../../../../../assets/icons/OfficeBuildingIcon";
import PencilIcon from "../../../../../assets/icons/PencilIcon";
import PhoneIcon from "../../../../../assets/icons/PhoneIcon";
import TrashIcon from "../../../../../assets/icons/TrashIcon";
import UploadIcon from "../../../../../assets/icons/UploadIcon";
import UserCircleIcon from "../../../../../assets/icons/UserCircleIcon";
import UserGroupIcon from "../../../../../assets/icons/UserGroupIcon";

import ModalOverlay from "../../../../modal/ModalOverlay";
import ProfilePicDelModal from "./profilePicModal/ProfilePicDelModal";
import ProfilePicModal from "./profilePicModal/ProfilePicModal";
import ProfileModal from "./ProfileModal";
import StuModal from "./stuModal/StuModal";
import { Roles } from "../../../../../utility";
import { authContext } from "../../../../../contexts/authContext";

const Profile = ({ profileData }) => {
    // getting uid of the logged in user
    const { role } = useContext(authContext);

    const dispatch = useDispatch();
    const history = useHistory();

    // function to fetch profile data for the mentor
    useEffect(() => {
        if (role === Roles.MENTOR) {
            dispatch(mentorGetProfile(history));
        } else if (role === Roles.STUDENT) {
            dispatch(studentGetProfileDetails(history));
        }
    }, []);

    // accessing the global state for the mentor profile data
    // const { profileData } = useSelector((state) => state.mentor);

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

    // state to store the profile data fetched from the api
    const [stuProfileData, setStuProfileData] = useState({
        department: "",
        programme: "",
        semester: "",
        enrollment_no: "",
        enrollment_year: "",
        phone_no: "",
        address: "",
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        blood_group: "",
        home_place: "",
        hobbies: "",
        guardian_name: "",
        guardian_ph_no: "",
        guardian_address: "",
        family_details: "",
        hostel_name: "",
        warden_name: "",
        asst_warden_name: "",
        warden_ph_no: "",
        asst_warden_ph_no: "",
        responsible_contact_person_at_residence: "",
        contact_no_of_contact_person: "",
        residence_address: "",
    });

    // state for modals show and hide
    const [showOverlay, setShowOverlay] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [hiddenProfilePicDelModal, setHiddenProfilePicDelModal] = useState(false);
    const [hiddenProfilePicModal, setHiddenProfilePicModal] = useState(false);
    const [showStuProfileModal, setShowStuProfileModal] = useState(false);

    // refs used for css transition to work for the modal and the overlay
    const editModalRef = useRef(null);
    const overlayRef = useRef(null);
    const profilePicEditModalOverlay = useRef(null);
    const profilePicDeleteModalRef = useRef(null);
    const stuProfileModalRef = useRef(null);

    // function to handle modal show hide
    const handleShowModal = () => {
        setShowOverlay(true);
        if (role === Roles.MENTOR) {
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
        } else if (role === Roles.STUDENT) {
            setShowStuProfileModal(true);
            setStuProfileData({
                department: profileData.department ? profileData.department : "",
                programme: profileData.programme ? profileData.programme : "",
                semester: profileData.semester ? profileData.semester : "",
                enrollment_no: profileData.enrollment_no ? profileData.enrollment_no : "",
                enrollment_year: profileData.enrollment_year ? profileData.enrollment_year : "",
                phone_no: profileData.phone_no ? profileData.phone_no : "",
                address: profileData.address ? profileData.address : "",
                firstname: profileData.firstname ? profileData.firstname : "",
                middlename: profileData.middlename ? profileData.middlename : "",
                lastname: profileData.lastname ? profileData.lastname : "",
                gender: profileData.gender ? profileData.gender : "",
                blood_group: profileData.blood_group ? profileData.blood_group : "",
                home_place: profileData.home_place ? profileData.home_place : "",
                hobbies: profileData.hobbies ? profileData.hobbies : "",
                guardian_name: profileData.guardian_name ? profileData.guardian_name : "",
                guardian_ph_no: profileData.guardian_ph_no ? profileData.guardian_ph_no : "",
                guardian_address: profileData.guardian_address ? profileData.guardian_address : "",
                family_details: profileData.family_details ? profileData.family_details : "",
                hostel_name: profileData.hostel_name ? profileData.hostel_name : "",
                warden_name: profileData.warden_name ? profileData.warden_name : "",
                asst_warden_name: profileData.asst_warden_name ? profileData.asst_warden_name : "",
                warden_ph_no: profileData.warden_ph_no ? profileData.warden_ph_no : "",
                asst_warden_ph_no: profileData.asst_warden_ph_no
                    ? profileData.asst_warden_ph_no
                    : "",
                responsible_contact_person_at_residence:
                    profileData.responsible_contact_person_at_residence
                        ? profileData.responsible_contact_person_at_residence
                        : "",
                contact_no_of_contact_person: profileData.contact_no_of_contact_person
                    ? profileData.contact_no_of_contact_person
                    : "",
                residence_address: profileData.residence_address
                    ? profileData.residence_address
                    : "",
            });
        }
    };

    // console.log("profile data", profileData);
    // console.log(mentorProfileData);

    return (
        <div
            className={`w-full h-full ${role === Roles.MENTOR && "flex items-center justify-center"
                } ${role === Roles.STUDENT && "p2"} relative`}
        >
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
            <CSSTransition
                nodeRef={profilePicDeleteModalRef}
                in={hiddenProfilePicDelModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ProfilePicDelModal
                    setShowOverlay={setShowOverlay}
                    setHiddenProfilePicDelModal={setHiddenProfilePicDelModal}
                    nodeRef={profilePicDeleteModalRef}
                />
            </CSSTransition>

            {role === Roles.MENTOR && (
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
            )}
            {role === Roles.MENTOR && (
                <div className="w-3/5 rounded-md p-4">
                    <div className="flex gap-x-2 mb-3">
                        <div className="bg-white px-5 py-10 shadow-md rounded-md">
                            <h3 className="mb-5 flex items-center">
                                Profile Photo
                                <UserCircleIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                            </h3>
                            <div className="flex items-center gap-x-3">
                                <img
                                    className="w-32 h-32 rounded-md"
                                    src={
                                        profileData?.avatar?.url === ""
                                            ? `https://api.dicebear.com/9.x/personas/svg`
                                            : profileData?.avatar?.url
                                    }
                                    alt="menteeName"
                                />
                                <div className="flex flex-col items-center justify-between w-full">
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
                                        onClick={() => {
                                            setHiddenProfilePicDelModal(true);
                                            setShowOverlay(true);
                                        }}
                                        className="p-2 border border-red-600 text-red-600 rounded-md flex items-center justify-between hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <TrashIcon alt={false} myStyle={"h-5 w-5 mr-2"} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-5 py-10 rounded-md shadow-md flex-grow">
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
                                    <h4 className="text-gray-400">Phone No.</h4>
                                    <h4>{profileData?.phone}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col">
                                    <h4 className="text-gray-400">Address</h4>
                                    <h4>{profileData?.address}</h4>
                                </div>
                            </div>
                            <div className="flex items-start justify-center flex-col break-words break-all mt-5">
                                <h4 className="text-gray-400">Email</h4>
                                <h4>{profileData?.email}</h4>
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
                                    <h4 className="break-normal w-9/10">
                                        {profileData?.department}
                                    </h4>
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
            )}

            {role === Roles.STUDENT && (
                <CSSTransition
                    nodeRef={stuProfileModalRef}
                    in={showStuProfileModal}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <StuModal
                        nodeRef={stuProfileModalRef}
                        setShowOverlay={setShowOverlay}
                        setShowStuProfileModal={setShowStuProfileModal}
                        stuProfileData={stuProfileData}
                        setStuProfileData={setStuProfileData}
                    />
                </CSSTransition>
            )}
            {role === Roles.STUDENT && (
                <div className="grid grid-cols-12 gap-x-1">
                    <div className="col-span-4 p-2">
                        <div className="w-full shadow-m32 py-6 px-3 rounded-md mb-6 bg-white">
                            <h2 className="mb-5 text-gray-700 flex items-center justify-start">
                                Profile Photo
                                <UserCircleIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                            </h2>
                            <div className="flex items-center justify-start">
                                <img
                                    className="w-32 h-32 rounded-md mr-5"
                                    src={
                                        profileData?.avatar?.url === ""
                                            ? `https://api.dicebear.com/9.x/personas/svg`
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
                                        onClick={() => {
                                            setShowOverlay(true);
                                            setHiddenProfilePicDelModal(true);
                                        }}
                                        className="p-2 border border-red-600 text-red-600 rounded-md flex items-center justify-between hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <TrashIcon alt={false} myStyle={"h-5 w-5 mr-2"} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white shadow-m32 py-5 px-3 rounded-md mb-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-gray-700 flex items-center justify-start">
                                    Academic Information
                                    <AcademicCapIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                                </h2>
                            </div>
                            <div className="grid grid-cols-6">
                                <div className="col-span-3">
                                    <div className="flex items-start justify-center flex-col mb-4">
                                        <h4 className="text-gray-400">Department</h4>
                                        <h4 className="pr-4">{profileData?.department}</h4>
                                    </div>
                                    <div className="flex items-start justify-center flex-col mb-4">
                                        <h4 className="text-gray-400">Semester</h4>
                                        <h4>{profileData?.semester}</h4>
                                    </div>
                                    <div className="flex items-start justify-center flex-col">
                                        <h4 className="text-gray-400">Enrollment Number</h4>
                                        <h4>{profileData?.enrollment_no}</h4>
                                    </div>
                                </div>
                                <div className="col-start-4 col-span-3">
                                    <div className="flex items-start justify-center flex-col mb-4">
                                        <h4 className="text-gray-400">Programme</h4>
                                        <h4>{profileData?.programme}</h4>
                                    </div>
                                    <div className="flex items-start justify-center flex-col mb-4">
                                        <h4 className="text-gray-400">Mentored By</h4>
                                        <h4>{profileData?.mentoredBy?.name}</h4>
                                    </div>
                                    <div className="flex items-start justify-center flex-col">
                                        <h4 className="text-gray-400">Enrollment Year</h4>
                                        <h4>{profileData?.enrollment_year}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white shadow-m32 py-5 px-3 rounded-md">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-gray-700 flex items-center justify-start">
                                    Contact Details
                                    <PhoneIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                                </h2>
                            </div>
                            <div className="">
                                <div className="flex flex-col items-start mb-4">
                                    <h4 className="text-gray-400">Email ID</h4>
                                    <h4>{profileData?.email}</h4>
                                </div>
                                <div className="flex flex-col items-start mb-4">
                                    <h4 className="text-gray-400">Phone Number</h4>
                                    <h4>{profileData?.phone_no}</h4>
                                </div>
                                <div className="flex flex-col items-start">
                                    <h4 className="text-gray-400">Address</h4>
                                    <h4>{profileData?.address}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-8 p-2">
                        <div className="w-full bg-white shadow-m32 py-5 px-3 rounded-md mb-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-gray-700 flex items-center justify-start">
                                    Personal Information
                                    <UserGroupIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                                </h2>
                            </div>

                            <div className="grid grid-cols-3">
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
                                <div className="flex items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Gender</h4>
                                    <h4>{profileData?.gender}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Blood Group</h4>
                                    <h4>{profileData?.blood_group}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Home Place</h4>
                                    <h4>{profileData?.home_place}</h4>
                                </div>
                                <div className="flex col-span-3 items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Hobbies</h4>
                                    <h4>{profileData?.hobbies}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Guardian Name</h4>
                                    <h4>{profileData?.guardian_name}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Guardian Ph No.</h4>
                                    <h4>{profileData?.guardian_ph_no}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col mb-4">
                                    <h4 className="text-gray-400">Guardian Address</h4>
                                    <h4>{profileData?.guardian_address}</h4>
                                </div>
                                <div className="flex col-span-3 items-start justify-center flex-col">
                                    <h4 className="text-gray-400">
                                        Family Details (occupation, members, etc)
                                    </h4>
                                    <h4>{profileData?.family_details}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white shadow-m32 py-5 px-3 rounded-md mb-3">
                            <h2 className="mb-5 text-gray-700 flex items-center justify-start">
                                Hostel Details
                                <OfficeBuildingIcon alt={false} myStyle={"h-5 w-5 ml-2"} />
                            </h2>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div className="col-span-1 grid grid-cols-2 border-r border-gray-300">
                                    <div className="flex items-center justify-between mb-4 col-span-2 mr-3">
                                        <h4 className="font-bold">If hostel boarder</h4>
                                    </div>

                                    <div className="flex col-span-2 mb-4 items-start justify-center flex-col">
                                        <h4 className="text-gray-400">Hostel Name</h4>
                                        <h4>{profileData?.hostel_name}</h4>
                                    </div>
                                    <div className="flex  items-start justify-center mb-2 flex-col">
                                        <h4 className="text-gray-400">Warden's Name</h4>
                                        <h4>{profileData?.warden_name}</h4>
                                    </div>
                                    <div className="flex items-start justify-center mb-2 flex-col">
                                        <h4 className="text-gray-400">Asst Warden's Name</h4>
                                        <h4>{profileData?.asst_warden_name}</h4>
                                    </div>
                                    <div className="flex items-start justify-center flex-col">
                                        <h4 className="text-gray-400">Ph No.</h4>
                                        <h4>{profileData?.warden_ph_no}</h4>
                                    </div>
                                    <div className="flex items-start justify-center flex-col">
                                        <h4 className="text-gray-400">Ph No.</h4>
                                        <h4>{profileData?.asst_warden_ph_no}</h4>
                                    </div>
                                </div>
                                <div className="col-span-1 grid grid-cols-1">
                                    <div className="flex items-center justify-between mb-4 col-span-1">
                                        <h4 className="font-bold">If not hostel boarder</h4>
                                    </div>
                                    <div className="flex col-span-1 mb-4 items-start justify-center flex-col">
                                        <h4 className="text-gray-400">
                                            Responsible contact person at residence
                                        </h4>
                                        <h4>
                                            {profileData?.responsible_contact_person_at_residence}
                                        </h4>
                                    </div>
                                    <div className="flex col-span-1 mb-4 items-start justify-center flex-col">
                                        <h4 className="text-gray-400">
                                            Contact no. of contact person
                                        </h4>
                                        <h4>{profileData?.contact_no_of_contact_person}</h4>
                                    </div>
                                    <div className="flex col-span-1 items-start justify-center flex-col">
                                        <h4 className="text-gray-400">Reidence Address</h4>
                                        <h4>{profileData?.residence_address}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end mt-5">
                            <button
                                onClick={handleShowModal}
                                title="edit"
                                className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white"
                            >
                                <PencilIcon alt={true} myStyle={"h-5 w-5 mr-2"} />
                                Update Information
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
