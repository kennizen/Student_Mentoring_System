import React from "react";
import myBg from "../../../../../assets/images/bg-1.png";

const InfoCards = ({ myStyle, total, text, children }) => {
    return (
        <div className={`${myStyle}`} style={{ backgroundImage: "url(" + myBg + ")" }}>
            <div className="mb-4 flex items-center justify-between">
                <span className="bg-black bg-opacity-30 p-1 rounded-md">{children}</span>
                <span className=" text-white">
                    <h1>{total}</h1>
                </span>
            </div>
            <div className="flex items-center justify-between text-white">
                <h2>{text}</h2>
            </div>
        </div>
    );
};

export default InfoCards;
