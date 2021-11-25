const student = (state = { studentData: null, profileData: null }, action) => {
    switch (action.type) {
        case "SIGN_IN_STUDENT":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return { ...state, studentData: action?.data?.data };
        case "FETCH_STUDENT":
            return { ...state, studentData: action.data };
        case "FETCH_PROFILE":
            return { ...state, profileData: action.data.data.studentData };
        case "LOGOUT_STUDENT":
            localStorage.clear();
            return { ...state, studentData: null };
        default:
            return state;
    }
};

export default student;
