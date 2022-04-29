const post = (state = { posts: [], comments: [] }, action) => {
    switch (action.type) {
        case "FETCH_POSTS":
            return { ...state, posts: action.posts };
        case "ADD_SINGLE_POST":
            return { ...state, posts: [...state.posts, action.post] };
        case "FETCH_OLDER_POSTS":
            return { ...state, posts: [...state.posts, ...action.posts] };
        case "UPDATE_POST":
            let pos;
            state.posts.forEach((post, i) => {
                if (post.postData._id === action.post.postData._id) {
                    pos = i;
                }
            });
            state.posts[pos] = action.post;
            return { ...state, posts: [...state.posts] };
        case "DELETE_POST":
            let filteredPosts = [];
            state.posts.forEach((post) => {
                if (post.postData._id !== action.post._id) {
                    filteredPosts.push(post);
                }
            });
            return { ...state, posts: filteredPosts, comments: [] };
        case "FETCH_COMMENTS":
            return { ...state, comments: action.comments };
        case "ADD_SINGLE_COMMENT":
            state.comments.push(action.comment);
            return { ...state, comments: [...state.comments] };
        case "DELETE_COMMENT":
            let filteredComments = [];
            state.comments.forEach((comment) => {
                if (comment.commentData._id !== action.comment.commentData._id) {
                    filteredComments.push(comment);
                }
            });
            return { ...state, comments: filteredComments };
        case "LOGOUT_POSTS":
            return { ...state, posts: [], comments: [] };
        default:
            return state;
    }
};

export default post;
