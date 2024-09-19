// scripts/updateProject.js
const sendPrompt = require('./sendPrompt');
const logger = require('../logger');

/**
 * Fonction pour générer de nouveaux prompts et mettre à jour le projet.
 */
async function updateProject() {
    try {
        logger.info('Mise à jour du projet via ChatGPT.');

        const promptText = `Fournis-moi une liste de tâches et de fonctionnalités à ajouter pour améliorer le jeu Mafia SC2 Loup-Garou.`;

        const tasksList = await sendPrompt(promptText);

        logger.info(`Liste de tâches générée par ChatGPT: "${tasksList}"`);

        // Implémentez la logique pour appliquer ces tâches
        // Par exemple, écrire dans un fichier, créer des issues GitHub, etc.

        // Exemple simplifié : Écrire dans un fichier prompts.json
        const fs = require('fs').promises;
        await fs.writeFile('prompts.json', JSON.stringify({ tasks: tasksList }, null, 2));

        logger.info('Tâches enregistrées dans prompts.json.');
        return tasksList;
    } catch (error) {
        logger.error(`Erreur lors de la mise à jour du projet: ${error.message}`);
        throw error;
    }
}

module.exports = updateProject;
