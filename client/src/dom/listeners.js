import { renderInterior, renderResponse } from './dom';
import getCardsData from '../api/cards';

// Login Event Listener
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	renderInterior('hackthesouth');
});

const requestForm = document.querySelector('#request-form');
requestForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const userID = document.querySelector('#userid').value;
	const { data, status } = await getCardsData(userID);
	renderResponse(data.success, data.payload, status);
});

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', async () => {
	window.location.href = 'http://localhost:3000';
});
