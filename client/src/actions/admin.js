import * as api from "../api/admin";

export const adminSignIn = (fields, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(fields);
        dispatch({ type: "SIGN_IN", data });
        history.push("/admin/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const adminGetDetails = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAdmin();
        console.log("admin data", data);

        // check if the response data is error
        // if yes then call dispatch logout
        // and redirect to "/"

        dispatch({ type: "FETCH", data });
    } catch (error) {
        console.log(error);
    }
};
