import * as api from "../api/chat";

export const createChat = (history, setShowModal, chatIds) => async (dispatch) => {
    try {
        const { data } = await api.createChat(chatIds);
        console.log("chat created data", data);
        setShowModal(false);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "ADD_CHATS", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAllChat = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchChat();
        console.log("chat data", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_CHATS", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const createMessage = (history, message) => async (dispatch) => {
    try {
        const { data } = await api.createMessage(message);
        console.log("message created data", data);

        //check if the response data is error
        // if (data.code === 403) {
        //     history.goBack();
        // } else {
        //     dispatch({ type: "ADD_CHATS", data });
        // }
    } catch (error) {
        console.log(error);
    }
};

export const getMessages = (history, chatId) => async (dispatch) => {
    try {
        const { data } = await api.getMessages(chatId);
        console.log("message get data", data);

        //check if the response data is error
        // if (data.code === 403) {
        //     history.goBack();
        // } else {
        //     dispatch({ type: "ADD_CHATS", data });
        // }
    } catch (error) {
        console.log(error);
    }
};
