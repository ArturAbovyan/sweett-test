import styles from'./style.module.css';
import logo from "../../../assets/imgs/logo.webp";
import {Link} from "react-router-dom";
import {openPopup} from "../../../redux/features/openLoginPopupSlice";
import {useDispatch, useSelector} from "react-redux";
import {logoutSuccess} from "../../../redux/features/userSlice";

const DefaultNavbar = () => {
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);

	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(logoutSuccess());
	}

	const handleOpenPopup = () => {
		dispatch(openPopup(true));
	}

	return(
		<header className={styles.navbar}>
			<Link to={"/"}>
				<img src={logo} alt={"test task"}/>
			</Link>
			{isAuthenticated ?
				<div className={styles.navlink}>
					<Link to="/favorites">Favorites</Link>
					<button onClick={handleSignOut}>Sign out</button>
				</div>

				:
				<button onClick={handleOpenPopup}>Sign In</button>
			}


		</header>
	);
};

export default DefaultNavbar;