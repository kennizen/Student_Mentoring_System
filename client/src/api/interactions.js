import API from "./index";

export const getInteractions = () =>
    API.get("/interactions").catch((error) => {
        return error.response;
    });
