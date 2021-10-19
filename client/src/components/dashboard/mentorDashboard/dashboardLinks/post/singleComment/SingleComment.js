import React from "react";
import moment from "moment";

const SingleComment = ({ author, comment }) => {
    return (
        <div className="p-2 bg-gray-100 rounded-md place-self-start mb-3 mr-2 flex">
            <img
                className="h-8 w-8 rounded-full mr-3 flex-shrink-0"
                src={author.avatar.url}
                alt="commentorImage"
            />
            <div>
                <div className="flex items-center justify-start">
                    <h5>{author.name}</h5>
                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    <h5>{moment(comment.createdAt).format("LLL")}</h5>
                </div>
                <p>{comment.body}</p>
            </div>
        </div>
    );
};

export default SingleComment;
