const admin = (state = { mentorMenteeDetails: null, adminData: null }, action) => {
    switch (action.type) {
        case "SIGN_IN_ADMIN":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return state;
        case "FETCH_ADMIN":
            return { ...state, adminData: action.data };
        case "FETCH_MENTOR_MENTEE":
            return { ...state, mentorMenteeDetails: action.data.data };
        case "LOGOUT_ADMIN":
            localStorage.clear();
            return { ...state, adminData: null };
        default:
            return state;
    }
};

export default admin;
