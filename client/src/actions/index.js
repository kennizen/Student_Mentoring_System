import { forgotPassword } from "../api/forgotPassword";

export const sendForgotPassword = (email, showToast, setShowModal) => async (dispatch) => {
    try {
        const { data } = await forgotPassword(email);
        setShowModal(false);
        if (data.code === 200) {
            showToast("info", data.msg, 5000);
        } else {
            showToast("error", data.msg, 10000);
        }
        console.log("data in forgot passowrd", data);
    } catch (error) {
        console.log(error);
    }
};
