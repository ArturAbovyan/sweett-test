import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: !!localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false,
		userID: !!localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null ,
		favorites: null,
	},
	reducers: {
		loginSuccess(state, action) {
			localStorage.setItem('access_token', action.payload.access_token);
			localStorage.setItem('user_id', action.payload.userID);
			const favoritesKey = `favorites_${action.payload.userID}`;
			let userFavorites = localStorage.getItem(favoritesKey) || [];

			state.userID = action.payload.userID;
			state.isAuthenticated = true;
			state.favorites = userFavorites;
		},
		logoutSuccess(state) {
			localStorage.removeItem('access_token');
			localStorage.removeItem('user_id');

			state.isAuthenticated = false;
			state.favorites = null;
		},
		addUserFavorite(state, action) {
			if(state.isAuthenticated && state.userID) {
				const newFavorite = action.payload;
				const favoritesKey = `favorites_${state.userID}`;
				let currentFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
				if (newFavorite && currentFavorites.some(fav => fav.name === newFavorite.name)) {
					currentFavorites = currentFavorites.filter(fav => fav.name !== newFavorite.name);
				}else if(newFavorite){
					currentFavorites.push(newFavorite);
				}

				state.favorites = JSON.stringify(currentFavorites);
				localStorage.setItem(favoritesKey, JSON.stringify(currentFavorites));
			}
		}
	},
});

export const {
	loginSuccess,
	logoutSuccess,
	addUserFavorite
} = userSlice.actions;

export default userSlice.reducer;