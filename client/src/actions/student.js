import * as api from "../api/student";

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
