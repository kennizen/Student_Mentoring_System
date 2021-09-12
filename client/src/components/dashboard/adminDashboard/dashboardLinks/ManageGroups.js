import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { adminGetMentorMentee } from "../../../../actions/admin";

const ManageGroups = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { mentorMenteeDetails } = useSelector((state) => state.admin);

    console.log("mentor mentee data in manage groups", mentorMenteeDetails);

    useEffect(() => {
        dispatch(adminGetMentorMentee(history));
    }, [dispatch, history]);

    return (
        <div className="w-screen pl-4 pr-4 pb-4">
            {mentorMenteeDetails === null ? (
                <h1>LOADING...</h1>
            ) : (
                <div className="flex items-center justify-evenly">
                    <section>
                        {mentorMenteeDetails.mentors.map((mentor) => {
                            return <h1 key={mentor._id}>{mentor.name}</h1>;
                        })}
                    </section>
                    <section>
                        {mentorMenteeDetails.students.map((student) => {
                            return <h1 key={student._id}>{student.name}</h1>;
                        })}
                    </section>
                    <section>
                        <h1>Group info</h1>
                    </section>
                </div>
            )}
        </div>
    );
};

export default ManageGroups;
