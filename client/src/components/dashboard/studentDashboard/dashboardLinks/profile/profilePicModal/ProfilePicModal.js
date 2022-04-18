import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { studentUpdateProfilePicture } from "../../../../../../actions/student";
import UploadIcon from "../../../../../../assets/UploadIcon";

const ProfilePicModal = ({ setHiddenProfilePicModal, setShowOverlay, nodeRef }) => {
    const [image, setImage] = useState(null);
    const [imageToBeSent, setImageToBeSent] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("avatar", imageToBeSent);
        dispatch(studentUpdateProfilePicture(history, formData));
        handleModalActions();
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setImageToBeSent(event.target.files[0]);
        }
    };

    const handleModalActions = () => {
        setHiddenProfilePicModal(false);
        setShowOverlay(false);
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div ref={nodeRef} className="overflow-y-auto z-50 p-6 bg-white rounded-md">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Update profile photo</h4>
                        <button onClick={handleModalActions} className="text-2xl">
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
            </div>
        </>
    );
};

export default ProfilePicModal;
