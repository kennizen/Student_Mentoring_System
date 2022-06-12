import * as api from "../api/student";
import { updateProfilePicutre, deleteProfilePicutre } from "../api/profilePicture";
import { showToast } from "../components/toast/toast";
import { toast } from "react-toastify";

export const studentSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        if (data.code === 200) {
            dispatch({ type: "SIGN_IN_STUDENT", data });
            history.push("/mentee/dashboard");
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.TOP_RIGHT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentSignUp = (fields, handleToggle) => async (dispatch) => {
    const handleActions = () => {
        handleToggle();
        showToast(
            "info",
            "We have sent a verification email to the registered email id, please verify before login",
            false
        );
    };
    try {
        const { data } = await api.signUp(fields);
        console.log("student sign up data", data);
        if (data.code === 200) {
            showToast(
                "success",
                data.msg + ", redirecting to login",
                3000,
                toast.POSITION.TOP_RIGHT,
                handleActions
            );
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.TOP_RIGHT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetDetails = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStudent();
        console.log("student data in actions", data);

        if (data.code === 200) {
            return dispatch({ type: "FETCH_STUDENT", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetProfileDetails = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentProfile();
        console.log("student profile data in actions", data);

        if (data.code === 200) {
            return dispatch({ type: "FETCH_PROFILE", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentUpdateProfileDetails = (history, fields) => async (dispatch) => {
    try {
        console.log("from actions", fields);
        const { data } = await api.updateStudentProfile(fields);
        console.log("student profile data in actions from update", data);

        if (data.code === 200) {
            dispatch({ type: "FETCH_PROFILE", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentUpdateProfilePicture = (history, image) => async (dispatch) => {
    try {
        const { data } = await updateProfilePicutre(image);
        console.log("student profile picture data in actions", data);

        if (data.code === 200) {
            // again calling fetch student profile so that we get the updated avatar url
            dispatch(studentGetProfileDetails());
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentDeleteProfilePicture = (history) => async (dispatch) => {
    try {
        const { data } = await deleteProfilePicutre();
        console.log("student deleted profile picture data in actions", data);

        if (data.code === 200) {
            // again calling fetch student profile so that we get the updated avatar url
            dispatch(studentGetProfileDetails());
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetSemesterDetails = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentSemesterDetails();
        console.log("student semester data in actions from get", data);

        if (data.code === 200) {
            dispatch({ type: "SAVE_SEM_DATA", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentAddSemesterDetails = (history, fields, setIsLoading) => async (dispatch) => {
    try {
        console.log("in actions for semdetails", fields);
        const { data } = await api.addStudentSemesterDetails(fields);
        console.log("student semester data in actions from add", data);

        if (data.code === 200) {
            dispatch({ type: "ADD_SEM_DATA", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
        setIsLoading(false);
    } catch (error) {
        console.log(error);
    }
};

export const studentUpdateSemesterDetails = (history, fields) => async (dispatch) => {
    try {
        console.log("in actions for semdetails", fields);
        const { data } = await api.updateStudentSemesterDetails(fields);
        console.log("student semester data in actions from update", data);

        if (data.code === 200) {
            dispatch({ type: "UPDATE_SEM_DATA", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentDeleteSemesterDetails = (history, fields) => async (dispatch) => {
    try {
        console.log("in actions for semdetails", fields);
        const { data } = await api.deleteStudentSemesterDetails(fields);
        console.log("student semester data in actions from delete", data);

        if (data.code === 200) {
            dispatch({ type: "DELETE_SEM_DATA", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetPastEduDetails = () => async (dispatch) => {
    try {
        const { data } = await api.getStudentPastEduDetails();
        console.log("student past edu data in actions from get", data);

        if (data.code === 200) {
            dispatch({ type: "SAVE_PAST_EDU_DATA", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentUpdatePastEduDetails = (history, fields) => async (dispatch) => {
    try {
        console.log("in actions for pastEduDetails", fields);
        const { data } = await api.updateStudentPastEduDetails(fields);
        console.log("student past edu data in actions from update", data);

        if (data.code === 200) {
            dispatch({ type: "SAVE_PAST_EDU_DATA", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetAllStudentsOfMentor = (history, setMyMentees) => async (dispatch) => {
    try {
        const { data } = await api.getStudentsOfMentor();
        console.log("students of mentor", data);

        if (data.code === 200) {
            setMyMentees(data.data.students);
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const logoutStudent = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_STUDENT" });
    } catch (error) {
        console.log(error);
    }
};
