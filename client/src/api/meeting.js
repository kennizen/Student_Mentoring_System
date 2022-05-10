import API from "./index";

export const createMeeting = (meeting) =>
    API.post("/meetings", meeting).catch((error) => {
        return error.response;
    });

export const getMeetings = () =>
    API.get("/meetings").catch((error) => {
        return error.response;
    });
