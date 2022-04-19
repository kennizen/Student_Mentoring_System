import API from "./index";

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
