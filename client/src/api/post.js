import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("authData")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("authData")).auth_token
        }`;
    }

    return req;
});

export const fetchAllPost = (page) =>
    API.get(`/posts?page=${page}`).catch((error) => {
        return error.response;
    });

export const submitPost = (post) =>
    API.post("/posts", post).catch((error) => {
        return error.response;
    });

export const updatePost = (post, postId) =>
    API.post(`/posts/${postId}/edit`, post).catch((error) => {
        return error.response;
    });

export const deletePost = (postId) =>
    API.post(`/posts/${postId}/delete`).catch((error) => {
        return error.response;
    });

export const fetchPostComments = (postId) =>
    API.get(`/posts/${postId}/comments`).catch((error) => {
        return error.response;
    });

export const submitComment = (comment, postId) =>
    API.post(`/posts/${postId}/comment`, comment).catch((error) => {
        return error.response;
    });

export const deleteComment = (commentId) =>
    API.post(`/posts/comment/${commentId}/delete`).catch((error) => {
        return error.response;
    });
