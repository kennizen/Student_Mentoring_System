import React from "react";

const ListComponent = ({ name, avatar, assigned }) => {
    return (
        <>
            <img src={avatar.url} alt={name} className="h-9 w-9 place-self-center" />
            <div className="col-span-3">
                <h2 className="select-none">{name}</h2>
                <h6 className="mb-1 select-none">Assistant Proffessor - CSE</h6>
                <hr />
            </div>
            {assigned === "assigned" || assigned === "in a group" ? (
                <h6 className="col-start-5 col-span-2 place-self-center py-px px-2 bg-green-300 rounded-xl">
                    {assigned}
                </h6>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default ListComponent;
