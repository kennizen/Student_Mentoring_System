import React, { useContext, useState } from "react";
import moment from "moment";
import ReplyIcon from "../../../../../../assets/icons/ReplyIcon";
import ChatIcon from "../../../../../../assets/icons/ChatIcon";
import DotsVertivalIcon from "../../../../../../assets/icons/DotsVertivalIcon";
import { useDispatch } from "react-redux";
import { fetchPostComments } from "../../../../../../actions/post";
import { useHistory } from "react-router-dom";
import DotIcon from "../../../../../../assets/icons/DotIcon";
import { authContext } from "../../../../../../contexts/authContext";

const SinglePost = ({
    post,
    author,
    setShowOverlay,
    setShowPostEditModal,
    setShowPostDeleteModal,
    setSelectedPost,
    setIsHidden,
    setSelectedPostIndex,
    selectedPostIndex,
    executeFocusInput,
    setCommentLoading,
    index,
}) => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    const dispatch = useDispatch();
    const history = useHistory();

    // state variable to set the toggle visible state of the popup menu
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleBotButtons = () => {
        setCommentLoading(true);
        dispatch(fetchPostComments(history, post._id, setCommentLoading));
        setSelectedPostIndex(index);
        setIsHidden(false);
        setSelectedPost(post);
    };

    const handlePostActions = () => {
        setShowOverlay(true);
        setSelectedPost(post);
    };

    return (
        <div className="bg-white mb-5 py-3 px-4 rounded-md border flex flex-col">
            {toggleMenu && (
                <div
                    onClick={() => setToggleMenu(!toggleMenu)}
                    className="fixed left-72 opacity-0 w-full h-full top-0 right-0 z-10"
                ></div>
            )}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between mb-5">
                    <img
                        className="h-12 w-12 rounded-full mr-5"
                        src={
                            author.avatar.url === ""
                                ? `https://api.dicebear.com/9.x/personas/svg`
                                : author.avatar.url
                        }
                        alt="authorImage"
                    />
                    <div>
                        <h3>{`${author.firstname} ${author.middlename} ${author.lastname}`}</h3>
                        <div className="flex items-center justify-center gap-x-2">
                            <h6>{moment(post.createdAt).format("LLL")}</h6>
                            <DotIcon alt={true} myStyle={"h-1 w-1"} />
                            <h6>
                                {author.designation
                                    ? author.designation
                                    : author.role === "Mentor"
                                    ? "Designation not found"
                                    : "Student"}
                            </h6>
                            <DotIcon alt={true} myStyle={"h-1 w-1"} />
                            <h6>
                                {author.department ? author.department : "Department not found"}
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {selectedPostIndex === index && (
                        <h6 className="text-blue-600 bg-blue-100 py-px px-2 rounded-full mr-1">
                            viewing
                        </h6>
                    )}
                    {uid.toString() === author._id.toString() ? (
                        <button
                            onClick={() => setToggleMenu(!toggleMenu)}
                            className={`flex items-center justify-center hover:bg-gray-200 p-1 rounded-full transition-all relative group ${
                                toggleMenu ? "bg-gray-200" : ""
                            }`}
                        >
                            <DotsVertivalIcon alt={false} myStyle={"h-5 w-5"} />
                            <div
                                className={`${
                                    toggleMenu
                                        ? "scale-100 translate-x-0 translate-y-0"
                                        : "scale-0 translate-x-11 -translate-y-8"
                                } absolute transform transition-all bg-white top-3 z-20 right-9 rounded-md py-2 shadow-m32`}
                            >
                                <h5
                                    onClick={() => {
                                        handlePostActions();
                                        setShowPostEditModal(true);
                                    }}
                                    className="hover:bg-gray-200 px-4 flex py-1"
                                >
                                    Edit
                                </h5>
                                {/* <h5
                                    onClick={() => {
                                        handlePostActions();
                                        setShowPostDeleteModal(true);
                                    }}
                                    className="hover:bg-gray-200 px-4 py-1 flex"
                                >
                                    Delete
                                </h5> */}
                            </div>
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <p className="mb-4 a-tag" dangerouslySetInnerHTML={{ __html: `${post.body}` }}></p>
            {post.commentEnabled && (
                <div className="flex items-center justify-end">
                    <button
                        onClick={handleBotButtons}
                        className="flex items-center justify-end hover:bg-gray-200 place-self-end p-2 rounded-md transition-all text-sm"
                    >
                        <ChatIcon alt={true} myStyle={"h-4 w-4 mr-1"} />
                        comments {post.commentCount}
                    </button>
                    <button
                        onClick={() => {
                            handleBotButtons();
                            executeFocusInput();
                        }}
                        className="flex items-center justify-end hover:bg-gray-200 place-self-end p-2 rounded-md transition-all text-sm"
                    >
                        <ReplyIcon alt={false} myStyle={"h-4 w-4 mr-1"} />
                        reply
                    </button>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
