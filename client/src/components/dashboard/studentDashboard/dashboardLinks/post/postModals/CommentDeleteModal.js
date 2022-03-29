import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../../../../../../actions/post";

const CommentDeleteModal = ({ nodeRef, setShowOverlay, setShowCommentDeleteModal, id }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // function to delete the object with the given id
    const handleDelete = () => {
        dispatch(deleteComment(history, id));
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Delete comment</h4>
                        <button
                            onClick={() => {
                                setShowOverlay(false);
                                setShowCommentDeleteModal(false);
                            }}
                            className="text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <p>Are you sure? you want to delete the comment.</p>

                    <div className="w-full flex items-center justify-end">
                        <button
                            onClick={() => {
                                setShowCommentDeleteModal(false);
                                setShowOverlay(false);
                            }}
                            type="submit"
                            className="p-2 hover:bg-gray-200 rounded-md text-gray-600 mt-5 mr-3 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setShowCommentDeleteModal(false);
                                setShowOverlay(false);
                                handleDelete();
                            }}
                            type="submit"
                            className="p-2 hover:bg-red-300 rounded-md text-gray-800 mt-5 bg-red-200 transition-all"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentDeleteModal;
