import React from "react";

const ListComponent = ({
    firstname,
    middlename,
    lastname,
    avatar,
    assigned,
    isInGroup,
    isStudent,
    department,
}) => {
    return (
        <>
            <img
                src={
                    avatar.url === ""
                        ? `https://avatars.dicebear.com/api/initials/${firstname}.svg`
                        : avatar.url
                }
                alt={`${firstname} ${middlename} ${lastname}`}
                className="h-9 w-9 place-self-center rounded-full"
            />
            <div className="col-span-3">
                <h4>{`${firstname} ${middlename} ${lastname}`}</h4>
                <div
                    className={`flex items-center ${
                        isStudent ? "ml-3 justify-start" : "justify-between"
                    } `}
                >
                    {isStudent || <h6 className="mb-1">Assistant Proffessor</h6>}
                    {isStudent || <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>}
                    <h6>{department}</h6>
                </div>
            </div>
            {(assigned === "assigned" || assigned === "in a group") && !isInGroup ? (
                <h6 className="ml-7 col-start-5 col-span-2 place-self-center py-px px-2 bg-green-100 rounded-xl text-green-600">
                    {assigned}
                </h6>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default ListComponent;
