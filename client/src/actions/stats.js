import { toast } from "react-toastify";
import * as api from "../api/stats";
import { showToast } from "../components/toast/toast";

export const getStats = (history, setStats) => async (dispatch) => {
    try {
        const { data } = await api.getStats();
        console.log("stats in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            setStats({
                posts: data.data.postsCount,
                comments: data.data.commentsCount,
                mentees: data.data.studentsCount,
            });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};
