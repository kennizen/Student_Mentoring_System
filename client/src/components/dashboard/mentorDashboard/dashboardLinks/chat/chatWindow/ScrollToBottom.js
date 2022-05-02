import React from "react";
import ChevronDown from "../../../../../../assets/icons/ChevronDown";

const ScrollToBottom = ({ scrollToBottom }) => {
    return (
        <button
            onClick={() => scrollToBottom()}
            className="p-1 bg-gray-600 rounded-full absolute bottom-28 right-13.5 cursor-pointer text-white"
        >
            <ChevronDown myStyle={"h-5 w-5"} alt={true} />
        </button>
    );
};

export default ScrollToBottom;
