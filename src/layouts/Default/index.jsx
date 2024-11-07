import { Outlet } from "react-router-dom";
import DefaultNavbar from "./Navbar";
import styles from './style.module.css';

const DefaultLayout = () => {
	return (
		<>
			<DefaultNavbar />
			<article className={styles.article}>
				<Outlet />
			</article>
		</>
	);
};

export default DefaultLayout;
