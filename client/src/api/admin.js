import API from "./index";

export const signIn = (fields) => API.post("/admin/login", fields);

export const fetchAdmin = () =>
    API.get("/admin/dashboard").catch((error) => {
        return error.response;
    });

export const fetchMentorMentee = () =>
    API.get("/admin/getAllUsers").catch((error) => {
        return error.response;
    });

export const saveGroup = (groupData) =>
    API.post("/admin/saveGroup", groupData).catch((error) => {
        return error.response;
    });

export const fetchLogs = () =>
    API.get("/admin/logs").catch((error) => {
        return error.response;
    });

export const getInteractions = () =>
    API.get("/admin/interactions").catch((error) => {
        return error.response;
    });

export const banUser = (id) =>
    API.patch("/admin/banUser", { id: id }).catch((error) => {
        return error.response;
    });
