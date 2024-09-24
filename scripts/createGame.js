// scripts/createGame.js
const logger = require('../logger');

async function createGame() {
    try {
        logger.info('Création du jeu...');
        // Implémentation de la création du jeu
        console.log('Jeu créé avec succès.');
        logger.info('Jeu créé avec succès.');
    } catch (error) {
        logger.error(`Erreur lors de la création du jeu: ${error.message}`);
        throw error;
    }
}

module.exports = createGame;
