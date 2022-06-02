import * as api from "../api/stats";

export const getStats = (history, setStats) => async (dispatch) => {
    try {
        const { data } = await api.getStats();
        console.log("stats in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            setStats({
                posts: data.data.postsCount,
                comments: data.data.commentsCount,
                mentees: data.data.studentsCount,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
