import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Roles } from "../utility";
import bg from "../assets/images/bg-2.png";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ArrowRight from "../assets/icons/ArrowRight";

const Main = () => {
    const user = JSON.parse(localStorage.getItem("authData"));
    const history = useHistory();

    // redirect the user to the required dashboard if user is present
    if (user?.role === Roles.ADMIN) {
        history.push("/admin/dashboard");
    }
    if (user?.role === Roles.MENTOR) {
        history.push("/mentor/dashboard");
    }
    if (user?.role === Roles.STUDENT) {
        history.push("/mentee/dashboard");
    }

    const [value, setValue] = useState("Admin");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    console.log("selection", value);

    return (
        <div className="w-full h-screen flex items-center">
            <div className="flex-2 bg-white h-full flex flex-col items-center justify-center">
                <div className="w-full">
                    <h1 style={{ fontSize: "70px" }} className="w-full text-center">
                        <span className="text-blue-500">Welcome</span>, to
                    </h1>
                    <h1 style={{ fontSize: "40px" }} className="w-full text-center">
                        Student Mentoring System
                    </h1>
                </div>
                <img src={bg} alt="" className="w-1/2" />
            </div>
            <div className="flex-grow bg-blue-500 h-full flex flex-col items-center justify-center gap-y-8 text-white">
                <h1>Select your role</h1>
                <FormControl>
                    <RadioGroup
                        value={value}
                        onChange={handleChange}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="Admin"
                            control={
                                <Radio
                                    sx={{
                                        color: "white",
                                        "&.Mui-checked": {
                                            color: "white",
                                        },
                                    }}
                                />
                            }
                            label="Admin"
                        />
                        <FormControlLabel
                            value="Mentor"
                            control={
                                <Radio
                                    sx={{
                                        color: "white",
                                        "&.Mui-checked": {
                                            color: "white",
                                        },
                                    }}
                                />
                            }
                            label="Mentor"
                        />
                        <FormControlLabel
                            value="Mentee"
                            control={
                                <Radio
                                    sx={{
                                        color: "white",
                                        "&.Mui-checked": {
                                            color: "white",
                                        },
                                    }}
                                />
                            }
                            label="Mentee"
                        />
                    </RadioGroup>
                </FormControl>
                <Link
                    to={{
                        pathname: `/${value.toLowerCase()}`,
                        state: value,
                    }}
                    className="bg-white py-2 px-3 rounded-full flex items-center justify-center gap-x-2 w-1/2 text-blue-700 group"
                >
                    Next
                    <ArrowRight
                        alt={false}
                        myStyle={"h-4 w-4 group-hover:translate-x-2 transform transition"}
                    />
                </Link>
            </div>
        </div>
    );
};

export default Main;
