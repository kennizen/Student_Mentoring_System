import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { adminSignIn } from "../../actions/admin";
import { mentorSignIn, mentorSignUp } from "../../actions/mentor";
import { studentSignIn, studentSignUp } from "../../actions/student";
import ArrowRight from "../../assets/icons/ArrowRight";
import loginBg from "../../assets/images/login.png";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import { showToast } from "../toast/toast";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../modal/ModalOverlay";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { verifyRecaptcha } from "../../actions";

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
        department: "",
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
            department: "",
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
        // if (toggleLogin === false && recaptcha) return;
        if (location.state === "Admin") {
            // signin the admin
            dispatch(adminSignIn(fields, history));
        } else if (location.state === "Mentor") {
            if (toggleLogin === true) {
                if (fields.password !== fields.confirmPassword) {
                    showToast("error", "passwords doesn't match", 5000, toast.POSITION.TOP_RIGHT);
                    return;
                }
                // signup mentor
                dispatch(mentorSignUp(fields, handleToggle));
            } else {
                // signin mentor
                dispatch(mentorSignIn(fields, history));
            }
        } else if (location.state === "Mentee") {
            if (toggleLogin === true) {
                if (fields.password !== fields.confirmPassword) {
                    showToast("error", "passwords doesn't match", 5000, toast.POSITION.TOP_RIGHT);
                    return;
                }
                // signup mentee
                dispatch(studentSignUp(fields, handleToggle));
            } else {
                // signin mentee
                dispatch(studentSignIn(fields, history));
            }
        }
        resetFields();
    };

    console.log("fields", fields);

    // state for the login button dependent on recaptcha
    const [recaptcha, setRecaptcha] = useState(true);

    // function to handle captcha and send to backend
    const handleCaptchaChange = (val) => {
        dispatch(verifyRecaptcha(val, setRecaptcha));
    };

    // state to show and hide password
    const [showPass, setShowPass] = useState("password");
    // state for forgot passowrd email
    const [FPEmail, setFPEmail] = useState({
        role: location.state,
        email: "",
    });

    // function to toggle show password state
    const handlePasswordShowToggle = () => {
        if (showPass === "password") setShowPass("text");
        if (showPass === "text") setShowPass("password");
    };

    // states for modal
    // state to control the modal show and dont show
    const [showModal, setShowModal] = useState(false);

    // refs used for css transition to work for the modal and the overlay
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    console.log(FPEmail);

    return (
        <div className="w-full h-screen flex items-center">
            <CSSTransition nodeRef={overlayRef} in={showModal} timeout={300} classNames="overlay" unmountOnExit>
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            <CSSTransition nodeRef={modalRef} in={showModal} timeout={300} classNames="modal" unmountOnExit>
                <ForgotPasswordModal nodeRef={modalRef} setShowModal={setShowModal} setFPEmail={setFPEmail} FPEmail={FPEmail} />
            </CSSTransition>
            <div className="flex-3 bg-white h-full flex flex-col items-center justify-center">
                <div className="w-full">
                    <h1 style={{ fontSize: "50px" }} className="w-full text-center">
                        <span className="text-blue-500">{location.state}</span> {toggleLogin ? "sign-up" : "sign-in"}
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
                            ""
                        )}
                        {toggleLogin && (
                            <div className="flex flex-col mb-6">
                                <label htmlFor="department" className="mb-2 text-white">
                                    Department
                                </label>
                                <select
                                    id="department"
                                    name="department"
                                    className="rounded-lg border-gray-300"
                                    value={fields.department}
                                    onChange={handleChange}
                                    required
                                    selected={fields.department}
                                >
                                    <option value="">Select department</option>
                                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                                </select>
                            </div>
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

                        <div className="flex items-center justify-between">
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
                            {toggleLogin || (
                                <button type="button" onClick={() => setShowModal(true)} className="text-white hover:underline">
                                    Forgot password
                                </button>
                            )}
                        </div>

                        {/* {toggleLogin || (
                            <ReCAPTCHA
                                className="flex items-center justify-center"
                                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                                onChange={handleCaptchaChange}
                            />
                        )} */}

                        <button
                            type="submit"
                            className="bg-white py-2 px-3 rounded-full flex items-center justify-center gap-x-2 w-full text-gray-600 group mt-4 disabled:opacity-50"
                        >
                            {toggleLogin ? "Sign up" : "Sign in"}
                            <ArrowRight alt={false} myStyle={"h-4 w-4 group-hover:translate-x-2 transform transition"} />
                        </button>
                    </form>
                    {location.state === "Admin" ? (
                        ""
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <h4 className="mt-5 text-white">{toggleLogin ? "Already have an account?" : "Don't have an account?"}</h4>

                            <button onClick={handleToggle} className="rounded-md px-2 py-1 text-white hover:underline">
                                {toggleLogin ? "Sign in" : "Sign up"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer limit={5} draggable={false} pauseOnFocusLoss={false} />
        </div>
    );
};

export default Auth;
