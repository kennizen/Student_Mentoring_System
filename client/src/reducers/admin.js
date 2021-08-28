const admin = (state = { user: null }, action) => {
    switch (action.type) {
        case "SIGN_IN_ADMIN":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return { ...state, user: action?.data?.data };
        case "FETCH_ADMIN":
            return action.data;
        case "LOGOUT_ADMIN":
            localStorage.clear();
            return { ...state, user: null };
        default:
            return state;
    }
};

export default admin;
