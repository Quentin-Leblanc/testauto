// scripts/sendPrompt.js
const { Configuration, OpenAIApi } = require('openai');
const config = require('../config');
const logger = require('../logger');

/**
 * Fonction pour envoyer un prompt à ChatGPT.
 */
async function sendPrompt(promptText) {
    try {
        if (!promptText) {
            throw new Error('Le promptText est requis.');
        }

        logger.info(`Envoi du prompt à ChatGPT: "${promptText}"`);

        const configuration = new Configuration({
            apiKey: config.openaiApiKey,
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: promptText,
            max_tokens: 150,
        });

        const reply = response.data.choices[0].text.trim();
        logger.info(`Réponse de ChatGPT: "${reply}"`);
        return reply;
    } catch (error) {
        logger.error(`Erreur lors de l'envoi du prompt à ChatGPT: ${error.message}`);
        throw error;
    }
}

module.exports = sendPrompt;
