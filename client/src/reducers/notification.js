const notification = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case "FETCH_NOTIFICATIONS":
            return { ...state, notifications: action.notifications };
        case "ADD_GLOBAL_NOTIFICATION":
            state.notifications.push(action.notification);
            return { ...state, notifications: [...state.notifications] };
        case "MARK_NOTIFICATION_READ":
            let notiMap = {};
            state.notifications.forEach((notification) => {
                if (!notiMap[notification._id]) notiMap[notification._id] = notification;
            });
            action.ids.forEach((noti) => {
                if (notiMap[noti._id]) notiMap[noti._id] = noti;
            });
            let updatedNotifications = [];
            for (const n in notiMap) {
                updatedNotifications.push(notiMap[n]);
            }
            return { ...state, notifications: updatedNotifications };
        case "LOGOUT_NOTIFICATIONS":
            return { ...state, notifications: [] };
        default:
            return state;
    }
};

export default notification;
