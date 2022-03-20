const chat = (state = { chats: [], messages: [], notifications: [] }, action) => {
    switch (action.type) {
        case "FETCH_CHATS":
            return { ...state, chats: action.data.data };
        case "FETCH_MESSAGES":
            return { ...state, messages: action.data.data };
        case "ADD_CHATS":
            return { ...state, chats: [...state.chats, ...action.data.data.newChatArray] };
        case "UPDATE_CHAT":
            const id = action.latestMessage.chat;
            console.log(action.latestMessage);
            console.log(id);
            let index = state.chats.findIndex((chat) => chat._id.toString() === id.toString());
            console.log(index);
            state.chats[index].latestMessage = action.latestMessage;
            return { ...state, chats: [...state.chats] };
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
