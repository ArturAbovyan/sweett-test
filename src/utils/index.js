import axiosInstance from "../axiosInstance";
import {jwtDecode} from "jwt-decode";

const fetchFilteredCharacters = async (searchInpValue, count) => {
	const loopLength = Math.ceil(count / 10);
	const jointArray = [];

	for(let i = 1; i < loopLength; i++) {
		try {
			const response = await axiosInstance.get('people/?page=' + i);
			response.data.results.forEach((result) => jointArray.push(result));
		} catch (err) {
			throw new Error('Error Fetching Data :)', err);
		}
	}

	const filteredResult = jointArray.filter(item =>
		item.name.toLowerCase().indexOf(searchInpValue.toLowerCase()) !== -1);

	return filteredResult;
}

const isTokenExpired = () => {
	const token = localStorage.getItem('access_token');
	if (!token) {
		return true;
	}

	try {
		const decodedToken = jwtDecode(token);
		const currentTime = Date.now() / 1000;

		return decodedToken.exp < currentTime;
	} catch (error) {
		console.error('Error decoding token', error);
		return true;
	}
};

export { fetchFilteredCharacters, isTokenExpired };