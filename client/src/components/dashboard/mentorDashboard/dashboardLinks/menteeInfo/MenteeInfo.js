import React from "react";

const MenteeInfo = () => {
    return (
        <div className="h-845 w-full py-6 px-12 overflow-y-auto">
            <div className="w-full bg-gray-100 p-3 rounded-md shadow-md">
                <div>
                    <h2 className="font-medium mb-3">Mentee Information</h2>
                    <h5 className="font-light mb-10">50 mentees found</h5>
                </div>
                <div className="grid grid-cols-8 bg-white rounded-md py-1 px-2">
                    <div className="">
                        <h5 className="font-semibold">Enrollment No.</h5>
                    </div>
                    <div className="">
                        <h5 className="font-semibold">Name</h5>
                    </div>
                    <div className="col-span-2">
                        <h5 className="font-semibold">Address</h5>
                    </div>
                    <div className="">
                        <h5 className="font-semibold">Department</h5>
                    </div>
                    <div className="">
                        <h5 className="font-semibold">Semester</h5>
                    </div>
                    <div className="">
                        <h5 className="font-semibold">Mobile No.</h5>
                    </div>
                    <div className="">
                        <h5 className="font-semibold">Actions</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteeInfo;
