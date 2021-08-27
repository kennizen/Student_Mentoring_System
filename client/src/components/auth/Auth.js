import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { adminSignIn } from "../../actions/admin";

const Auth = ({ location }) => {
    // state variables declaration
    const [toggleLogin, setToggleLogin] = useState(false);
    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleToggle = () => {
        // this function is used to toggle between signin and signup
        setToggleLogin(!toggleLogin);
        resetFields();
    };

    const handleChange = (e) => {
        // this function is used to set the new form field values
        setFields({ ...fields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // this function is used to handle the form submission
        e.preventDefault();
        if (toggleLogin === false && location.state === "Admin") {
            //signin the admin
            dispatch(adminSignIn(fields, history));
        }
        resetFields();
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <h1 className="mb-10 text-center">{location.state}</h1>
            <div className="container bg-white sm:w-2/3 lg:w-4/12 py-5 px-10 rounded-lg shadow-lg">
                <form className="font-semibold" onSubmit={handleSubmit}>
                    {toggleLogin && (
                        <div className="flex justify-between">
                            <div className="flex flex-col mb-6 w-9/20">
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
                            <div className="flex flex-col mb-6 w-9/20">
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
