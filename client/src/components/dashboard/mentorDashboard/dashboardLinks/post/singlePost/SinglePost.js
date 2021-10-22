import React, { useState } from "react";
import moment from "moment";

import "./SinglePost.css";

const SinglePost = ({ post, author, handleComment, isSelected, index, handleShowModal }) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    return (
        <div className="bg-gray-100 mb-2 py-3 px-4 rounded-md border flex flex-col">
            {toggleMenu && (
                <div
                    onClick={handleToggleMenu}
                    className="fixed left-72 opacity-0 w-full h-full top-0 right-0 z-10"
                ></div>
            )}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between mb-5">
                    <img
                        className="h-12 w-12 rounded-full mr-5"
                        src={author.avatar.url}
                        alt="authorImage"
                    />
                    <div>
                        <h3>{author.name}</h3>
                        <div className="flex items-center justify-center">
                            <h6> {moment(post.createdAt).format("LLL")}</h6>
                            <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                            <h6> Assistant Professor</h6>
                            <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                            <h6> {author.department}</h6>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {isSelected && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                    <button
                        onClick={handleToggleMenu}
                        className={`flex items-center justify-center hover:bg-gray-200 p-1 rounded-full transition-all relative group ${
                            toggleMenu ? "bg-gray-200" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                        <div
                            className={`${
                                toggleMenu
                                    ? "scale-100 translate-x-0 translate-y-0"
                                    : "scale-0 translate-x-11 -translate-y-8"
                            } absolute transform transition-all bg-white top-3 z-20 right-9 rounded-md py-2 shadow-sm`}
                        >
                            <h5
                                onClick={() => handleShowModal(post)}
                                className="hover:bg-gray-200 px-4 flex py-1"
                            >
                                Edit
                            </h5>
                            <h5
                                onClick={() => handleShowModal(post)}
                                className="hover:bg-gray-200 px-4 py-1 flex"
                            >
                                Delete
                            </h5>
                        </div>
                    </button>
                </div>
            </div>
            <p className="mb-4 a-tag" dangerouslySetInnerHTML={{ __html: `${post.body}` }}></p>
            <button
                onClick={() => handleComment(post._id, index)}
                className="flex items-center justify-end hover:bg-gray-200 place-self-end p-3 rounded-md transition-all"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
                <h6 className="mr-1">comments</h6>
                <h6>{post.commentCount}</h6>
            </button>
        </div>
    );
};

export default SinglePost;
