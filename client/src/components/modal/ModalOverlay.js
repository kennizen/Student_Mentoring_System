import React from "react";

const ModalOverlay = ({ nodeRef, setShowModal }) => {
    return (
        <div
            onClick={() => setShowModal(false)}
            ref={nodeRef}
            className={`absolute bg-black w-full h-full top-0 right-0 z-40 opacity-50`}
        ></div>
    );
};

export default ModalOverlay;
