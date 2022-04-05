const notification = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case "FETCH_NOTIFICATIONS":
            return { ...state, notifications: action.notifications };
        case "ADD_GLOBAL_NOTIFICATION":
            state.notifications.push(action.notification);
            return { ...state };
        default:
            return state;
    }
};

export default notification;
