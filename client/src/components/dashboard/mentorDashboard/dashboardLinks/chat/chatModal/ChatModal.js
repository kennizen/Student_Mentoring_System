import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mentorGetAllMentees } from "../../../../../../actions/mentor";
import ChatTiles from "./ChatTiles";

import Plus from "../../../../../../assets/Plus";

const ChatModal = ({ setShowModal, nodeRef }) => {
    // state variable to store the fetched mentees from the api
    const [mentees, setMentees] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    // state variable to store the chat ids of the selected mentees
    const [chatIds, setChatIds] = useState([]);

    // useEffect as component did mount to fetch the mentee for the mentor
    useEffect(() => {
        dispatch(mentorGetAllMentees(history, setMentees));
    }, [dispatch, history]);

    // function to add and remove the chat ids from the state variable chatIds
    const handleChange = (e) => {
        const checked = e.target.checked;
        const id = e.target.id;
        if (checked) {
            setChatIds([...chatIds, id]);
        } else {
            const newChatIds = chatIds.filter((chatid) => chatid !== id);
            setChatIds(newChatIds);
        }
    };

    console.log("mentees", mentees);
    console.log("chatIds", chatIds);

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className={`max-h-500 overflow-y-auto w-11/12 z-50 p-6 bg-white rounded-md`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4>Create a chat</h4>
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                            className="text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <div>
                        <h5>Selected - {chatIds.length}</h5>
                    </div>

                    <div className="grid grid-cols-6 gap-3">
                        {mentees.map((mentee) => (
                            <ChatTiles
                                key={mentee._id}
                                mentee={mentee}
                                handleChange={handleChange}
                            />
                        ))}
                    </div>

                    <div className="w-full mt-2 flex items-center justify-end">
                        <button
                            disabled={chatIds.length === 0 ? true : false}
                            className="flex items-center justify-between py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white disabled:opacity-50"
                        >
                            <Plus alt={false} myStyle={"h-5 w-5 mr-2"} /> Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatModal;
