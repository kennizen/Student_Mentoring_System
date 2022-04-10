import * as api from "../api/notification";

export const getAllNotifications = (history) => async (dispatch) => {
    try {
        const { data } = await api.getAllNotifications();
        console.log("notifications in action", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            const notifications = data.data;
            dispatch({ type: "FETCH_NOTIFICATIONS", notifications });
        }
    } catch (error) {
        console.log(error);
    }
};

export const addGlobalNotification = (notification) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_GLOBAL_NOTIFICATION", notification });
    } catch (error) {
        console.log(error);
    }
};

export const markNotificationRead = (history, notificationIds) => async (dispatch) => {
    try {
        const { data } = await api.markNotificationRead(notificationIds);
        console.log("notifications marked in action", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "MARK_NOTIFICATION_READ", notificationIds });
        }
    } catch (error) {
        console.log(error);
    }
};
