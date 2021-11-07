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
                        <h4 className="mb-3 font-bold">Academic Details</h4>
                        <div className="grid grid-cols-5 gap-x-7 w-full">
                            <div className="flex flex-col mb-6">
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
                            <div className="flex flex-col mb-6">
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
                            <div className="flex flex-col mb-6">
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
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="mb-3 font-bold">Contact Details</h4>
                        <div className="grid grid-cols-3 gap-x-7 w-full">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6 col-span-2">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="mb-3 font-bold">Personal Details</h4>
                        <div className="grid grid-cols-6 gap-x-7 w-full">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6 col-span-2">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6 col-span-2">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6 col-span-2">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6 col-span-3">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6 col-span-3">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="mb-3 font-bold">If hostel boarder</h4>
                        <div className="grid grid-cols-5 gap-x-7 w-full">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="mb-3 font-bold">If not hostel boarder</h4>
                        <div className="grid grid-cols-3 gap-x-7 w-full">
                            <div className="flex flex-col">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
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
