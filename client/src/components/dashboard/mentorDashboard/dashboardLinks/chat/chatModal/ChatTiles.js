import React from "react";

const ChatTiles = ({ mentee, handleChange }) => {
    return (
        <div className="flex flex-shrink-0 items-center justify-between p-2 border border-solid border-gray-200 rounded-md">
            <div className="flex items-center justify-start mr-6">
                <img
                    className="h-10 w-10 rounded-full mr-3"
                    src={
                        mentee.avatar.url === ""
                            ? `https://avatars.dicebear.com/api/initials/${mentee.firstname}.svg`
                            : mentee.avatar.url
                    }
                    alt=""
                />
                <div className="flex flex-col">
                    <h5>{`${mentee.firstname} ${mentee.middlename} ${mentee.lastname}`}</h5>
                    <h6>{mentee.enrollment_no}</h6>
                </div>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer focus:ring-0 focus:ring-offset-0"
                    type="checkbox"
                    value=""
                    id={mentee._id}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </div>
    );
};

export default ChatTiles;
