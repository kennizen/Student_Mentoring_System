import * as api from "../api/interactions";

export const getInteractions = (history, setData) => async (dispatch) => {
    try {
        const { data } = await api.getInteractions();
        console.log("interactions in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const date = new Date();
            let newPostsArr = [];
            let newMeetingsArr = [];

            for (let i = 0; i < date.getDate(); ++i) {
                newPostsArr.push(data.data.posts[i]);
                newMeetingsArr.push(data.data.meetings[i]);
            }

            setData({
                labels: data.data.labels,
                posts: newPostsArr,
                meetings: newMeetingsArr,
                maxVal: Math.max(...newPostsArr.concat(newMeetingsArr)) + 1,
            });
        } else {
        }
    } catch (error) {
        console.log(error);
    }
};
