import Routing from "./Routing";
import './app.css'
import LoginPopup from "./layouts/LoginPopup";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addUserFavorite, logoutSuccess} from "./redux/features/userSlice";
import {isTokenExpired} from "./utils";

function App() {
	const isLoginPopupOpen = useSelector(state => state.loginPopup.isPopupOpen);
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(addUserFavorite());
			isTokenExpired() && dispatch(logoutSuccess());
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<>
			<Routing isAuthenticated={isAuthenticated}/>
			{isLoginPopupOpen && !isAuthenticated &&
				<LoginPopup />
			}

		</>

	);
}

export default App;
