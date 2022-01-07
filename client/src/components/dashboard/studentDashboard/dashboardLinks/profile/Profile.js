import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../editButtonForMenteeInformation/EditButton";
import StuModal from "./stuModal/StuModal";
import { studentGetProfileDetails } from "../../../../../actions/student";

const Profile = () => {
    const [hidden, setHidden] = useState(false);
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
        }, 100);
    };

    // function to show modal
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
            <div className="grid grid-cols-12 gap-x-1">
                <div className="col-span-4 p-2">
                    <div className="w-full shadow-m32 py-6 px-3 rounded-md mb-6">
                        <h2 className="mb-5 text-gray-700 flex items-center justify-start">
                            Profile Photo
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </h2>
                        <div className="flex items-center justify-start">
                            <img
                                className="w-32 h-32 rounded-md mr-5"
                                src="https://avatars.dicebear.com/api/initials/student.svg"
                                alt="menteeName"
                            />
                            <div className="flex flex-col items-center justify-between">
                                <button className="p-2 bg-blue-600 rounded-md text-white flex items-center justify-between mb-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>
                                    Change
                                </button>
                                <button className="p-2 bg-blue-600 rounded-md text-white flex items-center justify-between">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full shadow-m32 py-5 px-3 rounded-md mb-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-gray-700 flex items-center justify-start">
                                Academic Information
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-2"
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
                                    <h4>{profileData?.mentoredBy}</h4>
                                </div>
                                <div className="flex items-start justify-center flex-col">
                                    <h4 className="text-gray-400">Enrollment Year</h4>
                                    <h4>{profileData?.enrollment_year}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full shadow-m32 py-5 px-3 rounded-md">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-gray-700 flex items-center justify-start">
                                Contact Details
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
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
                    <div className="w-full shadow-m32 py-5 px-3 rounded-md mb-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-gray-700 flex items-center justify-start">
                                Personal Information
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
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
                    <div className="w-full shadow-m32 py-5 px-3 rounded-md mb-3">
                        <h2 className="mb-5 text-gray-700 flex items-center justify-start">
                            Hostel Details
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
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
                        <EditButton handleShowModal={handleShowModal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
