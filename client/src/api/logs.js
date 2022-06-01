import API from "./index";

export const getLogs = () =>
    API.get("/logs").catch((error) => {
        return error.response;
    });
