import React from "react";

const TickComponent = ({ color }) => {
    return (
        <div className="place-self-center col-start-7 flex justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke={color}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        </div>
    );
};

export default TickComponent;
