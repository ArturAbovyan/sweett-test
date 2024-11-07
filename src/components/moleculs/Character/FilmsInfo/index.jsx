import {useEffect, useState} from "react";
import axios from "axios";
import styles from "./style.module.css";

const FilmsInfoSection = ({urlList}) => {
	const [filmsArray, setFilmsArray] = useState([]);
	const fetchFilmsInfo = async (urlList) => {
		for (let i = 0; i < urlList.length; i++) {
			const response = await axios.get(urlList[i]);
			setFilmsArray((prevDataArray) => [...prevDataArray, response.data]);
		}

	}
	useEffect(() => {
		if(urlList){
			fetchFilmsInfo(urlList);
		}
	}, [urlList])

	return(
		<div className={styles.films_wrapper}>
			<h4 className={styles.heading}>
				Films With This Hero
			</h4>
			<div className={styles.films_container}>
				{filmsArray.length > 0 && filmsArray.map((vehicle, index) => (
					<div key={index} className={styles.films_card}>
						<h4>
							Title: {vehicle.title}
						</h4>
						<p>
							Director: {vehicle.director}<br/>
							Producer: {vehicle.producer}<br/>
							Release Date: {vehicle.release_date}<br/><br/>
							Opening Crawl:<br/> {vehicle.opening_crawl}
						</p>
					</div>
				))}
			</div>
			{urlList.length === 0 &&
				<div className={styles.films_card}>
					No Films Found
				</div>
			}
		</div>
	);
};

export default FilmsInfoSection;