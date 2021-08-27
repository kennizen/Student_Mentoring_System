import React from "react";

const Profile = ({ details }) => {
    return (
        <div>
            <h1>{details.email}</h1>
        </div>
    );
};

export default Profile;
