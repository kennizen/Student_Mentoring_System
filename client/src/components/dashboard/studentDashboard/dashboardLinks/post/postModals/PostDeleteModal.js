import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../../../../../actions/post";

const PostDeleteModal = ({
    nodeRef,
    setShowOverlay,
    setShowPostDeleteModal,
    id,
    setSelectedPost,
    setSelectedPostIndex,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // function to delete the object with the given id
    const handleDelete = () => {
        dispatch(deletePost(history, id));
        setSelectedPost(null);
        setSelectedPostIndex(-1);
        handleHideModalOperations();
    };

    // function to hide modal from within the modal
    const handleHideModalOperations = () => {
        setShowOverlay(false);
        setShowPostDeleteModal(false);
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Delete post</h4>
                        <button onClick={handleHideModalOperations} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <p>
                        Are you sure you want to delete the post. Deleting will also remove all the
                        comments for the post.
                    </p>

                    <div className="w-full flex items-center justify-end">
                        <button
                            onClick={handleHideModalOperations}
                            type="submit"
                            className="p-2 hover:bg-gray-200 rounded-md text-gray-600 mt-5 mr-3 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
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

export default PostDeleteModal;
