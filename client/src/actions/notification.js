import { toast } from "react-toastify";
import * as api from "../api/notification";
import { showToast } from "../components/toast/toast";
import { getMeetings } from "./meeting";
import { getAllPosts } from "./post";

export const getAllNotifications = () => async (dispatch) => {
    try {
        const { data } = await api.getAllNotifications();
        console.log("notifications in action", data);

        //check if the response data is error
        if (data.code === 200) {
            const notifications = data.data;
            return dispatch({ type: "FETCH_NOTIFICATIONS", notifications });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const addGlobalNotification = (history, notification) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_GLOBAL_NOTIFICATION", notification });
        dispatch(getAllPosts(history, 1, undefined));
        dispatch(getMeetings());
    } catch (error) {
        console.log(error);
    }
};

export const markNotificationRead = (history, notificationIds, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.markNotificationRead(notificationIds);
        console.log("notifications marked in action", data);

        //check if the response data is error
        if (data.code === 200) {
            const ids = data.data.read;
            dispatch({ type: "MARK_NOTIFICATION_READ", ids });
            if (setLoading) setLoading(false);
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const logoutNotifications = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_NOTIFICATIONS" });
    } catch (error) {
        console.log(error);
    }
};
