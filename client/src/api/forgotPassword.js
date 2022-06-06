import API from "./index";

export const forgotPassword = (email) =>
    API.post("/forgotPassword", { email: email }).catch((error) => {
        return error.response;
    });
