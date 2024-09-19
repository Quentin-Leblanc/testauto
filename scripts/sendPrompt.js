// scripts/sendPrompt.js
const { Configuration, OpenAIApi } = require('openai');
const config = require('../config');
const logger = require('../logger');
const { limitRequest, activateDebugMode, deactivateDebugMode } = require('../requestLimiter');

/**
 * Fonction pour envoyer un prompt à ChatGPT en utilisant l'SDK OpenAI.
 */
async function sendPrompt(promptText) {
    try {
        if (!promptText) {
            throw new Error('Le promptText est requis.');
        }

        logger.info(`Préparation de l'envoi du prompt: "${promptText}"`);

        const configuration = new Configuration({
            apiKey: config.openaiApiKey,
        });

        const openai = new OpenAIApi(configuration);

        // Fonction limitée par le rate limiter
        const limitedCreateChatCompletion = limitRequest(openai.createChatCompletion.bind(openai));

        const response = await limitedCreateChatCompletion({
            model: 'gpt-4', // Utilisez 'gpt-4' si vous y avez accès
            messages: [
                { role: 'system', content: 'Vous êtes un assistant utile.' },
                { role: 'user', content: promptText },
            ],
            max_tokens: 150,
        });

        const reply = response.data.choices[0].message.content.trim();
        logger.info(`Réponse de ChatGPT: "${reply}"`);
        return reply;
    } catch (error) {
        // Activer le mode débogage en cas d'erreur
        activateDebugMode();

        if (error.response) {
            logger.error(`Erreur lors de l'envoi du prompt à ChatGPT: ${error.response.status} - ${error.response.statusText}`);
            logger.error(`Détails de l'erreur: ${JSON.stringify(error.response.data)}`);
            console.error(`Erreur lors de l'envoi du prompt à ChatGPT: ${error.response.status} - ${error.response.statusText}`);
            console.error(`Détails de l'erreur: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            logger.error(`Erreur lors de l'envoi du prompt à ChatGPT: Aucune réponse reçue.`);
            console.error(`Erreur lors de l'envoi du prompt à ChatGPT: Aucune réponse reçue.`);
        } else {
            logger.error(`Erreur lors de l'envoi du prompt à ChatGPT: ${error.message}`);
            console.error(`Erreur lors de l'envoi du prompt à ChatGPT: ${error.message}`);
        }
        throw error;
    }
}

module.exports = sendPrompt;
