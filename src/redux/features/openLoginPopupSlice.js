import {createSlice} from '@reduxjs/toolkit';

const openLoginPopupSlice = createSlice({
	name: 'openPopUp',
	initialState: {
		isPopupOpen: false,
	},
	reducers: {
		openPopup: (state, action) => {
			state.isPopupOpen = action.payload;
		},
	},
});

export const { openPopup } = openLoginPopupSlice.actions;

export default openLoginPopupSlice.reducer;
