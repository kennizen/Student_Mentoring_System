import { forgotPassword } from "../api/forgotPassword";
import { sendRecaptcha } from "../api/recaptcha";

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

export const verifyRecaptcha = (token, showToast, setRecaptcha) => async (dispatch) => {
    try {
        const { data } = await sendRecaptcha(token);
        if (data.code === 200) {
            setRecaptcha(!data.data.success);
        } else {
            showToast("error", data.msg, 10000);
        }
        console.log("data in recaptcha", data);
    } catch (error) {
        console.log(error);
    }
};
