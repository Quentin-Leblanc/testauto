const logger = require('../logger');

async function handleError(error) {
    logger.error('Erreur capturée :', error.message);
    logger.error('Détails de l\'erreur :', error.stack);

    const debugPrompt = `
    J'ai rencontré l'erreur suivante : "${error.message}".
    Peux-tu me proposer une solution pour corriger cette erreur dans mon code ?
    Réponds uniquement avec un code JSON contenant les corrections à appliquer encodé en base64.
    `;

    const { sendPromptToChatGPT } = require('./sendPrompt');
    const response = await sendPromptToChatGPT(debugPrompt);

    logger.info('Réponse complète de ChatGPT pour correction:', response);

    return response;
}

module.exports = { handleError };
