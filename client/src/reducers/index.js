import { combineReducers } from "redux";
import admin from "./admin";
import mentor from "./mentor";

export default combineReducers({
    admin: admin,
    mentor: mentor,
});
