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

export const signIn = (fields) => API.post("/student/login", fields);
export const signUp = (fields) =>
    API.post("/student/signup", fields).catch((error) => {
        return error.response;
    });
export const fetchStudent = () =>
    API.get("/student/dashboard").catch((error) => {
        return error.response;
    });