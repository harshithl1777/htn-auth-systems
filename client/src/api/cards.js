import axios from 'axios';

const getCardsData = async (userID) => {
	try {
		const response = await axios.get(`/api/cards/${userID}`);
		return response;
	} catch (error) {
		return { data: error.response.data, status: error.response.status };
	}
};

export default getCardsData;
