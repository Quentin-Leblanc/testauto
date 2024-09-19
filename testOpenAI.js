// testOpenAI.js
const { Configuration, OpenAIApi } = require('openai');
const config = require('./config');
const logger = require('./logger');

async function testOpenAI() {
    try {
        logger.info('Test de l\'API OpenAI.');

        const configuration = new Configuration({
            apiKey: config.openaiApiKey,
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: 'gpt-4', // Remplacez par 'gpt-3.5-turbo' si vous préférez
            messages: [{ role: 'user', content: 'Test prompt pour vérifier l\'API OpenAI.' }],
            max_tokens: 10,
        });

        const reply = response.data.choices[0].message.content.trim();
        logger.info(`Réponse de ChatGPT: "${reply}"`);
        console.log(`Réponse de ChatGPT: "${reply}"`);
    } catch (error) {
        if (error.response) {
            logger.error(`Erreur lors du test de l'API OpenAI: ${error.response.status} - ${error.response.statusText}`);
            logger.error(`Détails de l'erreur: ${JSON.stringify(error.response.data)}`);
            console.error(`Erreur lors du test de l'API OpenAI: ${error.response.status} - ${error.response.statusText}`);
            console.error(`Détails de l'erreur: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            logger.error(`Erreur lors du test de l'API OpenAI: Aucune réponse reçue.`);
            console.error(`Erreur lors du test de l'API OpenAI: Aucune réponse reçue.`);
        } else {
            logger.error(`Erreur lors du test de l'API OpenAI: ${error.message}`);
            console.error(`Erreur lors du test de l'API OpenAI: ${error.message}`);
        }
    }
}

testOpenAI();
