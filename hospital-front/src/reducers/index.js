import { combineReducers } from "redux";
import hours from "./hours";
import doctors from "./doctors";
import requests from "./requests";
import appointments from "./appointments";

export default combineReducers({
    hours,
    doctors,
    requests,
    appointments
});
