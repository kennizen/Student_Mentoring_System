import { combineReducers } from "redux";
import admin from "./admin";
import mentor from "./mentor";
import student from "./student";
import chat from "./chat";
import post from "./post";

export default combineReducers({
    admin: admin,
    mentor: mentor,
    student: student,
    chat: chat,
    post: post,
});
