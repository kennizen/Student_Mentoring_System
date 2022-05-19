import React from "react";
import moment from "moment";
import { Chip } from "@mui/material";

const MeetingDetailsModal = ({
    nodeRef,
    setShowOverlay,
    setShowMeetingDetailsModal,
    selectedMeeting,
}) => {
    // function to hide modal from within the modal
    const handleHideModalOperations = () => {
        setShowOverlay(false);
        setShowMeetingDetailsModal(false);
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Meeting details</h4>
                        <button onClick={handleHideModalOperations} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-start">
                            <img
                                className="w-12 h-12 mr-2 rounded-full"
                                src={selectedMeeting?.host?.avatar?.url}
                                alt=""
                            />
                            <div className="">
                                <div className="">
                                    <h5>{`${selectedMeeting?.host?.firstname} ${selectedMeeting?.host?.middlename} ${selectedMeeting?.host?.lastname}`}</h5>
                                    <h6 className="text-gray-600">
                                        {moment(selectedMeeting?.createdAt).format("DD/MM/yyyy")}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <p>{selectedMeeting?.description}</p>
                        <a
                            className="underline"
                            href={selectedMeeting?.url}
                            rel="noreferrer"
                            target="_blank"
                        >
                            {selectedMeeting?.url}
                        </a>
                        <div className="w-full flex items-center flex-wrap gap-x-2">
                            {selectedMeeting?.participants?.map((p) => {
                                return (
                                    <Chip
                                        key={p._id}
                                        avatar={
                                            <img
                                                className="rounded-full"
                                                src={p?.user?.avatar?.url}
                                                alt=""
                                            />
                                        }
                                        label={p?.user?.enrollment_no}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingDetailsModal;
