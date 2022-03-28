import * as api from "../api/mentor";

export const mentorSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        dispatch({ type: "SIGN_IN_MENTOR", data });
        history.push("/mentor/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const mentorSignUp = (fields, displaySuccessOrError) => async (dispatch) => {
    try {
        const { data } = await api.signUp(fields);
        console.log("mentor sign up data", data);
        if (data.code === 200) {
            displaySuccessOrError(200);
        } else if (data.code === 500) {
            displaySuccessOrError(500);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetDetails = (history) => async (dispatch) => {
    try {
        const { data } = await api.fetchMentor();
        console.log("mentor data in actions", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"
        if (data.code === 401) {
            dispatch({ type: "LOGOUT_MENTOR" });
            history.push("/");
        } else if (data.code === 403) {
            history.goBack();
        } else {
            dispatch({ type: "FETCH_MENTOR", data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetAllMentees = (history, setAllMentees) => async (dispatch) => {
    try {
        const { data } = await api.getAllMentees();
        console.log("mentor all mentees in actions", data);

        //check if the response data is error
        if (data.code === 403) {
            history.goBack();
        } else {
            setAllMentees(data.data.mentees);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetAllMenteeSemesters =
    (history, setSemesters, menteeId) => async (dispatch) => {
        try {
            const { data } = await api.getAllMenteeSemesters(menteeId);
            console.log("mentee all semesters in actions", data);

            //check if the response data is error
            if (data.code === 403) {
                history.goBack();
            } else {
                setSemesters(data.data.semesters);
            }
        } catch (error) {
            console.log(error);
        }
    };
