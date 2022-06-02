import * as api from "../api/meeting";

export const createMeeting = (history, meeting, socket) => async (dispatch) => {
    try {
        const { data } = await api.createMeeting(meeting);
        console.log("create meeting data in actions", data);
        if (data.code === 401) {
            history.push("/");
        } else {
            const newMeeting = data.data;
            dispatch({ type: "ADD_MEETING", newMeeting });
            socket.emit("newNotification", newMeeting);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getMeetings = (history) => async (dispatch) => {
    try {
        const { data } = await api.getMeetings();
        console.log("get meeting data in actions", data);
        if (data.code === 401) {
            history.push("/");
        } else {
            const meetings = data.data;
            return dispatch({ type: "FETCH_MEETINGS", meetings });
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateMeeting = (history, meeting, socket) => async (dispatch) => {
    try {
        const { data } = await api.updateMeeting(meeting.id, meeting);
        console.log("update meeting data in actions", data);
        if (data.code === 401) {
            history.push("/");
        } else {
            const meeting = data.data;
            dispatch({ type: "UPDATE_MEETING", meeting });
        }
    } catch (error) {
        console.log(error);
    }
};
