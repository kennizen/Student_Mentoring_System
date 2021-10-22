import React, { useRef, useEffect, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css";

const Modal = ({ handleShowModal, postDataForModal, handleSubmit }) => {
    const editor = useRef();
    const [op, setOp] = useState("opacity-0");
    const [sc, setSc] = useState("scale-0");
    const [isDisable, setIsDisable] = useState(true);
    const [cnt, setCnt] = useState({
        body: "",
    });

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    useEffect(() => {
        setTimeout(() => {
            setOp("opacity-50");
            setSc("scale-100");
        }, 0);
    }, []);

    const handleChange = (content) => {
        setIsDisable(false);
        setCnt({ ...cnt, body: content });
    };

    return (
        <>
            <div
                onClick={handleShowModal}
                className={`${op} fixed flex items-center justify-center left-72 bg-black w-full h-full top-0 right-0 z-30 transition-opacity`}
            ></div>
            <div
                className={`${sc} absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 max-h-500 overflow-y-auto w-2/4 z-50 p-6 bg-white transition-all`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h4>Edit Post</h4>
                    <button onClick={handleShowModal} className="text-2xl">
                        &times;
                    </button>
                </div>
                <form onSubmit={(e) => handleSubmit(e, postDataForModal._id, cnt)}>
                    <SunEditor
                        name="myEditor"
                        onChange={handleChange}
                        getSunEditorInstance={getSunEditorInstance}
                        defaultValue={postDataForModal.body}
                        autoFocus={true}
                        setContents={cnt.body}
                        setOptions={{
                            buttonList: buttonList.basic,
                            resizingBar: false,
                            height: "100%",
                            minHeight: "220px",
                        }}
                    />
                    <div className="w-full flex items-center justify-end">
                        <button
                            type="submit"
                            className="p-2 bg-blue-600 rounded-md text-white mt-5 disabled:opacity-50"
                            disabled={isDisable}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Modal;
