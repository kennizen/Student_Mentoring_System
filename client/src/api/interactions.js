import API from "./index";

export const getInteractions = () =>
    API.get("/interactions/summary").catch((error) => {
        return error.response;
    });
