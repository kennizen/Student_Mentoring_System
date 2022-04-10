import API from "./index";

export const getAllNotifications = () =>
    API.get(`/notifications`).catch((error) => {
        return error.response;
    });

export const markNotificationRead = (notificationIds) =>
    API.post(`/notifications/read`, notificationIds).catch((error) => {
        return error.response;
    });
