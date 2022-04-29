import React from "react";

const MinusSmIcon = ({ myStyle, alt }) => {
    if (alt) {
        return (
            <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${myStyle}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
            </>
        );
    }

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${myStyle}`}
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
            </svg>
        </>
    );
};

export default MinusSmIcon;
