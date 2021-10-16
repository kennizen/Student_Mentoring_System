const mentor = (state = { mentorData: null, genPosts: [] }, action) => {
    switch (action.type) {
        case "SIGN_IN_MENTOR":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return state;
        case "FETCH_MENTOR":
            return { ...state, mentorData: action.data };
        case "SAVE_GEN_POSTS":
            return { ...state, genPosts: action.data.data.posts };
        case "SUBMIT_POST":
            const newArray = [];
            newArray.push(action.data.data);
            return { ...state, genPosts: [...state.genPosts].concat(newArray) };
        case "LOGOUT_MENTOR":
            localStorage.clear();
            return { ...state, mentorData: null };
        default:
            return state;
    }
};

export default mentor;
