document.getElementById('listModels').addEventListener('click', async () => {
	try {
		const response = await axios.get('/listModels');
		console.log(response.data);
	} catch (error) {
		console.error('Error:', error.message);
	}
});

document.getElementById('sendRequest').addEventListener('click', async () => {
	const message = document.getElementById('prompt').value;
	try {
		const response = await axios.post('/sendRequest', {
			message: message,
		});
		const responseContainer = document.getElementById('response');
		const responseElement = document.createElement('div');
		responseElement.innerText = response.data;
		responseContainer.appendChild(responseElement);
	} catch (error) {
		console.error('Error:', error.message);
	}
});
