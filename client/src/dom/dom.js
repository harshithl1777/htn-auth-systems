export const renderInterior = () => {
	document.querySelector('#login-form').style.display = 'none';
	document.querySelector('#loading').style.display = 'flex';

	setTimeout(() => {
		document.querySelector('#loading').style.display = 'none';
		document.querySelector('#interior').style.display = 'flex';
	}, 500);
};

export const renderResponse = (success, payload, code) => {
    
    // Update colors based on success level
	const containsRedClass = document.querySelector('#response-tag').classList.contains('red');
	const containsGreenClass = document.querySelector('#response-tag').classList.contains('green');

	if (success && containsRedClass) {
		document.querySelector('#response-container').classList.replace('light-red', 'light-green');
		document.querySelector('#response-tag').classList.replace('red', 'green');
	} else if (!success && containsGreenClass) {
		document.querySelector('#response-container').classList.replace('light-green', 'light-red');
		document.querySelector('#response-tag').classList.replace('green', 'red');
	}

    document.querySelector('#response-text').innerHTML = ''; // Delete previous response text

    // If data is returned, loop through each card and list it
    if (typeof payload === 'object') {
        payload.forEach(card => {
            for (const key in card) {
                const line = `${key.toUpperCase()}: ${card[key]} <br />`;
                document.querySelector('#response-text').insertAdjacentHTML('beforeend', line);
            }
        });
    // If data is not returned, insert the error message
    } else {
        document.querySelector('#response-text').innerHTML = payload;
    }

    // Update status code and display response div
	document.querySelector('#response-tag').innerHTML = code;
	document.querySelector('#response').style.display = 'block';
};
