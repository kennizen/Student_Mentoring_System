import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdateProfileDetails } from "../../../../../../actions/student";

const StuModal = ({
    stuProfileData,
    setStuProfileData,
    nodeRef,
    setShowOverlay,
    setShowStuProfileModal,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [disable, setDisable] = useState(true);

    // function to update the state for the profile data
    const handleChange = (e) => {
        setDisable(false);
        setStuProfileData({ ...stuProfileData, [e.target.name]: e.target.value });
    };

    // function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(studentUpdateProfileDetails(history, stuProfileData));
        handleModalActions();
    };

    // function to handle modal actions
    const handleModalActions = () => {
        setShowOverlay(false);
        setShowStuProfileModal(false);
    };

    console.log(stuProfileData);

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-700 overflow-y-auto w-9/12 z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Edit information</h4>
                        <button onClick={handleModalActions} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-2 font-bold">Academic Information</h4>
                            <div className="grid grid-cols-5 gap-x-7 w-full">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="department" className="mb-2">
                                        Department
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.department}
                                        onChange={handleChange}
                                        required
                                        selected={stuProfileData.department}
                                    >
                                        <option value="">Select department</option>
                                        <option value="Computer Science & Engineering">
                                            Computer Science & Engineering
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="programme" className="mb-2">
                                        Programme
                                    </label>
                                    <select
                                        id="programme"
                                        name="programme"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.programme}
                                        onChange={handleChange}
                                        required
                                        selected={stuProfileData.programme}
                                    >
                                        <option value="">Select programme</option>
                                        <option value="B.Tech(CSE)">B.Tech (CSE)</option>
                                        <option value="MCA">MCA</option>
                                        <option value="M.Tech(IT)">M.Tech (IT)</option>
                                        <option value="M.Tech(CSE)">M.Tech (CSE)</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="semester" className="mb-2">
                                        Semester
                                    </label>
                                    <select
                                        id="semester"
                                        name="semester"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.semester}
                                        onChange={handleChange}
                                        required
                                        selected={stuProfileData.semester}
                                    >
                                        <option value="">Select semester</option>
                                        <option value="1st semester">1st semester</option>
                                        <option value="2nd semester">2nd semester</option>
                                        <option value="3rd semester">3rd semester</option>
                                        <option value="4th semester">4th semester</option>
                                        <option value="5th semester">5th semester</option>
                                        <option value="6th semester">6th semester</option>
                                        <option value="7th semester">7th semester</option>
                                        <option value="8th semester">8th semester</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="enrollment_no" className="mb-2">
                                        Enrollment number
                                    </label>
                                    <input
                                        id="enrollment_no"
                                        type="text"
                                        name="enrollment_no"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.enrollment_no}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="enrollment_year" className="mb-2">
                                        Enrollment year
                                    </label>
                                    <input
                                        id="enrollment_year"
                                        type="text"
                                        name="enrollment_year"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.enrollment_year}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-2 font-bold">Contact Details</h4>
                            <div className="grid grid-cols-3 gap-x-7 w-full">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="phone" className="mb-2">
                                        Phone number
                                    </label>
                                    <input
                                        id="phone_no"
                                        type="text"
                                        name="phone_no"
                                        maxLength="10"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.phone_no}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6 col-span-2">
                                    <label htmlFor="address" className="mb-2">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-2 font-bold">Personal Information</h4>
                            <div className="grid grid-cols-6 gap-x-7 w-full">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="firstname" className="mb-2">
                                        First name
                                    </label>
                                    <input
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        required
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="middlename" className="mb-2">
                                        Middle name
                                    </label>
                                    <input
                                        id="middlename"
                                        type="text"
                                        name="middlename"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.middlename}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="lastname" className="mb-2">
                                        Last name
                                    </label>
                                    <input
                                        id="lastname"
                                        required
                                        type="text"
                                        name="lastname"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="gender" className="mb-2">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.gender}
                                        onChange={handleChange}
                                        selected={stuProfileData.gender}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="blood_group" className="mb-2">
                                        Blood group
                                    </label>
                                    <select
                                        id="blood_group"
                                        name="blood_group"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.blood_group}
                                        onChange={handleChange}
                                        selected={stuProfileData.blood_group}
                                    >
                                        <option value="">Select group</option>
                                        <option value="A+ (positive)">A+ (positive)</option>
                                        <option value="B+ (positive)">B+ (positive)</option>
                                        <option value="O+ (positive)">O+ (positive)</option>
                                        <option value="AB+ (positive)">AB+ (positive)</option>
                                        <option value="A- (negative)">A- (negative)</option>
                                        <option value="B- (negative)">B- (negative)</option>
                                        <option value="O- (negative)">O- (negative)</option>
                                        <option value="AB- (negative)">AB- (negative)</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="home_address" className="mb-2">
                                        Home place
                                    </label>
                                    <input
                                        id="home_place"
                                        type="text"
                                        name="home_place"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.home_place}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-3 col-span-2">
                                    <label htmlFor="guardian_name" className="mb-2">
                                        Guardian name
                                    </label>
                                    <input
                                        id="guardian_name"
                                        type="text"
                                        name="guardian_name"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.guardian_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-3 col-span-2">
                                    <label htmlFor="guardian_ph_no" className="mb-2">
                                        Guardian phone number
                                    </label>
                                    <input
                                        id="guardian_ph_no"
                                        type="text"
                                        name="guardian_ph_no"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.guardian_ph_no}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-3 col-span-2">
                                    <label htmlFor="guardian_address" className="mb-2">
                                        Guardian address
                                    </label>
                                    <input
                                        id="guardian_address"
                                        type="text"
                                        name="guardian_address"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.guardian_address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6 col-span-3">
                                    <label htmlFor="hobbies" className="mb-2">
                                        Hobbies
                                    </label>
                                    <input
                                        id="hobbies"
                                        type="text"
                                        name="hobbies"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.hobbies}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6 col-span-3">
                                    <label htmlFor="family_details" className="mb-2">
                                        Family Details (occupation, members, etc)
                                    </label>
                                    <input
                                        id="family_details"
                                        type="text"
                                        name="family_details"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.family_details}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-2 font-bold">If hostel boarder</h4>
                            <div className="grid grid-cols-5 gap-x-7 w-full">
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="hostel_name" className="mb-2">
                                        Hostel name
                                    </label>
                                    <input
                                        id="hostel_name"
                                        type="text"
                                        name="hostel_name"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.hostel_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="warden_name" className="mb-2">
                                        Warden's name
                                    </label>
                                    <input
                                        id="warden_name"
                                        type="text"
                                        name="warden_name"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.warden_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="warden_ph_no" className="mb-2">
                                        Warden's ph. no.
                                    </label>
                                    <input
                                        id="warden_ph_no"
                                        type="text"
                                        name="warden_ph_no"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.warden_ph_no}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="asst_warden_name" className="mb-2">
                                        Asstt. warden's name
                                    </label>
                                    <input
                                        id="asst_warden_name"
                                        type="text"
                                        name="asst_warden_name"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.asst_warden_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="asst_warden_ph_no" className="mb-2">
                                        Asstt. warden's ph. no.
                                    </label>
                                    <input
                                        id="asst_warden_ph_no"
                                        type="text"
                                        name="asst_warden_ph_no"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.asst_warden_ph_no}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-2 font-bold">If not hostel boarder</h4>
                            <div className="grid grid-cols-3 gap-x-7 w-full">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="responsible_contact_person_at_residence"
                                        className="mb-2"
                                    >
                                        Responsible contact person at residence
                                    </label>
                                    <input
                                        id="responsible_contact_person_at_residence"
                                        type="text"
                                        name="responsible_contact_person_at_residence"
                                        className="rounded-lg border-gray-300"
                                        value={
                                            stuProfileData.responsible_contact_person_at_residence
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="contact_no_of_contact_person" className="mb-2">
                                        Contact no of contact person
                                    </label>
                                    <input
                                        id="contact_no_of_contact_person"
                                        type="text"
                                        name="contact_no_of_contact_person"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.contact_no_of_contact_person}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="residence_address" className="mb-2">
                                        Residence address
                                    </label>
                                    <input
                                        id="residence_address"
                                        type="text"
                                        name="residence_address"
                                        className="rounded-lg border-gray-300"
                                        value={stuProfileData.residence_address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end">
                            <button
                                disabled={disable}
                                type="submit"
                                className="p-2 bg-blue-600 rounded-md text-white disabled:opacity-50"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default StuModal;
