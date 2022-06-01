import API from "./index";

export const getStats = () =>
    API.get("/getStats").catch((error) => {
        return error.response;
    });
