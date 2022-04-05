import API from "./index";

export const getAllNotifications = () =>
    API.get(`/notifications`).catch((error) => {
        return error.response;
    });
