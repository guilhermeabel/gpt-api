import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
	organization: 'org-f5hTsDCmlrzuQPjwQfruXFhB',
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

(async () => {
	try {
		const response = await openai.listModels();
		const modelNames = response.data.data.map((model) => model.id);
		console.log('Model names:', modelNames);
	} catch (error) {
		console.error('Error:', error.message);
	}
})();
