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

export const createChat = (chatIds) =>
    API.post(`/chats`, chatIds).catch((error) => {
        return error.response;
    });
export const fetchChat = () =>
    API.get(`/chats`).catch((error) => {
        return error.response;
    });
export const createMessage = (message) =>
    API.post(`/messages`, message).catch((error) => {
        return error.response;
    });
export const getMessages = (chatId, page) =>
    API.get(`/messages/${chatId}?page=${page}`).catch((error) => {
        return error.response;
    });
