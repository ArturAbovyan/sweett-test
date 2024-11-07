import {useLocation} from "react-router-dom";
import styles from "./style.module.css";
import HomeworldInfo from "../../../moleculs/Character/HomeworldInfo";
import VehiclesInfoSection from "../../../moleculs/Character/VehiclesInfo";
import FilmsInfoSection from "../../../moleculs/Character/FilmsInfo";

const CharacterInfoSection = () => {
	const location = useLocation();

	const character = location.state.character;  // Access 'user' from state

	return (
		<section className={styles.character_wrapper}>
			<div>
				<p className={styles.character_info_p}>
					name: {character.name}<br/>
					mass: {character.mass}<br/>
					height: {character.height}<br/>
					hair color: {character.hair_color}<br/>
					eye color: {character.eye_color}<br/>
				</p>
				<HomeworldInfo url={character.homeworld}/>
			</div>
			<VehiclesInfoSection urlList={character.vehicles}/>
			<FilmsInfoSection urlList={character.films}/>
		</section>
	);
};

export default CharacterInfoSection;