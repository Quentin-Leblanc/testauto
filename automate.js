// automate.js
const tasks = require('./tasks');
const logger = require('./logger');
const { resetRequestCount } = require('./requestLimiter');
const runTests = require('./testManager');

/**
 * Fonction principale d'automatisation.
 */
async function automate() {
    try {
        console.log('Début de l\'automatisation.'); // Log de console
        logger.info('Début de l\'automatisation.');

        // Ajouter un log de test
        console.log('Log de test: automate.js fonctionne.');
        logger.info('Log de test: automate.js fonctionne.');

        // Exécuter les tests automatisés
        await runTests();

        // Exécuter les différentes tâches seulement si les tests réussissent
        console.log('Exécution de createGame');
        logger.info('Exécution de createGame');
        await tasks.createGame();

        console.log('Exécution de sendPromptToChatGPT');
        logger.info('Exécution de sendPromptToChatGPT');
        await tasks.sendPromptToChatGPT('Donne-moi des idées pour améliorer le jeu Mafia SC2 Loup-Garou.');

        console.log('Exécution de handleErrors');
        logger.info('Exécution de handleErrors');
        await tasks.handleErrors();

        console.log('Exécution de updateProject');
        logger.info('Exécution de updateProject');
        await tasks.updateProject();

        console.log('Automatisation terminée avec succès.');
        logger.info('Automatisation terminée avec succès.');
        return 'Automatisation réussie.';
    } catch (error) {
        console.error(`Erreur durant l'automatisation: ${error.message}`);
        logger.error(`Erreur durant l'automatisation: ${error.message}`);
        throw error;
    }
}

/**
 * Réinitialise le compteur de requêtes toutes les 24 heures.
 */
function scheduleReset() {
    const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
    setInterval(() => {
        resetRequestCount();
    }, oneDay);
}

// Exécuter la fonction automate et démarrer la réinitialisation du compteur
if (require.main === module) {
    automate()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Automatisation échouée:', error);
        });

    // Démarrer la réinitialisation du compteur
    scheduleReset();
}

module.exports = automate;
