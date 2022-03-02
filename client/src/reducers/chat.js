const chat = (state = { chats: [] }, action) => {
    switch (action.type) {
        case "FETCH_CHATS":
            return { ...state, chats: action.data.data };
        case "ADD_CHATS":
            return { ...state, chats: [...state.chats, ...action.data.data.newChatArray] };
        default:
            return state;
    }
};

export default chat;
