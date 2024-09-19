// scripts/handleError.js
const logger = require('../logger');

/**
 * Fonction pour gérer les erreurs et envoyer des prompts d'erreur à ChatGPT.
 */
async function handleError(error) {
    try {
        logger.info('Gestion des erreurs.');

        const promptText = `Une erreur est survenue dans le projet d'automatisation: ${error.message}. Fournis des suggestions pour résoudre ce problème.`;

        const sendPrompt = require('./sendPrompt');
        const suggestions = await sendPrompt(promptText);

        logger.info(`Suggestions de ChatGPT pour l'erreur: "${suggestions}"`);
        // Vous pouvez implémenter la logique pour appliquer ces suggestions
        // Par exemple, créer des issues sur GitHub, envoyer des notifications, etc.
        return suggestions;
    } catch (err) {
        logger.error(`Erreur lors de la gestion des erreurs: ${err.message}`);
        throw err;
    }
}

module.exports = handleError;
