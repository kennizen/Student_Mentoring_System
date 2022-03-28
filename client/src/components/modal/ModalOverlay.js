import React from "react";

const ModalOverlay = ({ nodeRef }) => {
    return (
        <div
            ref={nodeRef}
            className={`absolute bg-black w-full h-full top-0 right-0 z-40 opacity-50`}
        ></div>
    );
};

export default ModalOverlay;
