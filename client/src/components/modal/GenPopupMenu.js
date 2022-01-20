import React from "react";

const GenPopupMenu = ({
    toggleMenu,
    top,
    right,
    left,
    handleFunc,
    valToBeUsedInHandleFunc,
    handleToggleMenu,
    itemArray,
}) => {
    return (
        <>
            {toggleMenu && (
                <div
                    onClick={handleToggleMenu}
                    className="fixed opacity-0 w-full h-full top-0 right-0 z-10"
                ></div>
            )}
            <div
                className={`${
                    toggleMenu ? "scale-100" : "scale-0"
                } absolute transform transition-all bg-white top-${top} z-20 right-${right} rounded-md py-2 shadow-md`}
            >
                {itemArray.map((item, index) => {
                    return (
                        <h5
                            key={index}
                            onClick={() => {}}
                            className="hover:bg-gray-200 px-4 flex py-1"
                        >
                            {item}
                        </h5>
                    );
                })}
            </div>
        </>
    );
};

export default GenPopupMenu;
