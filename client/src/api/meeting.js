import API from "./index";

export const createMeeting = (meeting) =>
    API.post("/meetings", meeting).catch((error) => {
        return error.response;
    });

export const getMeetings = () =>
    API.get("/meetings").catch((error) => {
        return error.response;
    });

export const updateMeeting = (id, meeting) =>
    API.patch(`/meetings/${id}`, meeting).catch((error) => {
        return error.response;
    });

export const updateMinutes = (id, minutes) =>
    API.patch(`/meetings/${id}/minutes`, { minutes: minutes }).catch((error) => {
        return error.response;
    });
