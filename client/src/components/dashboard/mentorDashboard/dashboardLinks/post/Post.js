import React, { useEffect, useRef, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const Post = () => {
    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    return (
        <div className="w-full h-845 mt-2 grid grid-cols-12">
            <div className="col-span-8 border-r-1 border-solid border-black flex flex-col overflow-y-auto p-2">
                <div className="h-4/5 bg-pink-300 overflow-y-auto mb-3">
                    <h1>post</h1>
                </div>
                <div className="h-1/5 shadow-md">
                    <SunEditor
                        getSunEditorInstance={getSunEditorInstance}
                        setOptions={{
                            buttonList: buttonList.basic,
                            resizingBar: false,
                            height: "100%",
                            minHeight: "120px",
                        }}
                    />
                </div>
            </div>
            <div className="col-span-4 p-2">
                <div className="bg-red-400 h-full">
                    <h1>comment</h1>
                </div>
            </div>
        </div>
    );
};

export default Post;
