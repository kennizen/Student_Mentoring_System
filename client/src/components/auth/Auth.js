import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { adminSignIn } from "../../actions/admin";
import { mentorSignIn, mentorSignUp } from "../../actions/mentor";
import { studentSignIn, studentSignUp } from "../../actions/student";

const Auth = ({ location }) => {
    // state variables declaration
    const [toggleLogin, setToggleLogin] = useState(false);
    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: "",
        confirmPassword: "",
        enrollmentNo: "",
        semester: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    // using use effect to prevent user from coming to auth through url
    useEffect(() => {
        if (location.state === undefined) {
            history.goBack();
        }
    }, [location.state, history]);

    // functions to control the form
    const resetFields = () => {
        // this function is used to reset the form fields to " "
        setFields({
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            password: "",
            confirmPassword: "",
            enrollmentNo: "",
            semester: "",
        });
    };

    const displaySuccessOrError = (val) => {
        if (val === 200) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                handleToggle();
            }, 2000);
        } else if (val === 500) {
            setIsError(true);
            setFields({ ...fields, email: "" });
            setTimeout(() => {
                setIsError(false);
            }, 5000);
        }
    };

    const handleToggle = () => {
        // this function is used to toggle between signin and signup
        setToggleLogin(!toggleLogin);
        resetFields();
    };

    const handleChange = (e) => {
        // this function is used to set the new form field values
        console.log(e.target.value);
        if (e.target.name === "semester" && e.target.value === "") return;
        setFields({ ...fields, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = (e) => {
        // this function is used to handle the form submission
        e.preventDefault();
        if (toggleLogin === false && location.state === "Admin") {
            // signin the admin
            dispatch(adminSignIn(fields, history));
        }
        if (location.state === "Mentor") {
            if (toggleLogin === true) {
                // signup mentor
                dispatch(mentorSignUp(fields, displaySuccessOrError));
            } else {
                // signin mentor
                dispatch(mentorSignIn(fields, history));
            }
        }
        if (location.state === "Mentee") {
            if (toggleLogin === true) {
                // signup mentee
                dispatch(studentSignUp(fields, displaySuccessOrError));
            } else {
                // signin mentee
                dispatch(studentSignIn(fields, history));
            }
        }
        resetFields();
    };

    console.log("fields", fields);

    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <h1>{isSuccess && "acc created successfully login to continue"}</h1>
            <h1>{isError && "Email already exist"}</h1>
            <h1 className="mb-10 text-center">{location.state}</h1>
            <div className="container bg-white sm:w-2/3 lg:w-4/12 py-5 px-10 rounded-lg shadow-lg">
                <form className="font-semibold" onSubmit={handleSubmit}>
                    {toggleLogin && (
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="firstName" className="mb-2">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={fields.firstName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="middleName" className="mb-2">
                                    Middle Name
                                </label>
                                <input
                                    id="middleName"
                                    name="middleName"
                                    type="text"
                                    value={fields.middleName}
                                    onChange={handleChange}
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="lastName" className="mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={fields.lastName}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    )}
                    {toggleLogin && location.state === "Mentee" ? (
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col mb-6">
                                <label htmlFor="enrollmentNo" className="mb-2">
                                    Enrollment No.
                                </label>
                                <input
                                    id="enrollmentNo"
                                    name="enrollmentNo"
                                    type="text"
                                    value={fields.enrollmentNo.toUpperCase()}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="semester" className="mb-2">
                                    Semester
                                </label>
                                <select
                                    id="semester"
                                    name="semester"
                                    className="rounded-lg border-gray-300"
                                    value={fields.semester}
                                    onChange={handleChange}
                                    required
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
                                    <option value="9th semester">9th semester</option>
                                    <option value="10th semester">10th semester</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="flex flex-col mb-6">
                        <label htmlFor="email" className="mb-2">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={fields.email}
                            onChange={handleChange}
                            required
                            className="rounded-lg border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="password" className="mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={fields.password}
                            onChange={handleChange}
                            required
                            className="rounded-lg border-gray-300"
                        />
                    </div>
                    {toggleLogin && (
                        <div className="flex flex-col mb-6">
                            <label htmlFor="confirmPassword" className="mb-2">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={fields.confirmPassword}
                                onChange={handleChange}
                                required
                                className="rounded-lg border-gray-300"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-400 hover:bg-blue-600 text-white font-semibold w-full p-2 rounded-lg mt-3"
                    >
                        {toggleLogin ? "Sign up" : "Sign in"}
                    </button>
                </form>
                {location.state === "Admin" ? (
                    <div></div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="mt-5 font-semibold">
                            {toggleLogin ? "Already have an account?" : "Don't have an account?"}
                        </h4>

                        <button
                            onClick={handleToggle}
                            className="rounded-md px-2 py-1 text-blue-400 hover:text-blue-700"
                        >
                            {toggleLogin ? "Sign in" : "Sign up"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;
