import * as api from "../api/admin";

export const adminSignIn = (fields, history) => async (dispatch) => {
    try {
        console.log("inside try in admin actions");

        const { authData } = await api.signIn(fields);

        dispatch({ type: "SIGN_IN", authData });

        console.log(authData);
    } catch (error) {
        console.log(error);
    }
};
