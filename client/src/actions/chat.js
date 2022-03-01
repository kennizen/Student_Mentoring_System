import * as api from "../api/chat";

export const createChat = (history, setShowModal, chatIds) => async (dispatch) => {
    try {
        const { data } = await api.createChat(chatIds);
        console.log("chat created data", data);
        setShowModal(false);

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

export const getAllChat = (history, setChatsToBeDisplayed) => async (dispatch) => {
    try {
        const { data } = await api.fetchChat();
        console.log("chat data", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_CHATS", data });
        }

        const authUserID = JSON.parse(localStorage.getItem("authData"))["uid"];

        let tmp = [];
        data.data.forEach((chat) => {
            let user = chat.users.filter((user) => user.user._id !== authUserID);
            // console.log("user", user[0].user);
            tmp.push(user[0].user);
            // console.log("tmp", tmp);
        });
        setChatsToBeDisplayed(tmp);
    } catch (error) {
        console.log(error);
    }
};
