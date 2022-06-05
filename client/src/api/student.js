import API from "./index";

export const signIn = (fields) =>
    API.post("/student/login", fields).catch((error) => {
        return error.response;
    });

export const signUp = (fields) =>
    API.post("/student/signup", fields).catch((error) => {
        return error.response;
    });

export const fetchStudent = () =>
    API.get("/student/dashboard").catch((error) => {
        return error.response;
    });

export const fetchStudentProfile = () =>
    API.get("/student/profile").catch((error) => {
        return error.response;
    });

export const updateStudentProfile = (fields) =>
    API.post("/student/profile", fields).catch((error) => {
        return error.response;
    });

export const fetchStudentSemesterDetails = () =>
    API.get("/student/semester").catch((error) => {
        return error.response;
    });

export const addStudentSemesterDetails = (fields) =>
    API.post("/student/semester", fields).catch((error) => {
        return error.response;
    });

export const updateStudentSemesterDetails = (fields) =>
    API.post("/student/semester", fields).catch((error) => {
        return error.response;
    });

export const deleteStudentSemesterDetails = (fields) =>
    API.post("/student/semester/delete", fields).catch((error) => {
        return error.response;
    });

export const updateStudentPastEduDetails = (fields) =>
    API.post("/student/pastEducation", fields).catch((error) => {
        return error.response;
    });

export const getStudentPastEduDetails = () =>
    API.get("/student/pastEducation").catch((error) => {
        return error.response;
    });

export const getStudentsOfMentor = () =>
    API.get("/student/getAllStudentsOfMentor").catch((error) => {
        return error.response;
    });
