import styles from './style.module.css';
import {useEffect, useState} from "react";
import axios from "axios";

const HomeworldInfoSection = ({url}) => {
	const [homeworldInfo, setHomeworldInfo] = useState({});

	const fetchHomeworldInfo = async (url) => {
		const response = await axios.get(url);
		if (response){
			setHomeworldInfo(response.data);
		}
	}
	useEffect(() => {
		if(url){
			fetchHomeworldInfo(url);
		}
	}, [url])
	return(
		<div>
			<h4 className={styles.heading}>
				Home World
			</h4>
			<p className={styles.homeworld_info}>
				Name: {homeworldInfo.name}<br/>
				Climate: {homeworldInfo.climate}<br/>
				Diameter: {homeworldInfo.diameter}<br/>
				Gravity: {homeworldInfo.gravity}<br/>
				Orbital Period: {homeworldInfo.orbital_period}<br/>
				Population: {homeworldInfo.population}<br/>
				Terrain: {homeworldInfo.terrain}<br/>
			</p>
		</div>
	);
};

export default HomeworldInfoSection;