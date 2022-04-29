import * as api from "../api/student";
import { updateProfilePicutre, deleteProfilePicutre } from "../api/profilePicture";

export const studentSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        dispatch({ type: "SIGN_IN_STUDENT", data });
        history.push("/mentee/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const studentSignUp = (fields, displaySuccessOrError) => async (dispatch) => {
    try {
        const { data } = await api.signUp(fields);
        console.log("student sign up data", data);
        if (data.code === 200) {
            displaySuccessOrError(200);
        } else if (data.code === 500) {
            displaySuccessOrError(500);
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchStudent();
        console.log("student data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_STUDENT" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_STUDENT", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetProfileDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentProfile();
        console.log("student profile data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_PROFILE", data });
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

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_PROFILE", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentUpdateProfilePicture = (history, image) => async (dispatch) => {
    try {
        const { data } = await updateProfilePicutre(image);
        console.log("student profile picture data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            // again calling fetch student profile so that we get the updated avatar url
            dispatch(studentGetProfileDetails(history));
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentDeleteProfilePicture = (history) => async (dispatch) => {
    try {
        const { data } = await deleteProfilePicutre();
        console.log("student deleted profile picture data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            // again calling fetch student profile so that we get the updated avatar url
            dispatch(studentGetProfileDetails(history));
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetSemesterDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentSemesterDetails();
        console.log("student semester data in actions from get", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SAVE_SEM_DATA", data });
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

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "ADD_SEM_DATA", data });
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

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "UPDATE_SEM_DATA", data });
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

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "DELETE_SEM_DATA", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetPastEduDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.getStudentPastEduDetails();
        console.log("student past edu data in actions from get", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SAVE_PAST_EDU_DATA", data });
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

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "SAVE_PAST_EDU_DATA", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const studentGetAllStudentsOfMentor = (history, setAllMentees) => async (dispatch) => {
    try {
        const { data } = await api.getStudentsOfMentor();
        console.log("students of mentor", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 403) {
            history.goBack();
        } else {
            setAllMentees(data.data.students);
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
