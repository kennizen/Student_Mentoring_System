import { toast } from "react-toastify";
import * as api from "../api/chat";
import { showToast } from "../components/toast/toast";

export const createChat = (history, setShowModal, chatIds) => async (dispatch) => {
    try {
        const { data } = await api.createChat(chatIds);
        console.log("chat created data", data);
        setShowModal(false);

        if (data.code === 409) {
            dispatch(getAllChat());
        } else if (data.code === 200) {
            dispatch({ type: "ADD_CHATS", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const reorderChats = (id) => async (dispatch) => {
    try {
        dispatch({ type: "REORDER_CHATS", id });
    } catch (error) {
        console.log(error);
    }
};

export const addSingleChat = (chat) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_SINGLE_CHAT", chat });
    } catch (error) {
        console.log(error);
    }
};

export const addNotification = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_NOTIFICATION", id });
    } catch (error) {
        console.log(error);
    }
};

export const updateLatestMessage = (data) => async (dispatch) => {
    try {
        const latestMessage = data.data;
        dispatch({ type: "UPDATE_CHAT", latestMessage });
    } catch (error) {
        console.log(error);
    }
};

export const getAllChat = () => async (dispatch) => {
    try {
        const { data } = await api.fetchChat();
        console.log("chat data", data);

        if (data.code === 200) {
            return dispatch({ type: "FETCH_CHATS", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const createMessage = (history, message, socket, executeScroll) => async (dispatch) => {
    try {
        const { data } = await api.createMessage(message);
        console.log("message created data", data);

        if (data.code === 200) {
            dispatch(addMessages(data));
            executeScroll();
            dispatch(updateLatestMessage(data));
            dispatch(reorderChats(message.chat));
            socket.emit("newMessage", data);
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getMessages = (history, chatId, page, setIsLoading) => async (dispatch) => {
    try {
        setIsLoading(true);
        const { data } = await api.getMessages(chatId, page);
        console.log("message get data", data);
        setIsLoading(false);

        if (data.code === 200) {
            dispatch({ type: "FETCH_MESSAGES", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const addMessages = (data) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_MESSAGES", data });
    } catch (error) {
        console.log(error);
    }
};

export const getOlderMessages =
    (history, chatId, page, setOldMessageLoading) => async (dispatch) => {
        try {
            const { data } = await api.getMessages(chatId, page);
            console.log("older message get data", data);

            if (data.code === 200) {
                dispatch({ type: "FETCH_OLDER_MESSAGES", data });
            } else {
                showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
            }
            setOldMessageLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

export const updateNotification = (tmp) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_NOTIFICATION", tmp });
    } catch (error) {
        console.log(error);
    }
};

export const clearMessages = () => async (dispatch) => {
    try {
        dispatch({ type: "CLEAR_MESSAGES" });
    } catch (error) {
        console.log(error);
    }
};

export const logoutChats = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_CHATS" });
    } catch (error) {
        console.log(error);
    }
};
