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

export const signIn = (fields) => API.post("/mentor/login", fields);
export const signUp = (fields) =>
    API.post("/mentor/signup", fields).catch((error) => {
        return error.response;
    });
export const fetchMentor = () =>
    API.get("/mentor/dashboard").catch((error) => {
        return error.response;
    });
export const fetchAllMentorPost = () =>
    API.get("/mentor/fetchAllPosts").catch((error) => {
        return error.response;
    });
export const postMentorPost = (post) =>
    API.post("/mentor/newPost", post).catch((error) => {
        return error.response;
    });
export const updateMentorPost = (post, postId) =>
    API.post(`post/${postId}/edit`, post).catch((error) => {
        return error.response;
    });
export const deleteMentorPost = (postId) =>
    API.post(`post/${postId}/delete`).catch((error) => {
        return error.response;
    });
export const fetchMentorComments = (postId) =>
    API.get(`post/${postId}/comment`).catch((error) => {
        return error.response;
    });
export const postMentorComment = (comment, postId) =>
    API.post(`post/${postId}/comment`, comment).catch((error) => {
        return error.response;
    });
export const deleteMentorComment = (commentId) =>
    API.post(`post/comment/${commentId}/delete`).catch((error) => {
        return error.response;
    });
