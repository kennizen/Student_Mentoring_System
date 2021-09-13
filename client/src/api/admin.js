import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("authData")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("authData")).auth_token
        }`;
    }
    return req;
});

export const signIn = (fields) => API.post("/admin/login", fields);
export const fetchAdmin = () =>
    API.get("/admin/dashboard").catch((error) => {
        return error.response;
    });
export const fetchMentorMentee = () =>
    API.get("/admin/getAllUsers").catch((error) => {
        return error.response;
    });
