import React from "react";

const Loading = ({ width, height, color }) => {
    return (
        <div className="flex justify-center items-center">
            <div
                className={`spinner-border animate-spin inline-block ${width} ${height} border-4 rounded-full text-blue-900`}
            ></div>
        </div>
    );
};

export default Loading;
