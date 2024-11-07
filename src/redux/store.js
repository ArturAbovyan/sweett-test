import {combineReducers, createStore} from "@reduxjs/toolkit";
import openPopupReducer from "./features/openLoginPopupSlice";
import userSlice from "./features/userSlice";

const rootReducer = combineReducers({
	loginPopup: openPopupReducer,
	user: userSlice,
});


const store = createStore( rootReducer );

export default store;