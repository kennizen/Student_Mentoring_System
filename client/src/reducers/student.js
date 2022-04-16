const student = (
    state = { studentData: null, profileData: {}, semData: [], pastEducation: {} },
    action
) => {
    switch (action.type) {
        case "SIGN_IN_STUDENT":
            localStorage.setItem("authData", JSON.stringify({ ...action?.data?.data }));
            return { ...state, studentData: action?.data?.data };
        case "FETCH_STUDENT":
            return { ...state, studentData: action.data };
        case "CONNECT_SOCKET_STUDENT":
            return { ...state, socket: action.socket };
        case "FETCH_PROFILE":
            return { ...state, profileData: action.data.data.profileData };
        case "SAVE_SEM_DATA":
            return { ...state, semData: action.data.data.semesters };
        case "ADD_SEM_DATA":
            return { ...state, semData: [...state.semData, action.data.data.semesters] };
        case "UPDATE_SEM_DATA":
            let pos;
            state.semData.forEach((element, i) => {
                if (element._id === action.data.data.semesters._id) {
                    pos = i;
                }
            });
            state.semData[pos] = action.data.data.semesters;
            return { ...state };
        case "DELETE_SEM_DATA":
            let filteredSemesters = [];
            state.semData.forEach((sem) => {
                if (sem._id !== action.data.data.semester._id) {
                    filteredSemesters.push(sem);
                }
            });
            return { ...state, semData: filteredSemesters };
        case "SAVE_PAST_EDU_DATA":
            return { ...state, pastEducation: action.data.data.pastEducation };
        case "LOGOUT_STUDENT":
            localStorage.clear();
            return { ...state, studentData: null };
        default:
            return state;
    }
};

export default student;
