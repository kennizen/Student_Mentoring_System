import React, { useState, useEffect } from "react";

const GenModal = ({ header, body, b1Text, b2Text, handleFunc, handleShowModal, id }) => {
    const [op, setOp] = useState("opacity-0");
    const [sc, setSc] = useState("scale-0");

    useEffect(() => {
        setTimeout(() => {
            setOp("opacity-50");
            setSc("scale-100");
        }, 0);
    }, []);

    return (
        <>
            <div
                onClick={() => handleShowModal({ isEdit: false })}
                className={`${op} fixed flex items-center justify-center left-72 bg-black w-full h-full top-0 right-0 z-30 transition-opacity`}
            ></div>
            <div
                className={`${sc} absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 max-h-500 overflow-y-auto w-1/3 z-50 p-6 bg-white transition-all rounded-md`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h4>{header}</h4>
                    <button onClick={() => handleShowModal({ isEdit: false })} className="text-2xl">
                        &times;
                    </button>
                </div>

                <p>{body}</p>

                <div className="w-full flex items-center justify-end">
                    <button
                        onClick={() => handleShowModal({ isEdit: false })}
                        type="submit"
                        className="p-2 hover:bg-gray-200 rounded-md text-gray-600 mt-5 mr-3"
                    >
                        {b1Text}
                    </button>
                    <button
                        onClick={() => {
                            handleFunc(id);
                            handleShowModal({ isEdit: false });
                        }}
                        type="submit"
                        className="p-2 hover:bg-gray-200 rounded-md text-gray-800 mt-5"
                    >
                        {b2Text}
                    </button>
                </div>
            </div>
        </>
    );
};

export default GenModal;
