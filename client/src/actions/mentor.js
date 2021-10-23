import * as api from "../api/mentor";

export const mentorSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        dispatch({ type: "SIGN_IN_MENTOR", data });
        history.push("/mentor/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const mentorSignUp = (fields, displaySuccessOrError) => async (dispatch) => {
    try {
        const { data } = await api.signUp(fields);
        console.log("mentor sign up data", data);
        if (data.code === 200) {
            displaySuccessOrError(200);
        } else if (data.code === 500) {
            displaySuccessOrError(500);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchMentor();
        console.log("mentor data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_MENTOR" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_MENTOR", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetAllPosts = (history, executeScroll, isInterval) => async (dispatch) => {
    try {
        const { data } = await api.fetchAllMentorPost();
        console.log("mentor posts in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SAVE_GEN_POSTS", data });
        }
        if (isInterval) {
            executeScroll();
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorSubmitPost = (history, post, executeScroll) => async (dispatch) => {
    try {
        const { data } = await api.postMentorPost(post);
        console.log("mentor submit posts in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SUBMIT_POST", data });
        }
        executeScroll();
    } catch (error) {
        console.log(error);
    }
};

export const mentorUpdatePost = (history, post, postId) => async (dispatch) => {
    try {
        const { data } = await api.updateMentorPost(post, postId);
        console.log("mentor update post in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "UPDATE_POST", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorDeletePost = (history, postId) => async (dispatch) => {
    try {
        const { data } = await api.deleteMentorPost(postId);
        console.log("mentor delete post in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "DELETE_POST", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetComments = (history, postId) => async (dispatch) => {
    try {
        const { data } = await api.fetchMentorComments(postId);
        console.log("mentor fetched comments in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SAVE_COMMENTS", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorSubmitComment = (history, comment, postId) => async (dispatch) => {
    try {
        const { data } = await api.postMentorComment(comment, postId);
        console.log("mentor submit comment in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SUBMIT_COMMENTS", data });
            dispatch({ type: "UPDATE_POST", data });
        }
    } catch (error) {
        console.log(error);
    }
};
