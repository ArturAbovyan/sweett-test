import styles from "./style.module.css";
import {useDispatch} from "react-redux";
import {openPopup} from "../../redux/features/openLoginPopupSlice";
import {GoogleLogin} from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import {loginSuccess} from "../../redux/features/userSlice";
import {jwtDecode} from "jwt-decode";

const LoginPopup = () => {
	const dispatch = useDispatch();

	const handleClosePopup = () => {
		dispatch(openPopup(false));
	}

	const googleLoginSuccess = (response) => {
		const userID = jwtDecode(response.credential).sub;
		dispatch(loginSuccess({
			access_token: response.credential,
			userID: userID
		}));
		handleClosePopup();
	};

	const errorMessage = (error) => {
		return null;
	};

	const handleFacebookCallback = (response) => {
		console.log(response);
		if (response.accessToken) {
			dispatch(loginSuccess({
				access_token: response.accessToken,
				userID: response.userID
			}));
			handleClosePopup();
		} else return null;
	}

	return (
		<div className={styles.popup_container} onClick={() => handleClosePopup()}>
			<div className={styles.popup_body} onClick={(e) => e.stopPropagation()}>
				<h4>
					Please Sign In To Get Full Access
				</h4>
				<br/>
				<br/>
				<div className={styles.social_login}>
					<GoogleLogin onSuccess={googleLoginSuccess} onError={errorMessage}/>
					<FacebookLogin
						buttonStyle={{padding: "6px"}}
						appId="1115873489920980"
						autoLoad={false}
						fields="name,email,picture"
						callback={handleFacebookCallback}/>
				</div>
			</div>
		</div>
	);
};

export default LoginPopup;