import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const MENTOR = "MENTOR";
const STUDENT = "STUDENT";
const ADMIN = "ADMIN";

const Main = () => {
    const user = JSON.parse(localStorage.getItem("authData"));
    const history = useHistory();

    // redirect the user to the required dashboard if user is present
    if (user?.role === ADMIN) {
        history.push("/admin/dashboard");
    }
    if (user?.role === MENTOR) {
        history.push("/mentor/dashboard");
    }
    if (user?.role === STUDENT) {
        history.push("/mentee/dashboard");
    }

    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center">
            <h1 className="mt-40 mb-24">Enter the system as a</h1>
            <div className="flex justify-evenly w-full h-1/4 items-center">
                <section>
                    <Link
                        to={{
                            pathname: "/admin",
                            state: "Admin",
                        }}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        Admin
                    </Link>
                </section>
                <div className="bg-gray-900 h-1/4 w-px"></div>
                <section>
                    <Link
                        to={{
                            pathname: "/mentor",
                            state: "Mentor",
                        }}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        Mentor
                    </Link>
                </section>
                <div className="bg-gray-900 h-1/4 w-px"></div>
                <section>
                    <Link
                        to={{
                            pathname: "/mentee",
                            state: "Mentee",
                        }}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        Mentee
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Main;
