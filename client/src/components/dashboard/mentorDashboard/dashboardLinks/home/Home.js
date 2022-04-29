import React from "react";
import AcademicCapIcon from "../../../../../assets/AcademicCapIcon";

const Home = ({ name }) => {
    return (
        <div className="w-full h-full px-36 py-10 grid grid-cols-4">
            <div className="w-full col-span-3">
                <h1>Welcome back {name}!</h1>
                <div className="flex">
                    <div className="p-3 bg-red-400 rounded-md">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="bg-black bg-opacity-30 p-1 rounded-md">
                                <AcademicCapIcon alt={false} myStyle={"w-5 h-5 text-white"} />
                            </span>

                            <button className="py px-2 bg-red-200 border-2 border-red-500 rounded-md text-sm">
                                view
                            </button>
                        </div>
                        <div className="mb-2 flex items-center justify-between text-white">
                            <h4>Total mentees</h4>
                            <span className="py-1 px-2 bg-black bg-opacity-20 rounded-full text-white">
                                <p>56</p>
                            </span>
                        </div>
                        <div className="text-white">
                            <h4>There is something here</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-green-200">hi</div>
        </div>
    );
};

export default Home;
