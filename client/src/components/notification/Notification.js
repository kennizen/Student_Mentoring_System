import React from "react";
import ChatIcon from "../../assets/ChatIcon";
import DotIcon from "../../assets/DotIcon";
import DoubleTickIcon from "../../assets/DoubleTickIcon";

const chooseIcon = () => {};

const Notification = ({ myStyle }) => {
    return (
        <div
            className={`${myStyle} h-96 w-80 bg-gray-600 absolute z-10 top-12 -right-4 rounded-md px-3 py-2`}
        >
            <div className="h-full w-full flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between mb-2">
                    <h4 className="text-white">Notifications</h4>
                    <button className="text-blue-400 hover:text-blue-500 transition-all text-sm flex items-center justify-between gap-x-2">
                        <DoubleTickIcon myStyle={"h-4 w-4"} />
                        Mark all read
                    </button>
                </div>
                <div className="h-full overflow-auto w-full">
                    <div className="flex items-start justify-between p-2 gap-x-3 mb-2 transition-all border-b border-gray-500">
                        <div className="flex items-start gap-x-3 justify-between">
                            <DoubleTickIcon myStyle={"h-4 w-4 text-blue-500 flex-shrink-0"} />
                            <div className="text-white">
                                <h5 className="text-left">A post has been created.</h5>
                                <h6 className="text-left">ken kennizen at 10:45 pm</h6>
                            </div>
                        </div>
                        <ChatIcon myStyle={"h-10 w-10 text-blue-500"} />
                    </div>
                    <div className="flex items-start justify-between p-2 bg-gray-700 gap-x-3 rounded-md mb-2 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start gap-x-3 justify-between">
                            <DotIcon myStyle={"h-3 w-3 bg-blue-600 rounded-full"} />
                            <div className="text-white">
                                <h5 className="text-left">A post has been created.</h5>
                                <h6 className="text-left">ken kennizen at 10:45 pm</h6>
                            </div>
                        </div>
                        <ChatIcon myStyle={"h-10 w-10 text-blue-600"} />
                    </div>
                </div>
                <div className="w-9/10 border-t border-solid border-white flex items-center justify-start ">
                    <button className="py-2 hover:text-gray-300 text-white text-sm transition-all">
                        View all notifications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
