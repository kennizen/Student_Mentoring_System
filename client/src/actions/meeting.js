import * as api from "../api/meeting";

export const createMeeting = (meeting, history) => async (dispatch) => {
    try {
        const { data } = await api.createMeeting(meeting);
        console.log("create meeting data in actions", data);
        // dispatch({ type: "SIGN_IN_MENTOR", data });
        // history.push("/mentor/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const getMeetings = (history) => async (dispatch) => {
    try {
        const { data } = await api.getMeetings();
        console.log("get meeting data in actions", data);
        // dispatch({ type: "SIGN_IN_MENTOR", data });
        // history.push("/mentor/dashboard");
    } catch (error) {
        console.log(error);
    }
};
