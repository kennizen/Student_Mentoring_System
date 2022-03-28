import React from "react";

const ReplyIcon = ({ myStyle, alt }) => {
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
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
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
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
            </svg>
        </>
    );
};

export default ReplyIcon;
