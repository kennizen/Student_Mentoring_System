import React from "react";

const ChatSideBar = () => {
    return (
        <>
            <div className="w-2/5 mt-7 p-2 bg-white rounded-md h-full overflow-auto">
                <div className="sticky-top">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="pl-11 border-none w-full focus:outline-none focus:ring-0 bg-gray-100 rounded-md"
                            placeholder="Search chat..."
                        />
                        <div className="absolute top-2.5 left-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-chatTab p-2 mb-4">
                    <img
                        className="h-14 w-14 rounded-full"
                        src="https://picsum.photos/id/237/200/300"
                        alt="img"
                    />
                    <div className="border-b border-solid border-gray-200 flex mx-6 flex-col items-start justify-evenly">
                        <h2>John Doe</h2>
                        <h6>Hi how are you?</h6>
                    </div>
                    <div className="px-3 flex flex-col items-center justify-evenly">
                        <h6>a min ago</h6>
                        <div className="bg-red-200 p-2.5 h-3 w-3 rounded-full flex items-center justify-center">
                            <h6>2</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatSideBar;
