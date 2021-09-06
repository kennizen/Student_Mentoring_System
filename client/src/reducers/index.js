import { combineReducers } from "redux";
import admin from "./admin";
import mentor from "./mentor";
import student from "./student";

export default combineReducers({
    admin: admin,
    mentor: mentor,
    student: student,
});
