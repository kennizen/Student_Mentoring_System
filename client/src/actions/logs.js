import * as api from "../api/logs";

export const getLogs = (history, setLogs, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.getLogs();
        console.log("logs in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            setLogs(data.data.logs);
        }
        if (setLoading !== undefined) setLoading(false);
    } catch (error) {
        console.log(error);
    }
};
