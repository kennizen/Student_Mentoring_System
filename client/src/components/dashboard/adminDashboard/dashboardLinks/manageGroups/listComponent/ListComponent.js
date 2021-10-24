import React from "react";

const ListComponent = ({ name, avatar, assigned, isInGroup }) => {
    return (
        <>
            <img
                src={
                    avatar.url === ""
                        ? `https://avatars.dicebear.com/api/initials/${name}.svg`
                        : avatar.url
                }
                alt={name}
                className="h-9 w-9 place-self-center rounded-full"
            />
            <div className="col-span-3">
                <h4 className="select-none">{name}</h4>
                <div className="flex items-center justify-between">
                    <h6 className="mb-1 select-none">Assistant Proffessor</h6>
                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    <h6>CSE</h6>
                </div>
            </div>
            {(assigned === "assigned" || assigned === "in a group") && !isInGroup ? (
                <h6 className="col-start-5 col-span-2 place-self-center py-px px-2 bg-green-100 rounded-xl text-green-600">
                    {assigned}
                </h6>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default ListComponent;
