import React, { useEffect, useRef, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import "suneditor/dist/css/suneditor.min.css";
import {
    mentorDeletePost,
    mentorGetAllPosts,
    mentorGetComments,
    mentorSubmitComment,
    mentorSubmitPost,
    mentorUpdatePost,
} from "../../../../../actions/mentor";
import SinglePost from "./singlePost/SinglePost";
import SingleComment from "./singleComment/SingleComment";
import Modal from "../../../../modal/Modal";
import GenModal from "../../../../modal/GenModal";

const Post = () => {
    const editor = useRef();
    const scrollPost = useRef();
    const scrollComment = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    // state variable to store the post body
    const [userText, setUserText] = useState({
        body: "",
    });
    // state variable to store the comment body
    const [comment, setComment] = useState({
        body: "",
    });
    // state variable to store the selected post index to show the eye icon
    const [selectedPost, setSelectedPost] = useState(-1);
    // state variable to store the id of the selected post used in handleCommentSubmit
    const [selectedPostId, setSelectedPostId] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postDataForModal, setPostDataForModal] = useState({});

    useEffect(() => {
        dispatch(mentorGetAllPosts(history, executeScroll, true));
        executeScroll();
    }, [dispatch, history]);

    // accessing the state for posts
    const { genPosts } = useSelector((state) => state.mentor);
    // accessing the state for comments
    const { comments } = useSelector((state) => state.mentor);

    console.log("In posts page posts", genPosts);
    console.log("In posts page comments", comments);

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    // updating the state variable for post body
    const handleChange = (content) => {
        setUserText({ ...userText, body: content });
    };

    // updating the state variable for comment body
    const handleChangeComment = (e) => {
        setComment({ ...comment, body: e.target.value });
    };

    //  function to handle the post submission
    const handleSubmit = (e, postId, cnt) => {
        e.preventDefault();
        if (!postId) {
            dispatch(mentorSubmitPost(history, userText, executeScroll));
            setUserText({
                body: "",
            });
        } else {
            dispatch(mentorUpdatePost(history, cnt, postId));
            handleShowModal({ isEdit: true });
        }
    };

    const handlePostDelete = (postId) => {
        dispatch(mentorDeletePost(history, postId));
        handleShowModal({ isEdit: false });
        setSelectedPost(-1);
    };

    // function used in each post to get the postId and index of the selected post
    const handleComment = (postId, index) => {
        setSelectedPost(index);
        setSelectedPostId(postId);
        dispatch(mentorGetComments(history, postId));
    };

    // function to handle the comment submission
    const handleCommentSubmit = (postId, e) => {
        e.preventDefault();
        dispatch(mentorSubmitComment(history, comment, executeScrollToComment, postId));
        setComment({
            body: "",
        });
    };

    // function to show modal
    const handleShowModal = ({ post: postData, isEdit: isEditModal }) => {
        if (isEditModal) {
            setShowEditModal(!showEditModal);
            if (postData) {
                setPostDataForModal(postData);
            }
        } else {
            setShowDeleteModal(!showDeleteModal);
            if (postData) {
                setSelectedPostId(postData._id);
            }
        }
    };

    // function to make scroll focus to the recent post posted
    const executeScroll = () => {
        scrollPost?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // function to make scroll focus to the recent comment posted
    const executeScrollToComment = () => {
        scrollComment?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // setInterval(() => {
    //     dispatch(mentorGetAllPosts(history, executeScroll, false));
    // }, 10000);

    return (
        <div className="w-full h-845 mt-2 grid grid-cols-12 relative">
            {showEditModal && (
                <Modal
                    handleShowModal={handleShowModal}
                    postDataForModal={postDataForModal}
                    handleSubmit={handleSubmit}
                />
            )}
            {showDeleteModal && (
                <GenModal
                    id={selectedPostId}
                    handleFunc={handlePostDelete}
                    handleShowModal={handleShowModal}
                    b1Text="Cancel"
                    b2Text="Delete"
                    body="If you delete this post than all the comments on this post will also be deleted."
                    header="Delete Post ?"
                />
            )}
            <div className="col-span-8 border-solid border-black flex flex-col overflow-y-auto p-2">
                <div className="h-4/5 overflow-y-auto mb-3 p-3">
                    {genPosts.map((obj, index) => {
                        return (
                            <SinglePost
                                key={obj.postData._id}
                                handleComment={handleComment}
                                post={obj.postData}
                                author={obj.authorData}
                                index={index}
                                isSelected={selectedPost === index ? true : false}
                                handleShowModal={handleShowModal}
                            />
                        );
                    })}
                    <div ref={scrollPost}></div>
                </div>
                <form className="h-1/5 relative pl-3" onSubmit={handleSubmit}>
                    <div className="absolute z-10 right-5 top-3">
                        <button
                            type="submit"
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
                        name="myEditor"
                        onChange={handleChange}
                        setContents={userText.body}
                        getSunEditorInstance={getSunEditorInstance}
                        setOptions={{
                            buttonList: buttonList.basic,
                            resizingBar: false,
                            height: "100%",
                            minHeight: "120px",
                            placeholder: "Say something...",
                        }}
                    />
                </form>
            </div>
            <div className="col-span-4 p-4 flex flex-col justify-between">
                <h3 className="font-bold">Comments</h3>
                <div className="h-650 overflow-y-auto flex flex-col">
                    {selectedPost !== -1 ? (
                        comments.map((obj) => {
                            return (
                                <SingleComment
                                    key={obj.commentData._id}
                                    author={obj.authorData}
                                    comment={obj.commentData}
                                />
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                    <div ref={scrollComment}></div>
                </div>
                <form className="group" onSubmit={(e) => handleCommentSubmit(selectedPostId, e)}>
                    <div className="grid grid-cols-12 mt-4 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
                        <input
                            value={comment.body}
                            onChange={handleChangeComment}
                            name="comment"
                            type="text"
                            placeholder="Type a comment..."
                            className="col-span-10 bg-transparent outline-none border-none focus:ring-0 pl-5"
                        />
                        <button
                            type="submit"
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
