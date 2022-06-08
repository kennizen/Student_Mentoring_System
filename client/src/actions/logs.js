import { toast } from "react-toastify";
import * as api from "../api/logs";
import { showToast } from "../components/toast/toast";

export const getLogs = (history, setLogs, setLoading) => async (dispatch) => {
    try {
        const { data } = await api.getLogs();
        console.log("logs in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            setLogs(data.data.logs);
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
        if (setLoading !== undefined) setLoading(false);
    } catch (error) {
        console.log(error);
    }
};
