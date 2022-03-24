const chat = (state = { chats: [], messages: [], notifications: [] }, action) => {
    switch (action.type) {
        case "FETCH_CHATS":
            localStorage.setItem("chats", JSON.stringify(action.data.data));
            return { ...state, chats: action.data.data };
        case "FETCH_MESSAGES":
            return { ...state, messages: action.data.data };
        case "CLEAR_MESSAGES":
            return { ...state, messages: [] };
        case "ADD_CHATS":
            return { ...state, chats: [...state.chats, ...action.data.data.newChatArray] };
        case "FETCH_OLDER_MESSAGES":
            return { ...state, messages: [...state.messages, ...action.data.data] };
        case "UPDATE_CHAT":
            const id = action.latestMessage.chat;
            if (state.chats.length > 0) {
                let index = state.chats.findIndex((chat) => chat._id.toString() === id.toString());
                state.chats[index].latestMessage = action.latestMessage;
                return { ...state, chats: [...state.chats] };
            }
            return state;
        case "ADD_MESSAGES":
            return { ...state, messages: [...state.messages, action.data.data] };
        case "ADD_NOTIFICATION":
            return { ...state, notifications: [...state.notifications, action.id] };
        case "UPDATE_NOTIFICATION":
            return { ...state, notifications: action.tmp };
        default:
            return state;
    }
};

export default chat;
