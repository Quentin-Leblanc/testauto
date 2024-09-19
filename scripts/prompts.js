// prompts.js
const fs = require('fs').promises;
const logger = require('./logger');

/**
 * Fonction pour ajouter un nouveau prompt dans un fichier.
 */
async function addPrompt(promptText) {
    try {
        const data = await fs.readFile('prompts.json', 'utf8');
        const prompts = JSON.parse(data);
        prompts.tasks.push(promptText);
        await fs.writeFile('prompts.json', JSON.stringify(prompts, null, 2));
        logger.info('Nouveau prompt ajouté à prompts.json.');
    } catch (error) {
        logger.error(`Erreur lors de l'ajout du prompt: ${error.message}`);
        throw error;
    }
}

module.exports = {
    addPrompt,
};
