import React, { useState } from "react";
import moment from "moment";
import GenModal from "../../../../../modal/GenModal";

const SingleComment = ({ author, comment, handleCommentDelete }) => {
    const [showModal, setShowModal] = useState({
        isEdit: false,
    });

    return (
        <div className="p-2 bg-gray-100 rounded-md place-self-start mb-3 mr-2 flex">
            {showModal.isEdit && (
                <GenModal
                    header="Delete comment?"
                    b1Text="Cancel"
                    b2Text="Delete"
                    body="Are you sure you want to delete this comment?"
                    handleShowModal={setShowModal}
                    handleFunc={handleCommentDelete}
                    id={comment._id}
                />
            )}
            <img
                className="h-8 w-8 rounded-full mr-3 flex-shrink-0"
                src={
                    author.avatar.url === ""
                        ? `https://avatars.dicebear.com/api/initials/${author.name}.svg`
                        : author.avatar.url
                }
                alt="commentorImage"
            />
            <div>
                <div className="flex items-center justify-start">
                    <h5>{author.name}</h5>
                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    <h6>{moment(comment.createdAt).fromNow()}</h6>
                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    <svg
                        onClick={() =>
                            setShowModal({
                                isEdit: true,
                            })
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 cursor-pointer hover:text-red-600 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>
                <p>{comment.body}</p>
            </div>
        </div>
    );
};

export default SingleComment;
