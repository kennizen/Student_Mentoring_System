const student = (state = { user: null }, action) => {
    switch (action.type) {
        case "SIGN_IN_STUDENT":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return { ...state, user: action?.data?.data };
        case "FETCH_STUDENT":
            return action.data;
        case "LOGOUT_STUDENT":
            localStorage.clear();
            return { ...state, user: null };
        default:
            return state;
    }
};

export default student;
