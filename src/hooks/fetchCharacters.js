import { useState, useEffect } from "react";

import axiosInstance from "../axiosInstance";

const useFetchCharacters = ({page}) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const currentPage = Number(page) || 1;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get('people/?page=' + currentPage);
				setData(response.data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, [page, currentPage]);

	return { loading, error, data };
};

export default useFetchCharacters;