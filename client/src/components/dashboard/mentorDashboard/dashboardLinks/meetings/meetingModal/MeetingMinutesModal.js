import React from "react";

const MeetingMinutesModal = ({
    nodeRef,
    setShowOverlay,
    setShowMeetingMinutesModal,
    handleMinutesSubmit,
    meetMinutes,
    setMeetMinutes,
}) => {
    // function to handle the modal hide ops
    const handleHideModalOperations = () => {
        setShowOverlay(false);
        setShowMeetingMinutesModal(false);
        setMeetMinutes({ id: "", minutes: "" });
    };

    // function to handle onchange
    const handleChange = (e) => {
        setMeetMinutes({ ...meetMinutes, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Meeting minutes</h4>
                        <button onClick={handleHideModalOperations} className="text-2xl">
                            &times;
                        </button>
                    </div>

                    <div className="flex items-center flex-wrap justify-start gap-x-3">
                        <textarea
                            onChange={handleChange}
                            value={meetMinutes.minutes}
                            required
                            name="minutes"
                            id="minutes"
                            rows={4}
                            placeholder="Add minutes..."
                            className="resize rounded-md border-gray-300 border focus:ring-0"
                        ></textarea>
                    </div>

                    <div className="w-full flex items-center justify-end gap-x-4">
                        <button
                            name="createNew"
                            disabled={meetMinutes.minutes.length > 0 ? false : true}
                            onClick={handleMinutesSubmit}
                            type="submit"
                            className="mt-3 py-1 px-2 hover:bg-blue-600 rounded-md text-white bg-blue-500 transition-all disabled:opacity-50"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeetingMinutesModal;
