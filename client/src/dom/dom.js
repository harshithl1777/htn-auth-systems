export const renderInterior = (username) => {
	document.querySelector('#login-form').style.display = 'none';
	document.querySelector('#loading').style.display = 'flex';

	setTimeout(() => {
		document.querySelector('#username').innerHTML = username;
		document.querySelector('#loading').style.display = 'none';
		document.querySelector('#interior').style.display = 'flex';
	}, 500);
};

export const renderResponse = (success, message, code) => {
	if (
		success &&
		document.querySelector('#response-tag').classList.contains('red')
	) {
		document
			.querySelector('#response-container')
			.classList.replace('light-red', 'light-green');
		document.querySelector('#response-tag').classList.replace('red', 'green');
	} else if (
		!success &&
		document.querySelector('#response-tag').classList.contains('green')
	) {
		document
			.querySelector('#response-container')
			.classList.replace('light-green', 'light-red');
		document.querySelector('#response-tag').classList.replace('green', 'red');
	}

	document.querySelector('#response-text').innerHTML = message;
	document.querySelector('#response-tag').innerHTML = code;
	document.querySelector('#response').style.display = 'block';
};
