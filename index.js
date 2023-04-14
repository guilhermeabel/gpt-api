import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

const configuration = new Configuration({
	organization: 'org-f5hTsDCmlrzuQPjwQfruXFhB',
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/listModels', async (req, res) => {
	try {
		const response = await openai.listModels();
		const modelNames = response.data.data.map((model) => model.id);
		res.json(modelNames);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/sendRequest', async (req, res) => {
	const { message } = req.body;
	try {
		const response = await openai.createCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: message,
				},
			],
		});
		res.json(response.data.choices[0].text);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
