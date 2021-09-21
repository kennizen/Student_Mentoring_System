import React from "react";

const MyButton = ({ btnText, handlerfunction }) => {
    return (
        <button
            onClick={() => handlerfunction()}
            type="button"
            className="px-3 py-2 bg-blue-600 rounded-md text-white flex items-center justify-center w-28"
        >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
            </svg>
            <span className="ml-2 text-base">{btnText}</span>
        </button>
    );
};

export default MyButton;
