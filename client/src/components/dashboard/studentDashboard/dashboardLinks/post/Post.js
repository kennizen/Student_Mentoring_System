import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllPosts, submitComment, submitPost, updatePost } from "../../../../../actions/post";
import SinglePost from "./singlePost/SinglePost";

import SunEditor, { buttonList } from "suneditor-react";

import "suneditor/dist/css/suneditor.min.css";
import PaperAirplaneIcon from "../../../../../assets/PaperAirplaneIcon";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import PostEditModal from "./postModals/PostEditModal";
import PostDeleteModal from "./postModals/PostDeleteModal";
import SingleComment from "./singleComment/SingleComment";
import CommentDeleteModal from "./postModals/CommentDeleteModal";
import Loading from "../../../../loading/Loading";

const Post = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // fetching all the posts for the user
    useEffect(() => {
        dispatch(getAllPosts(history, executeScroll, setPostLoading)); // to scroll when loading first time
        executeScroll(); // this is to scroll to bottom when coming from diff tab
    }, []);

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const editor = useRef();
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const [isHidden, setIsHidden] = useState(true);
    // state variable to show viewing pill on the selected post
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    // state to store the selected post to edit
    const [selectedPost, setSelectedPost] = useState(null);
    // state variable to get the selected comment
    const [selectedComment, setSelectedComment] = useState(null);

    // states for loading
    const [postLoading, setPostLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);

    // state to control the modal show and dont show
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPostEditModal, setShowPostEditModal] = useState(false);
    const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
    const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);

    // refs used for css transition to work for the modal and the overlay
    const postEditModalRef = useRef(null);
    const postDeleteModalRef = useRef(null);
    const commentDeleteModalRef = useRef(null);
    const overlayRef = useRef(null);

    // fetching posts from the global state
    const { posts } = useSelector((state) => state.post);
    // getting all comments for a post from the global store after api call
    const { comments } = useSelector((state) => state.post);

    console.log("posts", posts);

    // state variable to store the post body
    const [postBody, setPostBody] = useState({
        body: "",
    });
    // state variable to store the comment body
    const [commentBody, setCommentBody] = useState({
        body: "",
    });

    // function to make scroll focus to the recent post posted
    const scrollPost = useRef();
    const executeScroll = () => {
        scrollPost?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // updating the state variable for post body
    const handleChange = (content) => {
        setPostBody({ ...postBody, body: content });
    };

    // function to handle the post submission
    const handlePostSubmit = (e, postId, postContent) => {
        e.preventDefault();
        if (!postId) {
            dispatch(submitPost(history, postBody, executeScroll));
            setPostBody({
                body: "",
            });
        } else {
            dispatch(updatePost(history, postId, postContent));
        }
    };

    // function to update the state for the comment body
    const handleCommentChange = (e) => {
        setCommentBody({ ...commentBody, body: e.target.value });
    };

    // function to handle the comment submission
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(history, commentBody, executeScrollToComment, selectedPost._id));
        setCommentBody({
            body: "",
        });
    };

    // ref to focus the comment typing box when reply is clicked
    const focusInput = useRef();

    // function to make scroll focus to the recent comment posted
    const scrollComment = useRef();
    const executeScrollToComment = () => {
        scrollComment?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // function to focus the comment input box when reply is clicked
    const executeFocusInput = () => {
        setTimeout(() => {
            focusInput?.current?.focus();
        }, 1);
    };

    return (
        <div className="w-full h-full grid grid-cols-12 relative">
            <CSSTransition
                nodeRef={overlayRef}
                in={showOverlay}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            <CSSTransition
                nodeRef={postEditModalRef}
                in={showPostEditModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <PostEditModal
                    nodeRef={postEditModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowPostEditModal={setShowPostEditModal}
                    selectedPost={selectedPost}
                    handlePostSubmit={handlePostSubmit}
                />
            </CSSTransition>
            <CSSTransition
                nodeRef={postDeleteModalRef}
                in={showPostDeleteModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <PostDeleteModal
                    nodeRef={postDeleteModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowPostDeleteModal={setShowPostDeleteModal}
                    id={selectedPost?._id}
                />
            </CSSTransition>
            <CSSTransition
                nodeRef={commentDeleteModalRef}
                in={showCommentDeleteModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <CommentDeleteModal
                    nodeRef={commentDeleteModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowCommentDeleteModal={setShowCommentDeleteModal}
                    id={selectedComment?._id}
                />
            </CSSTransition>
            <div className="col-span-8 border-r-2 border-gray-200 flex flex-col overflow-y-auto p-2">
                <div className="h-4/5 overflow-y-auto mb-3 p-3">
                    {postLoading ? (
                        <Loading width={"w-10"} height={"h-10"} />
                    ) : (
                        posts.map((post, index) => {
                            return (
                                <SinglePost
                                    key={post.postData._id}
                                    post={post.postData}
                                    author={post.authorData}
                                    setShowOverlay={setShowOverlay}
                                    setShowPostEditModal={setShowPostEditModal}
                                    setShowPostDeleteModal={setShowPostDeleteModal}
                                    setSelectedPost={setSelectedPost}
                                    setIsHidden={setIsHidden}
                                    setSelectedPostIndex={setSelectedPostIndex}
                                    selectedPostIndex={selectedPostIndex}
                                    executeFocusInput={executeFocusInput}
                                    setCommentLoading={setCommentLoading}
                                    index={index}
                                />
                            );
                        })
                    )}
                    <div ref={scrollPost}></div>
                </div>
                <form className="h-1/5 relative pl-3" onSubmit={handlePostSubmit}>
                    <div className="absolute z-10 right-5 top-3">
                        <button
                            type="submit"
                            title="Submit post"
                            className="flex items-center justify-center transition-all text-gray-600 hover:text-gray-900"
                        >
                            <PaperAirplaneIcon
                                alt={false}
                                myStyle={"h-7 w-7 transform rotate-90"}
                            />
                        </button>
                    </div>
                    <SunEditor
                        name="myEditor"
                        onChange={handleChange}
                        setContents={postBody.body}
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
                <div>
                    <h3 className="font-bold mb-5">Comments</h3>
                    <div className="h-650 overflow-y-auto flex flex-col">
                        {selectedPostIndex !== -1 ? (
                            commentLoading ? (
                                <Loading width={"w-7"} height={"h-7"} />
                            ) : (
                                comments.map((comment) => {
                                    return (
                                        <SingleComment
                                            key={comment.commentData._id}
                                            author={comment.authorData}
                                            comment={comment.commentData}
                                            setShowCommentDeleteModal={setShowCommentDeleteModal}
                                            setShowOverlay={setShowOverlay}
                                            setSelectedComment={setSelectedComment}
                                        />
                                    );
                                })
                            )
                        ) : (
                            <div></div>
                        )}
                        <div ref={scrollComment}></div>
                    </div>
                </div>

                {isHidden || (
                    <form className="group" onSubmit={handleCommentSubmit}>
                        <div className="grid grid-cols-12 mt-4 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
                            <input
                                value={commentBody.body}
                                ref={focusInput}
                                onChange={handleCommentChange}
                                name="comment"
                                type="text"
                                placeholder="Type a comment..."
                                className="col-span-10 bg-transparent outline-none border-none focus:ring-0 pl-5"
                            />
                            <button
                                type="submit"
                                title="Submit comment"
                                disabled={commentBody.body === "" ? true : false}
                                className="w-12 h-12 ml-3 col-start-11 col-span-2 rounded-full flex items-center justify-center place-self-center text-blue-600 disabled:opacity-50"
                            >
                                <PaperAirplaneIcon
                                    alt={false}
                                    myStyle={"h-6 w-6 transform rotate-90"}
                                />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Post;
