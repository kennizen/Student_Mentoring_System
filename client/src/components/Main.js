import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
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
