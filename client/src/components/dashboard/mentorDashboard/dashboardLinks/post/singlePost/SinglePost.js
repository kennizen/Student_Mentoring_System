import React from "react";

const SinglePost = ({ post }) => {
    console.log(post);
    return (
        <div className="bg-gray-100 mb-2 py-3 px-4 rounded-md border">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between mb-5">
                    <img
                        className="h-12 w-12 rounded-full mr-5"
                        src="https://picsum.photos/id/237/200/300"
                        alt="authorImage"
                    />
                    <div>
                        <h3>Author Name</h3>
                        <h6>25 may 21 &#9679; Assistant Professor &#9679; CSE</h6>
                    </div>
                </div>
                <div className="flex items-center justify-center">
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
                </div>
            </div>
            <h1 className="mb-4">{post.body}</h1>
            <div className="flex items-center justify-end">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                    />
                </svg>
                <h6 className="mr-1">Comments</h6>
                <h6>(10)</h6>
            </div>
        </div>
    );
};

export default SinglePost;
