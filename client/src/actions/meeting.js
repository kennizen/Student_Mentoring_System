import * as api from "../api/meeting";

export const createMeeting = (meeting, history) => async (dispatch) => {
    try {
        const { data } = await api.createMeeting(meeting);
        console.log("create meeting data in actions", data);
        const newMeeting = data.msg;
        dispatch({ type: "ADD_MEETING", newMeeting });
        // history.push("/mentor/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const getMeetings = (history) => async (dispatch) => {
    try {
        const { data } = await api.getMeetings();
        console.log("get meeting data in actions", data);
        const meetings = data.data;
        dispatch({ type: "FETCH_MEETINGS", meetings });
        // history.push("/mentor/dashboard");
    } catch (error) {
        console.log(error);
    }
};
