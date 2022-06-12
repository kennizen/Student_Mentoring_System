import React from "react";
import { useDispatch } from "react-redux";
import { sendForgotPassword } from "../../actions";

const ForgotPasswordModal = ({ nodeRef, setShowModal, setFPEmail, FPEmail }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFPEmail({ ...FPEmail, [e.target.name]: e.target.value });
    };

    // funtion to set the email for forgot passowrd
    const handleForgotPassword = () => {
        dispatch(sendForgotPassword(FPEmail, setShowModal));
        setFPEmail({ ...FPEmail, email: "" });
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Enter email</h4>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setFPEmail({ ...FPEmail, email: "" });
                            }}
                            className="text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <input
                        name="email"
                        onChange={handleChange}
                        type="text"
                        className="rounded-md border border-blue-500"
                    />

                    <div className="w-full mt-2 flex items-center justify-end">
                        <button
                            onClick={handleForgotPassword}
                            disabled={FPEmail.length === 0 ? true : false}
                            className="flex items-center justify-between py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white disabled:opacity-50"
                        >
                            Send reset link
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordModal;
