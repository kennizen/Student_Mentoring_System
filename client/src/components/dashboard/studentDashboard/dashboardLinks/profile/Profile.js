import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import StuModal from "./stuModal/StuModal";
import { studentGetProfileDetails } from "../../../../../actions/student";
import UserCircleIcon from "../../../../../assets/UserCircleIcon";
import ProfilePicModal from "./profilePicModal/ProfilePicModal";
import ProfilePicDelModal from "./profilePicModal/ProfilePicDelModal";

import PencilIcon from "../../../../../assets/PencilIcon";
import UploadIcon from "../../../../../assets/UploadIcon";
import TrashIcon from "../../../../../assets/TrashIcon";
import AcademicCapIcon from "../../../../../assets/AcademicCapIcon";
import PhoneIcon from "../../../../../assets/PhoneIcon";
import UserGroupIcon from "../../../../../assets/UserGroupIcon";
import OfficeBuildingIcon from "../../../../../assets/OfficeBuildingIcon";

const Profile = () => {
    // state variable to change the hidden state of the update information modal
    const [hidden, setHidden] = useState(false);
    // state variable to change the hidden state of the change profile pic modal
    const [hiddenProfilePicModal, setHiddenProfilePicModal] = useState(false);
    // state variable to change the hidden state of the remove profile pic modal
    const [hiddenProfilePicDelModal, setHiddenProfilePicDelModal] = useState(false);

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

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(studentGetProfileDetails(history));
    }, [history, dispatch]);

    const { profileData } = useSelector((state) => state.student);

    // function to show modal
    const handleShowModalFromModal = (setOp, setSc) => {
        setOp("opacity-0");
        setSc("scale-0");
        setTimeout(() => {
            setHidden(false);
            setHiddenProfilePicModal(false);
            setHiddenProfilePicDelModal(false);
        }, 100);
    };

    // function to show modal for update information
    const handleShowModal = () => {
        setHidden(true);
        if (profileData) {
            setStuProfileData({
                department: profileData.department,
                programme: profileData.programme,
                semester: profileData.semester,
                enrollment_no: profileData.enrollment_no,
                enrollment_year: profileData.enrollment_year,
                phone_no: profileData.phone_no,
                address: profileData.address,
                firstname: profileData.firstname,
                middlename: profileData.middlename,
                lastname: profileData.lastname,
                gender: profileData.gender,
                blood_group: profileData.blood_group,
                home_place: profileData.home_place,
                hobbies: profileData.hobbies,
                guardian_name: profileData.guardian_name,
                guardian_ph_no: profileData.guardian_ph_no,
                guardian_address: profileData.guardian_address,
                family_details: profileData.family_details,
                hostel_name: profileData.hostel_name,
                warden_name: profileData.warden_name,
                asst_warden_name: profileData.asst_warden_name,
                warden_ph_no: profileData.warden_ph_no,
                asst_warden_ph_no: profileData.asst_warden_ph_no,
                responsible_contact_person_at_residence:
                    profileData.responsible_contact_person_at_residence,
                contact_no_of_contact_person: profileData.contact_no_of_contact_person,
                residence_address: profileData.residence_address,
            });
        }
    };

    // function to show modal for update profile pic
    const handleShowModalProfilePic = () => {
        setHiddenProfilePicModal(true);
    };

    // function to show modal for remove profile picture
    const handleShowModalDelProfilePic = () => {
        setHiddenProfilePicDelModal(true);
    };

    return (
        <div className="w-full h-845 p-2 relative">
            {hidden && (
                <StuModal
                    handleShowModal={handleShowModalFromModal}
                    stuProfileData={stuProfileData}
                    setStuProfileData={setStuProfileData}
                    history={history}
                    dispatch={dispatch}
                />
            )}
            {hiddenProfilePicModal && (
                <ProfilePicModal handleShowModal={handleShowModalFromModal} history={history} />
            )}
            {hiddenProfilePicDelModal && (
                <ProfilePicDelModal
                    handleShowModal={handleShowModalFromModal}
                    b1Text="Cancel"
                    b2Text="Remove"
                    body="If you remove the profile picture then it will be reverted back to the default image."
                    header="Remove profile picture ?"
                    history={history}
                />
            )}
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
                                        ? `https://avatars.dicebear.com/api/initials/${profileData?.firstname}.svg`
                                        : profileData?.avatar?.url
                                }
                                alt="menteeName"
                            />
                            <div className="flex flex-col items-center justify-between">
                                <button
                                    onClick={handleShowModalProfilePic}
                                    className="p-2 bg-blue-600 border border-blue-600 hover:bg-blue-800 hover:border-blue-800 transition-all rounded-md text-white flex items-center justify-between mb-5"
                                >
                                    <UploadIcon alt={false} myStyle={"h-5 w-5 mr-2"} />
                                    Change
                                </button>
                                <button
                                    onClick={handleShowModalDelProfilePic}
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
                                    <h4>{profileData?.responsible_contact_person_at_residence}</h4>
                                </div>
                                <div className="flex col-span-1 mb-4 items-start justify-center flex-col">
                                    <h4 className="text-gray-400">Contact no. of contact person</h4>
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
        </div>
    );
};

export default Profile;
