import React from "react";

const TickComponent = ({ color, isCross }) => {
    return (
        <div
            className={`${
                color === "" ? "bg-white" : isCross === false ? "bg-blue-100" : "bg-red-100"
            } place-self-center col-start-7 flex justify-center items-center rounded-md`}
        >
            {isCross ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 p-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={color}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.8}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 p-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={color}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.8"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            )}
        </div>
    );
};

export default TickComponent;
