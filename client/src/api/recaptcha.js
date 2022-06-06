import API from "./index";

export const sendRecaptcha = (token) =>
    API.post("/verifyCaptcha", { token: token }).catch((error) => {
        return error.response;
    });
