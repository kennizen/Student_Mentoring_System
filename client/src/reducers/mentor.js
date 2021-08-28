const mentor = (state = { user: null }, action) => {
    switch (action.type) {
        case "SIGN_IN_MENTOR":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return { ...state, user: action?.data?.data };
        case "FETCH_MENTOR":
            return action.data;
        case "LOGOUT_MENTOR":
            localStorage.clear();
            return { ...state, user: null };
        default:
            return state;
    }
};

export default mentor;
