import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChat } from "../../../../../../actions/chat";
import ChatTiles from "./ChatTiles";

import Plus from "../../../../../../assets/icons/Plus";
import { studentGetAllStudentsOfMentor } from "../../../../../../actions/student";
import { authContext } from "../../../../../../contexts/authContext";
import { Roles } from "../../../../../../utility";

const ChatModal = ({ setShowModal, nodeRef }) => {
    // state variable to store the fetched mentees from the api
    const [myMentees, setMyMentees] = useState([]);

    // accesing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);
    const { mentees } = useSelector((state) => state.mentor);

    const dispatch = useDispatch();
    const history = useHistory();

    // state variable to store the chat ids of the selected mentees
    const [chatIds, setChatIds] = useState({ chats: [] });

    const { role } = useContext(authContext);

    // useEffect as component did mount to fetch the mentee for the mentor
    useEffect(() => {
        // checking to see if the logged in user in student or mentor
        if (role === Roles.STUDENT) dispatch(studentGetAllStudentsOfMentor(history, setMyMentees));
        else setMyMentees(mentees);
    }, [dispatch, history, role]);

    // function to add and remove the chat ids from the state variable chatIds
    const handleChange = (e) => {
        const checked = e.target.checked;
        const id = e.target.id;
        if (checked) {
            setChatIds({ chats: [...chatIds.chats, id] });
        } else {
            const newChatIds = chatIds.chats.filter((chatid) => chatid !== id);
            setChatIds({ chats: newChatIds });
        }
    };

    // function to submit the chatIds to the api for creation of new chats
    const handleSubmit = () => {
        dispatch(createChat(history, setShowModal, chatIds));
    };

    console.log("users", mentees);
    console.log("chatIds", chatIds);

    return (
        <>
            <div className="w-full h-full bg-transparent absolute top-0 left-0 flex items-center justify-center">
                <div
                    ref={nodeRef}
                    className="max-h-500 overflow-y-auto max-w-7xl z-50 p-6 bg-white rounded-md"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="mr-5">Create a chat</h4>
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                            className="text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="mb-2">
                        <h5>Selected - {chatIds.chats.length}</h5>
                    </div>

                    <div className="flex items-center flex-wrap justify-start gap-x-3">
                        {myMentees.map((mentee) => {
                            if (
                                chats.find((chat) =>
                                    chat.users.find(
                                        (user) => user.user._id.toString() === mentee._id.toString()
                                    )
                                ) === undefined
                            ) {
                                return (
                                    <ChatTiles
                                        key={mentee._id}
                                        mentee={mentee}
                                        handleChange={handleChange}
                                    />
                                );
                            }
                            return <div key={mentee._id}></div>;
                        })}
                    </div>

                    <div className="w-full mt-2 flex items-center justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={chatIds.chats.length === 0 ? true : false}
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
