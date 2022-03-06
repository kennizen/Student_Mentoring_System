const chat = (state = { chats: [], messages: [] }, action) => {
    switch (action.type) {
        case "FETCH_CHATS":
            return { ...state, chats: action.data.data };
        case "FETCH_MESSAGES":
            return { ...state, messages: action.data.data };
        case "ADD_CHATS":
            return { ...state, chats: [...state.chats, ...action.data.data.newChatArray] };
        case "ADD_MESSAGES":
            return { ...state, messages: [...state.messages, action.data.data] };
        default:
            return state;
    }
};

export default chat;
