import React, { useRef, useState } from "react";

import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css";
import PencilIcon from "../../../../../../assets/PencilIcon";

const PostEditModal = ({
    nodeRef,
    setShowOverlay,
    setShowPostEditModal,
    selectedPost,
    handlePostSubmit,
}) => {
    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const editor = useRef();
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    // state to control the disable state of the update button
    const [isDisable, setIsDisable] = useState(true);
    // state variable to store the updated content to be sent
    const [postContent, setPostContent] = useState({
        body: "",
    });

    // function to handle state of the update button and to set the updated content on change of the inner content in the editor
    const handleChange = (content) => {
        setIsDisable(false);
        setPostContent({ ...postContent, body: content });
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 w-1/2 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Edit post</h4>
                        <button
                            onClick={() => {
                                setShowOverlay(false);
                                setShowPostEditModal(false);
                            }}
                            className="text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <form
                        onSubmit={(e) => {
                            handlePostSubmit(e, selectedPost._id, postContent);
                            setShowOverlay(false);
                            setShowPostEditModal(false);
                        }}
                    >
                        <SunEditor
                            name="myEditor"
                            onChange={handleChange}
                            getSunEditorInstance={getSunEditorInstance}
                            defaultValue={selectedPost.body}
                            autoFocus={true}
                            setContents={postContent.body}
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
                                className="p-2 bg-blue-600 rounded-md text-white mt-5 disabled:opacity-50 hover:bg-blue-800 transition-all flex items-center justify-between"
                                disabled={isDisable}
                            >
                                <PencilIcon alt={false} myStyle={"h-5 w-5 mr-2"} />
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostEditModal;
