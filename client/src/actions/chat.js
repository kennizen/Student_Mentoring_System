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

export const getMessages = (history, chatId, socket, setIsLoading) => async (dispatch) => {
    try {
        setIsLoading(true);
        const { data } = await api.getMessages(chatId);
        console.log("message get data", data);
        // setMessages(data.data);
        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_MESSAGES", data });
            setIsLoading(false);
            socket.emit("join chat", chatId);
        }
    } catch (error) {
        console.log(error);
    }
};
