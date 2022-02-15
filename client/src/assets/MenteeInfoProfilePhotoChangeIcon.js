import React from "react";

const MenteeInfoProfilePhotoChangeIcon = ({ margin }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${margin}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
            </svg>
        </>
    );
};

export default MenteeInfoProfilePhotoChangeIcon;
