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
            let chatsExisting = [...state.chats, ...action.data.data.newChatArray];
            localStorage.setItem("chats", JSON.stringify(chatsExisting));
            return { ...state, chats: chatsExisting };
        case "ADD_SINGLE_CHAT":
            let chatsSingle = [...state.chats, action.chat];
            localStorage.setItem("chats", JSON.stringify(chatsSingle));
            return { ...state, chats: chatsSingle };
        case "REORDER_CHATS":
            const chatId = action.id;
            if (state.chats.length > 0) {
                let index = state.chats.findIndex(
                    (chat) => chat._id.toString() === chatId.toString()
                );

                let chat = state.chats[index];
                state.chats.splice(index, 1);
                state.chats.unshift(chat);

                let newChatIndex;
                let oldChatId;
                if (localStorage.getItem("persistChat") !== null) {
                    oldChatId = JSON.parse(localStorage.getItem("persistChat")).chatId;
                    newChatIndex = state.chats.findIndex(
                        (chat) => chat._id.toString() === oldChatId.toString()
                    );
                    localStorage.setItem("0", newChatIndex);
                    localStorage.setItem(
                        "persistChat",
                        JSON.stringify({
                            chatId: oldChatId,
                            chatIndex: newChatIndex,
                        })
                    );
                }
                return { ...state, chats: [...state.chats] };
            }
            return state;
        case "FETCH_OLDER_MESSAGES":
            return { ...state, messages: [...state.messages, ...action.data.data] };
        case "UPDATE_CHAT":
            const id = action.latestMessage.chat._id;
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
        case "LOGOUT_CHATS":
            return { ...state, chats: [], messages: [], notifications: [] };
        default:
            return state;
    }
};

export default chat;
