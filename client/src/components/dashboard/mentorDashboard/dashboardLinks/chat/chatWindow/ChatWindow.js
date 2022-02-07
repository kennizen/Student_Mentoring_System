import React from "react";
import { useState } from "react";

const ChatWindow = () => {
    // state for custom placeholder in the input div
    const [placeHol, setPlaceHol] = useState("opacity-100");
    // state to set the disable status of the send button
    const [disable, setDisable] = useState(true);

    // function to send the text message
    const sendMessage = () => {
        let contenteditable = document.querySelector("[contenteditable]");
        let text = contenteditable.textContent;
        console.log(text);
        contenteditable.innerHTML = "";
        contenteditable.focus();
        check();
    };

    // function for hiding the custom placeholder
    const focusPlaceHol = () => {
        setPlaceHol("opacity-0");
    };

    // function for showing the custom placeholder
    const blurPlaceHol = () => {
        let contenteditable = document.querySelector("[contenteditable]");
        if (contenteditable.innerHTML === "" || contenteditable.innerHTML === "<br>") {
            setPlaceHol("opacity-100");
        }
    };

    /* function to check if the custom input div is empty or not to control the send button disable status */
    const check = () => {
        let contenteditable = document.querySelector("[contenteditable]");
        // console.log("running");
        // console.log(contenteditable.innerHTML);
        if (contenteditable.innerHTML === "<br>") {
            setDisable(true);
        } else if (contenteditable.innerHTML !== "") {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };

    return (
        <>
            <div className="w-3/5 mt-7 p-2 bg-white rounded-md h-full overflow-auto">
                <div className="w-full h-9/10 overflow-auto"></div>
                <div className="w-full h-1/10">
                    <div className="flex items-center justify-center h-full gap-x-6">
                        <div className="w-3/5 relative">
                            <div
                                onFocus={focusPlaceHol}
                                onBlur={blurPlaceHol}
                                onKeyUp={check}
                                contentEditable={true}
                                className="px-2 py-3 rounded-md max-h-16 bg-gray-100 outline-none break-words overflow-auto"
                            ></div>
                            <h4
                                className={`text-gray-400 opa absolute top-3 left-2 pointer-events-none ${placeHol}`}
                            >
                                Type something...
                            </h4>
                        </div>

                        <button
                            title="Send message"
                            className={`bg-green-500 p-3.5 rounded-full disabled:opacity-50`}
                            onClick={sendMessage}
                            disabled={disable}
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="paper-plane"
                                className="svg-inline--fa fa-paper-plane fa-w-16 w-6 h-6"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="#ffffff"
                                    d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatWindow;
