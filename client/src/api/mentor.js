import API from "./index";

export const signIn = (fields) => API.post("/mentor/login", fields);

export const signUp = (fields) =>
    API.post("/mentor/signup", fields).catch((error) => {
        return error.response;
    });

export const fetchMentor = () =>
    API.get("/mentor/dashboard").catch((error) => {
        return error.response;
    });

export const getAllMentees = () =>
    API.get(`/mentor/getAllMentees`).catch((error) => {
        return error.response;
    });

export const getAllMenteeSemesters = (menteeId) =>
    API.get(`/mentor/getSemesters/${menteeId}`).catch((error) => {
        return error.response;
    });

export const getProfile = () =>
    API.get(`/mentor/profile`).catch((error) => {
        return error.response;
    });
