// prompts.js
const fs = require('fs').promises;
const logger = require('./logger');

/**
 * Fonction pour ajouter un nouveau prompt dans un fichier.
 * Le prompt sera stocké sous forme d'objet JSON avec des champs supplémentaires.
 * @param {string} promptText - Le texte du prompt envoyé à ChatGPT.
 * @param {string} type - Type de tâche (par exemple, "createFile", "editFile", "addDependency").
 */
async function addPrompt(promptText, type = 'general') {
    try {
        // Lire le contenu actuel de prompts.json
        const data = await fs.readFile('prompts.json', 'utf8');
        const prompts = JSON.parse(data);

        // Créer une structure pour le nouveau prompt
        const newPrompt = {
            type: type,             // Type de la tâche (créer un fichier, modifier un fichier, etc.)
            prompt: promptText,     // Le texte exact du prompt envoyé à ChatGPT
            timestamp: new Date().toISOString()  // La date et l'heure de l'ajout du prompt
        };

        // Ajouter le nouveau prompt à la liste
        prompts.tasks.push(newPrompt);

        // Écrire les changements dans prompts.json
        await fs.writeFile('prompts.json', JSON.stringify(prompts, null, 2));

        // Logger l'opération réussie
        logger.info(`Nouveau prompt ajouté à prompts.json : ${JSON.stringify(newPrompt)}`);
    } catch (error) {
        logger.error(`Erreur lors de l'ajout du prompt: ${error.message}`);
        throw error;
    }
}

module.exports = {
    addPrompt,
};
