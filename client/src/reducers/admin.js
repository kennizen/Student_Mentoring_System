const admin = (state = { user: null }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data }));
            return { ...state, user: action?.data };
        case "FETCH":
            return action.data;
        case "LOGOUT":
            localStorage.clear();
            return { ...state, user: null };
        default:
            return state;
    }
};

export default admin;
