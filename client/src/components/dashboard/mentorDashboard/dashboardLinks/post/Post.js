import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    getAllPosts,
    getOlderPosts,
    submitComment,
    submitPost,
    updatePost,
} from "../../../../../actions/post";

import SinglePost from "./singlePost/SinglePost";
import PaperAirplaneIcon from "../../../../../assets/icons/PaperAirplaneIcon";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import PostEditModal from "./postModals/PostEditModal";
import PostDeleteModal from "./postModals/PostDeleteModal";
import SingleComment from "./singleComment/SingleComment";
import CommentDeleteModal from "./postModals/CommentDeleteModal";
import Loading from "../../../../loading/Loading";
import RichEditor from "../../../../richEditor/RichEditor";

const Post = ({ socket, streamUpdated, setStreamUpdated }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isHidden, setIsHidden] = useState(true);
    // state variable to show viewing pill on the selected post
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    // state to store the selected post to edit
    const [selectedPost, setSelectedPost] = useState(null);
    // state variable to get the selected comment
    const [selectedComment, setSelectedComment] = useState(null);
    // state to set the submit button disable
    const [disablePost, setDisablePost] = useState(true);

    // states for loading
    const [postLoading, setPostLoading] = useState(false);
    const [oldPostLoading, setOldPostLoading] = useState(false);
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

    useEffect(() => {
        dispatch(getAllPosts(history, 1));
    }, [dispatch, history]);

    // fetching posts from the global state
    const { posts } = useSelector((state) => state.post);
    // getting all comments for a post from the global store after api call
    const { comments } = useSelector((state) => state.post);

    console.log("posts", posts);

    // state variable to store the post body
    const [postBody, setPostBody] = useState({
        body: "",
        commentEnabled: true,
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
        let text = content.replace(/<[^>]+>/g, ""); // regex to convert html to plain text
        if (text === "") setDisablePost(true);
        else setDisablePost(false);
        setPostBody((prevState) => ({ ...prevState, body: content }));
    };

    // fucntion to set the comment disable state
    const handleToggleCommentDisable = () => {
        setPostBody((prevState) => ({
            ...prevState,
            commentEnabled: !prevState.commentEnabled,
        }));
    };

    console.log(postBody);

    // function to handle the post submission
    const handlePostSubmit = (e, postId, postContent) => {
        e.preventDefault();
        if (!postId) {
            dispatch(submitPost(history, postBody, socket, executeScroll));
            setPostBody({
                body: "",
                commentEnabled: true,
            });
        } else {
            dispatch(updatePost(history, postId, postContent));
        }
        // setSelectedPost(null);
        // setSelectedPostIndex(-1);
    };

    console.log("selected post", selectedPost);
    console.log("selected index", selectedPostIndex);

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
        }, 10);
    };

    // state to set the number of pages to fetch the old messages
    const [page, setPage] = useState(2);

    // load Older posts
    const loadOlderPosts = () => {
        console.log("load more msgs");
        setOldPostLoading(true);
        setPage(page + 1);
        dispatch(getOlderPosts(history, page, setOldPostLoading));
    };

    return (
        <div className="w-full h-full grid grid-cols-12 relative pl-2">
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
                    setSelectedPost={setSelectedPost}
                    setSelectedPostIndex={setSelectedPostIndex}
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
            <div className="col-span-8 border-r-2 border-gray-200 flex flex-col overflow-y-auto pt-2 pr-2 relative">
                <button
                    onClick={() => {
                        setPostLoading(true);
                        setStreamUpdated(false);
                        dispatch(getAllPosts(history, 1, setPostLoading));
                        setSelectedPost(null);
                        setSelectedPostIndex(-1);
                    }}
                    className={`py-1 px-3 bg-white rounded-md text-blue-600 shadow-m32 hover:shadow-md transition-all flex items-center justify-between absolute left-1/2 transform -translate-x-1/2 -top-10 ${
                        streamUpdated ? "translate-y-24" : ""
                    } text-sm`}
                >
                    Stream updated
                </button>
                <div
                    className={`h-3/4 overflow-y-auto mb-3 pr-2 flex flex-col-reverse underlineLink ${
                        postLoading && "justify-center"
                    }`}
                >
                    <div ref={scrollPost}></div>
                    {postLoading ? (
                        <div className="flex items-center justify-center">
                            <Loading width="40px" height="40px" />
                        </div>
                    ) : (
                        posts
                            .sort((a, b) => {
                                return a.postData.createdAt < b.postData.createdAt ? 1 : -1;
                            })
                            .map((post, index) => {
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
                    {!postLoading ? (
                        oldPostLoading ? (
                            <div className="w-full">
                                <Loading alt={true} />
                            </div>
                        ) : (
                            <button
                                onClick={loadOlderPosts}
                                title="Load message"
                                className={`justify-self-center p-1.5 rounded-md disabled:opacity-50 text-gray-400 hover:text-gray-700 text-xs transition-all mb-1`}
                            >
                                Load previous post
                            </button>
                        )
                    ) : (
                        <div></div>
                    )}
                </div>
                <form
                    className="h-1/4 relative border border-solid border-b border-gray-200 flex flex-col items-center justify-start"
                    onSubmit={handlePostSubmit}
                >
                    <div className="w-full flex items-center justify-end p-1">
                        <span className="flex items-center justify-between gap-x-2 mr-5 cursor-pointer text-sm bg-gray-200 py-1.5 px-2 rounded-md">
                            <input
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer focus:ring-0 focus:ring-offset-0"
                                type="checkbox"
                                id="disableComment"
                                onChange={handleToggleCommentDisable}
                                checked={!postBody.commentEnabled}
                            />
                            <label className="cursor-pointer" htmlFor="disableComment">
                                Disable comments
                            </label>
                        </span>

                        <button
                            disabled={disablePost}
                            type="submit"
                            title="Submit post"
                            className="py-1 px-2 bg-blue-600 rounded-md text-white disabled:opacity-50 hover:bg-blue-800 transition-all flex items-center justify-between"
                        >
                            Submit
                        </button>
                    </div>
                    <RichEditor
                        contents={postBody.body}
                        handleChange={handleChange}
                        isAutofocus={false}
                        minHeight={"12vh"}
                        height={"100%"}
                    />
                </form>
            </div>
            <div className="col-span-4 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold mb-5">Comments</h3>
                    <div className="h-650 overflow-y-auto flex flex-col">
                        {selectedPostIndex !== -1 ? (
                            commentLoading ? (
                                <Loading myStyle={"w-7 h-7"} />
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
