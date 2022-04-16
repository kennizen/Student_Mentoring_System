import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { studentUpdateProfilePicture } from "../../../../../../actions/student";
import UploadIcon from "../../../../../../assets/UploadIcon";

const ProfilePicModal = ({ handleShowModal, history }) => {
    const [op, setOp] = useState("opacity-0");
    const [sc, setSc] = useState("scale-0");

    const [image, setImage] = useState(null);
    const [imageToBeSent, setImageToBeSent] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setOp("opacity-50");
            setSc("scale-100");
        }, 0);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("avatar", imageToBeSent);
        dispatch(studentUpdateProfilePicture(history, formData));
        handleShowModal(setOp, setSc);
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setImageToBeSent(event.target.files[0]);
        }
    };

    return (
        <>
            <div
                onClick={() => handleShowModal(setOp, setSc)}
                className={`${op} absolute flex items-center justify-center bg-black w-full h-screen top-0 right-0 z-30 transition-opacity`}
            ></div>
            <div
                className={`${sc} absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-2/6 max-h-800 overflow-y-auto z-50 p-6 bg-white transition-all rounded-md`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold">Change profile picture</h2>
                    <button onClick={() => handleShowModal(setOp, setSc)} className="text-2xl">
                        &times;
                    </button>
                </div>

                <div className="w-full flex items-center justify-center mb-5">
                    <img
                        className="w-32 h-32 rounded-md border border-gray-900"
                        src={image}
                        alt="Not selected"
                    />
                </div>

                <label
                    className="text-sm font-medium text-gray-900 block mb-2"
                    htmlFor="user_avatar"
                >
                    Upload a file (supported - png/jpeg)
                </label>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="flex items-center w-full justify-between gap-x-3">
                        <input
                            onChange={onImageChange}
                            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                        />
                        <button
                            title="Save photo"
                            type="submit"
                            className="p-2 bg-blue-600 border border-blue-600 hover:bg-blue-800 hover:border-blue-800 transition-all rounded-md text-white flex items-center justify-center"
                        >
                            <UploadIcon alt={false} myStyle={"h-5 w-5"} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProfilePicModal;
