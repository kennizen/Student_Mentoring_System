import * as api from "../api/post";

export const getAllPosts = (history, page, setPostLoading) => async (dispatch) => {
    try {
        const { data } = await api.fetchAllPost(page);
        console.log("posts in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            const posts = data.data.posts;
            dispatch({ type: "FETCH_POSTS", posts });
            setPostLoading(false);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getOlderPosts = (history, page, setOldPostLoading) => async (dispatch) => {
    try {
        // setIsLoading(true);
        const { data } = await api.fetchAllPost(page);
        console.log("older posts get data", data);
        // setMessages(data.data);
        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            const posts = data.data.posts;
            dispatch({ type: "FETCH_OLDER_POSTS", posts });
            setOldPostLoading(false);
        }
    } catch (error) {
        console.log(error);
    }
};

export const submitPost = (history, post, socket, executeScroll) => async (dispatch) => {
    try {
        const { data } = await api.submitPost(post);
        console.log("submit post in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            const post = data.data;
            dispatch({ type: "ADD_SINGLE_POST", post });
            executeScroll();
            socket.emit("newNotification", post.postData);
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
        if (data.code === 403) {
            history.goBack();
        } else {
            const post = data.data.post;
            dispatch({ type: "UPDATE_POST", post });
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
        if (data.code === 403) {
            history.goBack();
        } else {
            const post = data.data.post;
            dispatch({ type: "DELETE_POST", post });
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
        if (data.code === 403) {
            history.goBack();
        } else {
            const comments = data.data.comments;
            dispatch({ type: "FETCH_COMMENTS", comments });
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
            if (data.code === 403) {
                history.goBack();
            } else {
                const comment = data.data.comment;
                const post = data.data.post;
                dispatch({ type: "ADD_SINGLE_COMMENT", comment });
                dispatch({ type: "UPDATE_POST", post });
                executeScrollToComment();
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
        if (data.code === 403) {
            history.goBack();
        } else {
            const post = data.data.post;
            const comment = data.data.comment;
            dispatch({ type: "DELETE_COMMENT", comment });
            dispatch({ type: "UPDATE_POST", post });
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
