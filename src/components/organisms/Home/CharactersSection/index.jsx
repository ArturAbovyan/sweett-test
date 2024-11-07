import useFetchCharacters from "../../../../hooks/fetchCharacters";
import CharacterCard from "../../../atoms/Home/CharacterCard";
import CharactersPagination from "../../../atoms/Home/CharactersPagination";
import styles from "./style.module.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchFilteredCharacters} from "../../../../utils";
import {Atom} from "react-loading-indicators";


const CharactersSection = () => {
	const [searchInpValue, setSearchInpValue] = useState("");
	const [fetchedData, setFetchedData] = useState({});
	const [isPaginationVisible, setIsPaginationVisible] = useState(true);
	const {page} = useParams()
	const currentPage = page || 1;

	const {loading, error, data} = useFetchCharacters({page});

	const handleSearchCharacters = (event) => {
		setSearchInpValue(event.target.value);
	}

	const handleClearFilters = () => {
		setFetchedData(data);
		setIsPaginationVisible(true);
		setSearchInpValue('');
	}

	useEffect(() => {
		if (data && data.results) {
			setFetchedData(data);
		}
	}, [data])

	const handleFetchFilteredCharacters = async () => {
		if (searchInpValue) {
			setFetchedData({...fetchedData, results: null});
			const result = await fetchFilteredCharacters(searchInpValue, fetchedData.count);
			if (result) {
				setFetchedData({...fetchedData, results: result});
				setIsPaginationVisible(false);
			}
		} else handleClearFilters();
	}


	if (error) return <div>Error: {error}</div>;
	if (loading || !fetchedData.results) return (
		<div className={styles.loading_screen}>
			<Atom color="#FFD700" size="medium" text="" textColor=""/>
		</div>
	);
	if(fetchedData.results.length === 0) return(
		<div className={styles.unfortunately_screen}>
			<h3>
				Unfortunately! 0 result
			</h3>
			<button onClick={handleClearFilters} className={styles.reset_btn}>
				Clear Filters
			</button>
		</div>
	)

	return (
		<section>
			<div className={styles.toolbar}>
				<div className={styles.search_container}>
				<input type="text" onChange={handleSearchCharacters} value={searchInpValue}/>
					<button onClick={handleFetchFilteredCharacters}>search</button>
				</div>

				<button onClick={handleClearFilters} className={styles.reset_btn}>
					Clear Filters
				</button>
			</div>

			<div className={styles.characters_container}>
				{fetchedData && fetchedData.results && fetchedData.results.map((character, index) => (
					<CharacterCard characterData={character} key={index} data={fetchedData}/>
				))}


			</div>

			{isPaginationVisible &&
				<CharactersPagination count={data.count}/>
			}
		</section>
	);
};

export default CharactersSection;