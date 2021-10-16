import React from "react";
import moment from "moment";

const SinglePost = ({ post, author }) => {
    return (
        <div className="bg-gray-100 mb-2 py-3 px-4 rounded-md border flex flex-col">
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
                            <h6> {moment(post.createdOn).format("LLL")}</h6>
                            <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                            <h6> Assistant Professor</h6>
                            <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                            <h6> {author.department}</h6>
                        </div>
                    </div>
                </div>
                <button className="flex items-center justify-center hover:bg-gray-200 p-1 rounded-full">
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
                </button>
            </div>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: `${post.body}` }}></p>
            <button className="flex items-center justify-end hover:bg-gray-200 place-self-end p-3 rounded-md">
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
                <h6 className="mr-1">Comments</h6>
                <h6>(10)</h6>
            </button>
        </div>
    );
};

export default SinglePost;
