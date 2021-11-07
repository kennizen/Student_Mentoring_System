import React, { useState, useEffect } from "react";

const StuModal = ({ header, body, b2Text, handleFunc, handleShowModal, id }) => {
    const [op, setOp] = useState("opacity-0");
    const [sc, setSc] = useState("scale-0");

    useEffect(() => {
        setTimeout(() => {
            setOp("opacity-50");
            setSc("scale-100");
        }, 0);
    }, []);

    return (
        <>
            <div
                onClick={() => handleShowModal(setOp, setSc)}
                className={`${op} absolute flex items-center justify-center bg-black w-full h-full top-0 right-0 z-30 transition-opacity`}
            ></div>
            <div
                className={`${sc} absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-3/4 max-h-800 overflow-y-auto z-50 p-6 bg-white transition-all rounded-md`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold">Edit Details</h2>
                    <button onClick={() => handleShowModal(setOp, setSc)} className="text-2xl">
                        &times;
                    </button>
                </div>

                <form action="" className="">
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
                                >
                                    <option disabled selected hidden>
                                        Select department
                                    </option>
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
                                >
                                    <option disabled selected hidden>
                                        Select programme
                                    </option>
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
                                <input
                                    id="semester"
                                    type="text"
                                    name="semester"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
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
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    required
                                    maxLength="10"
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="lastname" className="mb-2">
                                    Last name
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    required
                                    className="rounded-lg border-gray-300"
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
                                >
                                    <option disabled selected hidden>
                                        Select gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
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
                                >
                                    <option disabled selected hidden>
                                        Select group
                                    </option>
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
                                    Home address
                                </label>
                                <input
                                    id="home_address"
                                    type="text"
                                    name="home_address"
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="asstt_warden_name" className="mb-2">
                                    Asstt. warden's name
                                </label>
                                <input
                                    id="asstt_warden_name"
                                    type="text"
                                    name="asstt_warden_name"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="asstt_warden_ph_no" className="mb-2">
                                    Asstt. warden's ph. no.
                                </label>
                                <input
                                    id="asstt_warden_ph_no"
                                    type="text"
                                    name="asstt_warden_ph_no"
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
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
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <div className="w-full flex items-center justify-end">
                    <button
                        onClick={() => {
                            handleFunc(id);
                            handleShowModal(setOp, setSc);
                        }}
                        type="submit"
                        className="p-2 bg-blue-600 rounded-md text-white disabled:opacity-50"
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    );
};

export default StuModal;
