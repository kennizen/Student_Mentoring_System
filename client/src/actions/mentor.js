import { toast } from "react-toastify";
import * as api from "../api/mentor";
import { deleteProfilePicutre, updateProfilePicutre } from "../api/profilePicture";
import { showToast } from "../components/toast/toast";

export const mentorSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        console.log("mentor sign in data", data);
        if (data.code === 200) {
            dispatch({ type: "SIGN_IN_MENTOR", data });
            history.push("/mentor/dashboard");
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.TOP_RIGHT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorSignUp = (fields, handleToggle) => async (dispatch) => {
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
        console.log("mentor sign up data", data);
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

export const mentorGetDetails = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMentor();
        console.log("mentor data in actions", data);

        if (data.code === 200) {
            return dispatch({ type: "FETCH_MENTOR", data });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorGetAllMentees = () => async (dispatch) => {
    try {
        const { data } = await api.getAllMentees();
        console.log("mentor all mentees in actions", data);

        if (data.code === 200) {
            const mentees = data.data.mentees;
            return dispatch({ type: "STORE_MENTEES", mentees });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
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
            if (data.code === 200) {
                setSemesters(data.data.semesters);
            } else {
                showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
            }
        } catch (error) {
            console.log(error);
        }
    };

export const mentorGetProfile = () => async (dispatch) => {
    try {
        const { data } = await api.getProfile();
        console.log("mentor profile in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const profile = data.data.profileData;
            return dispatch({ type: "FETCH_MENTOR_PROFILE", profile });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorUpdateProfile = (history, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(formData);
        console.log("mentor updated profile in actions", data);

        //check if the response data is error
        if (data.code === 200) {
            const profile = data.data.profileData;
            dispatch({ type: "FETCH_MENTOR_PROFILE", profile });
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorUpdateProfilePicture = (history, image) => async (dispatch) => {
    try {
        const { data } = await updateProfilePicutre(image);
        console.log("mentor profile picture data in actions", data);

        if (data.code === 200) {
            // again calling fetch student profile so that we get the updated avatar url
            dispatch(mentorGetProfile());
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const mentorDeleteProfilePicture = () => async (dispatch) => {
    try {
        const { data } = await deleteProfilePicutre();
        console.log("mentor deleted profile picture data in actions", data);

        if (data.code === 200) {
            // again calling fetch student profile so that we get the updated avatar url
            dispatch(mentorGetProfile());
        } else {
            showToast("error", data.msg, 10000, toast.POSITION.BOTTOM_LEFT);
        }
    } catch (error) {
        console.log(error);
    }
};

export const logoutMentor = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_MENTOR" });
    } catch (error) {
        console.log(error);
    }
};
