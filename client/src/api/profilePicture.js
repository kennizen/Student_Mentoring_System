import API from "./index";

export const updateProfilePicutre = (avatar) =>
    API.post("/avatar", avatar).catch((error) => {
        return error.response;
    });

export const deleteProfilePicutre = () =>
    API.delete("/avatar").catch((error) => {
        return error.response;
    });
