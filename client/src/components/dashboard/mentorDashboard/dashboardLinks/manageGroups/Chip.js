import React from "react";

const Chip = ({ name, myStyle }) => {
    return (
        <div
            className={`flex justify-center items-center font-medium py-1 px-2 bg-blue-50 rounded-full text-blue-700 border border-blue-300 ${myStyle}`}
        >
            <div className="text-xs font-normal leading-none flex-initial">{name}</div>
        </div>
    );
};

export default Chip;
