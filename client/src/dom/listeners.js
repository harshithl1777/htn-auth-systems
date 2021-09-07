import { renderInterior, renderResponse } from './dom';

// Login Event Listener
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	renderInterior('hackthesouth');
});

const requestForm = document.querySelector('#request-form');
let count = 0;
requestForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (count % 2 === 0) renderResponse(false, 'Bad request', '404');
	else renderResponse(true, 'Good request', '200');
	count++;
});
