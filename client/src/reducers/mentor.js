const mentor = (state = { mentorData: null, genPosts: [], comments: [], socket: null }, action) => {
    switch (action.type) {
        case "SIGN_IN_MENTOR":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return state;
        case "FETCH_MENTOR":
            return { ...state, mentorData: action.data };
        case "CONNECT_SOCKET_MENTOR":
            return { ...state, socket: action.socket };
        case "SAVE_GEN_POSTS":
            return { ...state, genPosts: action.data.data.posts };
        case "SUBMIT_POST":
            const newPost = [];
            newPost.push(action.data.data);
            return { ...state, genPosts: [...state.genPosts].concat(newPost) };
        case "UPDATE_POST":
            let pos;
            state.genPosts.forEach((post, i) => {
                if (post.postData._id === action.data.data.post.postData._id) {
                    pos = i;
                }
            });
            state.genPosts[pos] = action.data.data.post;
            return { ...state };
        case "DELETE_POST":
            let filteredPosts = [];
            state.genPosts.forEach((post) => {
                if (post.postData._id !== action.data.data.post._id) {
                    filteredPosts.push(post);
                }
            });
            return { ...state, genPosts: filteredPosts, comments: [] };
        case "SAVE_COMMENTS":
            return { ...state, comments: action.data.data.comments };
        case "SUBMIT_COMMENTS":
            const newComment = [];
            newComment.push(action.data.data.comment);
            return { ...state, comments: [...state.comments].concat(newComment) };
        case "DELETE_COMMENT":
            let filteredComments = [];
            state.comments.forEach((comment) => {
                if (comment.commentData._id !== action.data.data.comment.commentData._id) {
                    filteredComments.push(comment);
                }
            });
            return { ...state, comments: filteredComments };
        case "LOGOUT_MENTOR":
            localStorage.clear();
            return { ...state, mentorData: null };
        default:
            return state;
    }
};

export default mentor;
