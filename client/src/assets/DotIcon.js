import React from "react";

const DotIcon = ({ myStyle, alt }) => {
    if (alt) {
        return (
            <>
                <div className={`${myStyle}`}></div>
            </>
        );
    }

    return (
        <>
            <div className={`${myStyle}`}></div>
        </>
    );
};

export default DotIcon;
