import React, { useEffect, useRef } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import "suneditor/dist/css/suneditor.min.css";
import { mentorGetAllPosts } from "../../../../../actions/mentor";
import SinglePost from "./singlePost/SinglePost";
import SingleComment from "./singleComment/SingleComment";

const Post = () => {
    const editor = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(mentorGetAllPosts(history));
    }, [dispatch, history]);

    // accessing the state for posts
    const { genPosts } = useSelector((state) => state.mentor);

    console.log("In posts page", genPosts);

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    return (
        <div className="w-full h-845 mt-2 grid grid-cols-12">
            <div className="col-span-8 border-r-1 border-solid border-black flex flex-col overflow-y-auto p-2">
                <div className="h-4/5 overflow-y-auto mb-3 p-3">
                    {genPosts.map((obj) => {
                        return (
                            <SinglePost
                                key={obj.postData._id}
                                post={obj.postData}
                                author={obj.authorData}
                            />
                        );
                    })}
                </div>
                <div className="h-1/5 relative">
                    <div className="absolute z-10 right-5 top-3">
                        <button
                            title="Submit post"
                            className="flex items-center justify-center transition-all text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 transform rotate-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>
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
            <div className="col-span-4 p-4 flex flex-col justify-between">
                <h3 className="font-bold">Comments</h3>
                <div className="h-650 overflow-y-auto flex flex-col">
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                    <SingleComment />
                </div>
                <form action="" className="group">
                    <div
                        tabIndex="-1"
                        className="grid grid-cols-12 mt-4 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent"
                    >
                        <input
                            type="text"
                            placeholder="type a comment..."
                            className="col-span-10 bg-transparent outline-none pl-5"
                        />
                        <button
                            title="Submit comment"
                            className="w-12 h-12 ml-3 col-start-11 col-span-2 rounded-full flex items-center justify-center place-self-center text-gray-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transform rotate-90"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Post;
