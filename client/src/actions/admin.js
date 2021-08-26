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
