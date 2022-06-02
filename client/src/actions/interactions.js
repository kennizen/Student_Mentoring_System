import * as api from "../api/interactions";

export const getInteractions = (history, setInteractions) => async (dispatch) => {
    try {
        const { data } = await api.getInteractions();
        console.log("interactions in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
        }
    } catch (error) {
        console.log(error);
    }
};
