import { toast } from "react-toastify";
import * as api from "../api/admin";
import { getLogs } from "../api/logs";
import { showToast } from "../components/toast/toast";

export const adminSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        if (data.code === 200) {
            dispatch({ type: "SIGN_IN_ADMIN", data });
            history.push("/admin/dashboard");
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.TOP_RIGHT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const adminGetDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchAdmin();
        console.log("admin data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_ADMIN" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            return dispatch({ type: "FETCH_ADMIN", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const adminGetMentorMentee = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchMentorMentee();
        console.log("Mentor Mentee data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_ADMIN" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_MENTOR_MENTEE", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const adminSaveGroup = (groupData, history) => async (dispatch) => {
    try {
        const { data } = await api.saveGroup(groupData);
        console.log("group res data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_ADMIN" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_MENTOR_MENTEE", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const adminFetchLogs = (history) => async (dispatch) => {
    try {
        const { data } = await getLogs();
        console.log("logs data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_ADMIN" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_LOGS", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const logoutAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_ADMIN" });
    } catch (error) {
        console.log(error);
    }
};

export const adminBanUser = (id, history) => async (dispatch) => {
    try {
        const { data } = await api.banUser(id);
        console.log("ban user data in actions", data);

        if (data.code === 200) {
            dispatch(adminGetMentorMentee(history));
            showToast("success", data.msg, 2000, toast.POSITION.BOTTOM_LEFT);
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const adminGetInteractions = (history, setInteractions) => async (dispatch) => {
    try {
        const { data } = await api.getInteractions();
        console.log("interactions data in actions", data);

        if (data.code === 200) {
            //setInteractions(data)
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};
