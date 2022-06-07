import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "../../../../../../assets/icons/SearchIcon";
import ChatTile from "./ChatTile";
import { useSelector } from "react-redux";
import SearchChatTile from "./SearchChatTile";
import { authContext } from "../../../../../../contexts/authContext";

const ChatSideBar = ({ setChatSelection, setCurChat }) => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    // accesing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);

    // use effect used to persists the chat side bar selection and the chat window chat top bar data
    useEffect(() => {
        if (localStorage.getItem("persistChat") !== null) {
            const index = JSON.parse(localStorage.getItem("persistChat")).chatIndex;
            localStorage.setItem("0", index);

            const chatId = JSON.parse(localStorage.getItem("persistChat")).chatId;
            const chats = JSON.parse(localStorage.getItem("chats"));
            let thatChat = chats.find((chat) => chat._id.toString() === chatId.toString());
            let thisChat = thatChat.users.find((user) => user.user._id !== uid);
            setCurChat({
                avatar: thisChat.user.avatar.url,
                name: `${thisChat.user.firstname} ${thisChat.user.middlename} ${thisChat.user.lastname}`,
            });
        }
    }, []);

    // state variable to show the temporary search list
    const [tmpList, setTmpList] = useState([]);
    // state varibale to reset the search query in the input field
    const [val, setVal] = useState("");

    // function to perform search when query typed in search bar
    const handleSearch = (e) => {
        let val = e.target.value;
        let tmp = [];

        if (
            val !== "" &&
            chats.find((chat) =>
                chat.users.find(
                    (user) => user.user["firstname"].toString().toLowerCase().indexOf(val) > -1
                )
            )
        ) {
            tmp.push(
                chats.find((chat) =>
                    chat.users.find(
                        (user) => user.user["firstname"].toString().toLowerCase().indexOf(val) > -1
                    )
                )
            );
        } else if (
            val !== "" &&
            chats.find((chat) =>
                chat.users.find(
                    (user) => user.user["middlename"].toString().toLowerCase().indexOf(val) > -1
                )
            )
        ) {
            tmp.push(
                chats.find((chat) =>
                    chat.users.find(
                        (user) => user.user["middlename"].toString().toLowerCase().indexOf(val) > -1
                    )
                )
            );
        } else if (
            val !== "" &&
            chats.find((chat) =>
                chat.users.find(
                    (user) => user.user["lastname"].toString().toLowerCase().indexOf(val) > -1
                )
            )
        ) {
            tmp.push(
                chats.find((chat) =>
                    chat.users.find(
                        (user) => user.user["lastname"].toString().toLowerCase().indexOf(val) > -1
                    )
                )
            );
        }

        setTmpList(tmp);
        setVal(val);
    };

    return (
        <>
            <div className="w-2/5 p-2 bg-white rounded-md h-full overflow-auto">
                <div className="sticky-top z-10">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            onChange={handleSearch}
                            className="pl-11 border-none w-full focus:outline-none focus:ring-0 bg-gray-100 rounded-md"
                            placeholder="Search chat..."
                            value={val}
                        />
                        <div className="absolute top-2.5 left-3">
                            <SearchIcon myStyle={"h-5 w-5"} alt={true} />
                        </div>
                    </div>
                </div>

                {tmpList.length === 0
                    ? chats?.map((chat, index) => {
                          if (
                              chat !== undefined &&
                              chat.users.find((user) => user.user._id !== uid)
                          ) {
                              let thatUser = chat.users.find((user) => user.user._id !== uid);
                              return (
                                  <ChatTile
                                      key={chat._id}
                                      chat={chat}
                                      index={index}
                                      setChatSelection={setChatSelection}
                                      thatUser={thatUser}
                                      setCurChat={setCurChat}
                                      setTmpList={setTmpList}
                                  />
                              );
                          }
                          return <div key={chat !== undefined && chat._id}></div>;
                      })
                    : tmpList?.map((chat) => {
                          if (
                              chat !== undefined &&
                              chat.users.find((user) => user.user._id !== uid)
                          ) {
                              let thatUser = chat.users.find((user) => user.user._id !== uid);
                              return (
                                  <SearchChatTile
                                      key={chat._id}
                                      chat={chat}
                                      setChatSelection={setChatSelection}
                                      thatUser={thatUser}
                                      setCurChat={setCurChat}
                                      setTmpList={setTmpList}
                                      chats={chats}
                                      setVal={setVal}
                                  />
                              );
                          }
                          return <div key={chat !== undefined && chat._id}></div>;
                      })}
            </div>
        </>
    );
};

export default ChatSideBar;
