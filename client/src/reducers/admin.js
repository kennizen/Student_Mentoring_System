const admin = (state = { mentorMenteeDetails: {}, adminData: null, logs: [] }, action) => {
    switch (action.type) {
        case "SIGN_IN_ADMIN":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return state;
        case "FETCH_LOGS":
            return { ...state, logs: action.data.data.logs };
        case "FETCH_ADMIN":
            return { ...state, adminData: action.data.data.user };
        case "FETCH_MENTOR_MENTEE":
            return { ...state, mentorMenteeDetails: action.data.data };
        case "LOGOUT_ADMIN":
            localStorage.clear();
            return { ...state, adminData: null, mentorMenteeDetails: {}, logs: [] };
        default:
            return state;
    }
};

export default admin;
