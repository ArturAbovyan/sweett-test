import styles from './style.module.css';
import favoriteIcon from "../../../../assets/imgs/favoriteIcon.png";
import favoriteIconFilled from "../../../../assets/imgs/favoriteIconFilled.png";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUserFavorite} from "../../../../redux/features/userSlice";
import {useEffect, useState} from "react";
import {openPopup} from "../../../../redux/features/openLoginPopupSlice";

const CharacterCard = ({characterData, data}) => {
	const isAuthenticated = useSelector(state => state.user.isAuthenticated);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isAdded, setIsAdded] = useState(false);

	const characterIndex = characterData.url.slice(characterData.url.indexOf('people') + 7, characterData.length);
	const redirectURl = "/character/" + characterIndex;

	const favoriteList = useSelector(state => state.user.favorites);

	const handleCharacterInFavorites = () => {
		isAuthenticated ?
			dispatch(addUserFavorite(characterData))
			:
			dispatch(openPopup(true));
	}

	const handleNavigate = () => {
		navigate(redirectURl, {state: {character: characterData}});
	}

	useEffect(() => {
		if (typeof favoriteList === "string") {
			const parsedList = JSON.parse(favoriteList);
			if (parsedList.length > 0 && parsedList.some(fav => fav.name === characterData.name)) {
				setIsAdded(true);
			} else {
				setIsAdded(false);
			}
		} else {
			setIsAdded(false);
		}
	}, [favoriteList, characterData, data]);

	return (
		<div className={styles.cover_div}>
			<button className={styles.favorite_btn} onClick={handleCharacterInFavorites}>
				<img width="19" height="17" src={isAdded ? favoriteIconFilled : favoriteIcon} alt={"favorite"}/>
			</button>
			<h6>
				{characterData.name}
			</h6>
			<p>
				Gender: {characterData.gender}<br/>
				Birth year:{characterData.birth_year}<br/>
				Hair color: {characterData.hair_color}<br/>
			</p>
			<button onClick={handleNavigate}>
				More
			</button>
		</div>
	);
};

export default CharacterCard;