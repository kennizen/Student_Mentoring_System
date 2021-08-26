const admin = (state = { auth_token: null }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            localStorage.setItem("auth_token", action?.data?.auth_token);
            return { ...state, auth_token: action?.data?.auth_token };
        case "LOGOUT":
            localStorage.clear();
            return { ...state, auth_token: null };
        default:
            return state;
    }
};

export default admin;
