import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authslice"
import profileReducer from "../slices/profileslice";
import cartReducer from "../slices/cartslice";
import courseReducer from "../slices/courseslice";
import viewcourseReducer from "../slices/viewcourseslice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course: courseReducer,
    viewCourse:viewcourseReducer
})
export default rootReducer;