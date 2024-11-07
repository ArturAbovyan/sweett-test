import styles from "./style.module.css";
import {useSelector} from "react-redux";
import CharacterCard from "../../../atoms/Home/CharacterCard";
import {useEffect, useState} from "react";

const CharactersSection = () => {
	const [parsedList, setParsedList] = useState([]);
	const favoriteList =  useSelector(state => state.user.favorites);

	useEffect(() => {
		if (favoriteList && favoriteList.length > 0) {
			setParsedList(JSON.parse(favoriteList));
		}
	}, [favoriteList]);

	if(parsedList.length === 0) return(
		<div className={styles.unfortunately_screen}>
			<h3>
				Unfortunately! 0 result
			</h3>
		</div>
	)

	return (
		<section>
			<div className={styles.characters_section}>
				{parsedList && parsedList.map((character, index) => (
					<CharacterCard characterData={character} key={index} />
				))}
			</div>

		</section>
	);
};

export default CharactersSection;