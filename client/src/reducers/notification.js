const notification = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case "FETCH_NOTIFICATIONS":
            return { ...state, notifications: action.notifications };
        case "ADD_GLOBAL_NOTIFICATION":
            state.notifications.push(action.notification);
            return { ...state, notifications: [...state.notifications] };
        case "MARK_NOTIFICATION_READ":
            // let index = state.notifications.findIndex(
            //     (notification) => notification._id.toString() === action.id.toString()
            // );
            // let uid = "";
            // if (localStorage.getItem("authData")) {
            //     uid = JSON.parse(localStorage.getItem("authData"))["uid"];
            // }
            // state.notifications[index].receivers.forEach((r) => {
            //     if (r.user._id.toString() === uid.toString()) {
            //         r.read = true;
            //     }
            // });
            return { ...state, notifications: [...state.notifications] };
        default:
            return state;
    }
};

export default notification;
