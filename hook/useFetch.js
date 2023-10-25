// import { RAPID_API_KEY } from "@env";
import axios from "axios";
import { useEffect, useState } from "react";

// const rapidApiKey = RAPID_API_KEY;

const useFetch = ({ endpoint, query }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// console.log(endpoint, query);

	const options = {
		method: "GET",
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		params: { ...query },
		headers: {
			"X-RapidAPI-Key": "24b4fd4055msh3b38e6a775823fap13aed8jsn66256ac45bbe",
			"X-RapidAPI-Host": "jsearch.p.rapidapi.com",
		},
	};

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.request(options);
			setData(response.data.data);
			setError(null);
		} catch (err) {
			setError(err);
			alert("There is an error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const reFetch = () => {
		fetchData();
	};

	return { isLoading, data, error, reFetch };
};

export default useFetch;
