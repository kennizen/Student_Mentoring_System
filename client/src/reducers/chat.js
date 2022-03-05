const chat = (state = { chats: [], messages: [] }, action) => {
    switch (action.type) {
        case "FETCH_CHATS":
            return { ...state, chats: action.data.data };
        case "FETCH_MESSAGES":
            return { ...state, messages: action.data.data };
        case "ADD_CHATS":
            return { ...state, chats: [...state.chats, ...action.data.data.newChatArray] };
        default:
            return state;
    }
};

export default chat;
