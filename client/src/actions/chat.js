import * as api from "../api/chat";

export const createChat = (history, setShowModal, chatIds) => async (dispatch) => {
    try {
        const { data } = await api.createChat(chatIds);
        console.log("chat created data", data);
        setShowModal(false);

        //check if the response data is error
        if (data.code === 409) {
            dispatch(getAllChat(history));
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "ADD_CHATS", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const ReorderChats = (id) => async (dispatch) => {
    try {
        dispatch({ type: "REORDER_CHATS", id });
    } catch (error) {
        console.log(error);
    }
};

export const AddSingleChat = (chat) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_SINGLE_CHAT", chat });
    } catch (error) {
        console.log(error);
    }
};

export const AddNotification = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_NOTIFICATION", id });
    } catch (error) {
        console.log(error);
    }
};

export const UpdateLatestMessage = (data) => async (dispatch) => {
    try {
        const latestMessage = data.data;
        dispatch({ type: "UPDATE_CHAT", latestMessage });
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

export const createMessage = (history, message, socket, executeScroll) => async (dispatch) => {
    try {
        const { data } = await api.createMessage(message);
        console.log("message created data", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "ADD_MESSAGES", data });
            executeScroll();
            dispatch(UpdateLatestMessage(data));
            socket.emit("newMessage", data);
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
        // setMessages(data.data);
        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_MESSAGES", data });
            setIsLoading(false);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getOlderMessages = (history, chatId, page, setIsLoading) => async (dispatch) => {
    try {
        setIsLoading(true);
        const { data } = await api.getMessages(chatId, page);
        console.log("older message get data", data);
        // setMessages(data.data);
        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_OLDER_MESSAGES", data });
            setIsLoading(false);
        }
    } catch (error) {
        console.log(error);
    }
};
