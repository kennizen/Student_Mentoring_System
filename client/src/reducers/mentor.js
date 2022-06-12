const mentor = (
    state = { mentorData: null, comments: [], profileData: null, mentees: [] },
    action
) => {
    switch (action.type) {
        case "SIGN_IN_MENTOR":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return state;
        case "FETCH_MENTOR":
            return { ...state, mentorData: action.data };
        case "STORE_MENTEES":
            const tmp = action.mentees;
            tmp.sort((a, b) => {
                return a.firstname.toLowerCase() > b.firstname.toLowerCase() ? 1 : -1;
            });
            console.log("tmp", tmp);
            return { ...state, mentees: tmp };
        case "FETCH_MENTOR_PROFILE":
            return { ...state, profileData: action.profile };
        case "CONNECT_SOCKET_MENTOR":
            return { ...state, socket: action.socket };
        case "LOGOUT_MENTOR":
            localStorage.clear();
            return { ...state, mentorData: null };
        default:
            return state;
    }
};

export default mentor;
