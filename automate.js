// automate.js
const tasks = require('./tasks');
const logger = require('./logger');

async function automate() {
    try {
        logger.info('Début de l\'automatisation.');

        // Exécuter les différentes tâches
        await tasks.createGame();
        await tasks.sendPromptToChatGPT();
        await tasks.handleErrors();
        await tasks.updateProject();

        logger.info('Automatisation terminée avec succès.');
        return 'Automatisation réussie.';
    } catch (error) {
        logger.error(`Erreur durant l'automatisation: ${error.message}`);
        throw error;
    }
}

module.exports = automate;
