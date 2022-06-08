import { toast } from "react-toastify";
import * as api from "../api/post";
import { showToast } from "../components/toast/toast";

export const getAllPosts = (history, page, setPostLoading) => async (dispatch) => {
    try {
        const { data } = await api.fetchAllPost(page);
        console.log("posts in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            if (setPostLoading !== undefined) setPostLoading(false);
            const posts = data.data.posts;
            return dispatch({ type: "FETCH_POSTS", posts });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getOlderPosts = (history, page, setOldPostLoading) => async (dispatch) => {
    try {
        const { data } = await api.fetchAllPost(page);
        console.log("older posts get data", data);

        if (data.code === 200) {
            const posts = data.data.posts;
            dispatch({ type: "FETCH_OLDER_POSTS", posts });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
        setOldPostLoading(false);
    } catch (error) {
        console.log(error);
    }
};

export const submitPost = (history, post, socket, executeScroll) => async (dispatch) => {
    try {
        const { data } = await api.submitPost(post);
        console.log("submit post in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const post = data.data;
            dispatch({ type: "ADD_SINGLE_POST", post });
            executeScroll();
            socket.emit("newNotification", post.postData);
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (history, postId, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(post, postId);
        console.log("update post in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const post = data.data.post;
            dispatch({ type: "UPDATE_POST", post });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (history, postId) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(postId);
        console.log("delete post in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const post = data.data.post;
            dispatch({ type: "DELETE_POST", post });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchPostComments = (history, postId, setCommentLoading) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostComments(postId);
        console.log("fetched comments in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const comments = data.data.comments;
            dispatch({ type: "FETCH_COMMENTS", comments });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
        setCommentLoading(false);
    } catch (error) {
        console.log(error);
    }
};

export const submitComment =
    (history, comment, executeScrollToComment, postId) => async (dispatch) => {
        try {
            const { data } = await api.submitComment(comment, postId);
            console.log("submit comment in actions", data);

            //check if the response data is error
            if (data.code === 200) {
                const comment = data.data.comment;
                const post = data.data.post;
                dispatch({ type: "ADD_SINGLE_COMMENT", comment });
                dispatch({ type: "UPDATE_POST", post });
                executeScrollToComment();
            } else {
                showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
            }
        } catch (error) {
            console.log(error);
        }
    };

export const deleteComment = (history, commentId) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(commentId);
        console.log("delete comment in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const post = data.data.post;
            const comment = data.data.comment;
            dispatch({ type: "DELETE_COMMENT", comment });
            dispatch({ type: "UPDATE_POST", post });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const logoutPosts = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_POSTS" });
    } catch (error) {
        console.log(error);
    }
};
