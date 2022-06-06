import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { adminSignIn } from "../../actions/admin";
import { mentorSignIn, mentorSignUp } from "../../actions/mentor";
import { studentSignIn, studentSignUp } from "../../actions/student";
import ArrowRight from "../../assets/icons/ArrowRight";
import loginBg from "../../assets/images/login.png";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../toast/toast";
import { Checkbox, FormControlLabel } from "@mui/material";

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
        if (location.state === "Admin") {
            // signin the admin
            dispatch(adminSignIn(fields, history));
        } else if (location.state === "Mentor") {
            if (toggleLogin === true) {
                if (fields.password !== fields.confirmPassword) {
                    showToast("error", "passwords doesn't match", 5000);
                    return;
                }
                // signup mentor
                dispatch(mentorSignUp(fields, showToast, handleToggle));
            } else {
                // signin mentor
                dispatch(mentorSignIn(fields, history, showToast));
            }
        } else if (location.state === "Mentee") {
            if (toggleLogin === true) {
                if (fields.password !== fields.confirmPassword) {
                    showToast("error", "passwords doesn't match", 5000);
                    return;
                }
                // signup mentee
                dispatch(studentSignUp(fields, showToast, handleToggle));
            } else {
                // signin mentee
                dispatch(studentSignIn(fields, history, showToast));
            }
        }
        resetFields();
    };

    console.log("fields", fields);

    // function to handle captcha and sent to backend
    const handleCaptchaChange = (val) => {
        console.log(val);
    };

    // state to show and hide password
    const [showPass, setShowPass] = useState("password");

    // function to toggle show password state
    const handlePasswordShowToggle = () => {
        if (showPass === "password") setShowPass("text");
        if (showPass === "text") setShowPass("password");
    };

    return (
        <div className="w-full h-screen flex items-center">
            <div className="flex-3 bg-white h-full flex flex-col items-center justify-center">
                <div className="w-full">
                    <h1 style={{ fontSize: "50px" }} className="w-full text-center">
                        <span className="text-blue-500">{location.state}</span>{" "}
                        {toggleLogin ? "sign-up" : "sign-in"}
                    </h1>
                </div>
                <img src={loginBg} alt="" className="w-1/2" />
            </div>
            <div className="flex-2 bg-gray-600 h-full flex items-center justify-center">
                <div className="w-96">
                    <form className="" onSubmit={handleSubmit}>
                        {toggleLogin && (
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="firstName" className="mb-2 text-white">
                                        First name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={fields.firstName}
                                        onChange={handleChange}
                                        required
                                        className="rounded-md border-none"
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="middleName" className="mb-2 text-white">
                                        Middle name
                                    </label>
                                    <input
                                        id="middleName"
                                        name="middleName"
                                        type="text"
                                        value={fields.middleName}
                                        onChange={handleChange}
                                        className="rounded-lg border-none"
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="lastName" className="mb-2 text-white">
                                        Last name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={fields.lastName}
                                        onChange={handleChange}
                                        required
                                        className="rounded-lg border-none"
                                    />
                                </div>
                            </div>
                        )}
                        {toggleLogin && location.state === "Mentee" ? (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="enrollmentNo" className="mb-2 text-white">
                                        Enrollment No.
                                    </label>
                                    <input
                                        id="enrollmentNo"
                                        name="enrollmentNo"
                                        type="text"
                                        value={fields.enrollmentNo.toUpperCase()}
                                        onChange={handleChange}
                                        required
                                        className="rounded-lg border-none"
                                    />
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="semester" className="mb-2 text-white">
                                        Semester
                                    </label>
                                    <select
                                        id="semester"
                                        name="semester"
                                        className="rounded-lg border-none"
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
                            <label htmlFor="email" className="mb-2 text-white">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                value={fields.email}
                                onChange={handleChange}
                                required
                                className="rounded-lg border-none"
                            />
                        </div>
                        <div className="flex flex-col mb-1">
                            <label htmlFor="password" className="mb-2 text-white">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPass}
                                value={fields.password}
                                onChange={handleChange}
                                required
                                className="rounded-lg border-none"
                            />
                        </div>
                        {toggleLogin && (
                            <div className="flex flex-col mb-1">
                                <label htmlFor="confirmPassword" className="mb-2 text-white">
                                    Confirm password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPass}
                                    value={fields.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="rounded-lg border-none"
                                />
                            </div>
                        )}

                        <FormControlLabel
                            className="text-white"
                            onChange={handlePasswordShowToggle}
                            control={
                                <Checkbox
                                    sx={{
                                        color: "white",
                                        "&.Mui-checked": {
                                            color: "white",
                                        },
                                    }}
                                />
                            }
                            label="Show password"
                        />

                        {/* {toggleLogin || (
                            <ReCAPTCHA
                                className="flex items-center justify-center"
                                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                                onChange={handleCaptchaChange}
                            />
                        )} */}

                        <button
                            type="submit"
                            className="bg-white py-2 px-3 rounded-full flex items-center justify-center gap-x-2 w-full text-gray-600 group mt-4"
                        >
                            {toggleLogin ? "Sign up" : "Sign in"}
                            <ArrowRight
                                alt={false}
                                myStyle={"h-4 w-4 group-hover:translate-x-2 transform transition"}
                            />
                        </button>
                    </form>
                    {location.state === "Admin" ? (
                        ""
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <h4 className="mt-5 text-white">
                                {toggleLogin
                                    ? "Already have an account?"
                                    : "Don't have an account?"}
                            </h4>

                            <button
                                onClick={handleToggle}
                                className="rounded-md px-2 py-1 text-white hover:underline"
                            >
                                {toggleLogin ? "Sign in" : "Sign up"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer limit={5} draggable={false} />
        </div>
    );
};

export default Auth;
