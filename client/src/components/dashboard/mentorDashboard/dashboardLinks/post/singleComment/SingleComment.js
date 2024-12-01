import React, { useContext } from "react";
import moment from "moment";
import TrashIcon from "../../../../../../assets/icons/TrashIcon";
import { authContext } from "../../../../../../contexts/authContext";

const SingleComment = ({
    comment,
    author,
    setShowCommentDeleteModal,
    setShowOverlay,
    setSelectedComment,
}) => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    return (
        <div className="p-2 bg-white rounded-md place-self-start mb-3 mr-2 flex">
            <img
                className="h-8 w-8 rounded-full mr-3 flex-shrink-0"
                src={
                    author.avatar.url === ""
                        ? `https://api.dicebear.com/9.x/personas/svg`
                        : author.avatar.url
                }
                alt="commentorImage"
            />
            <div>
                <div className="flex items-center justify-start">
                    <h5>{`${author.firstname} ${author.middlename} ${author.lastname}`}</h5>
                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    <h6>{moment(comment.createdAt).fromNow()}</h6>
                    {uid.toString() === author._id.toString() && (
                        <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    )}
                    {uid.toString() === author._id.toString() && (
                        <button
                            onClick={() => {
                                setShowCommentDeleteModal(true);
                                setShowOverlay(true);
                                setSelectedComment(comment);
                            }}
                        >
                            <TrashIcon
                                alt={true}
                                myStyle={"h-4 w-4 cursor-pointer hover:text-red-600 transition-all"}
                            />
                        </button>
                    )}
                </div>
                <p>{comment.body}</p>
            </div>
        </div>
    );
};

export default SingleComment;
