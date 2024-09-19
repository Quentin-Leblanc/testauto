// scripts/scheduler.js
const cron = require('node-cron');
const config = require('../config');
const automate = require('../automate');
const logger = require('../logger');

/**
 * Fonction pour démarrer le scheduler.
 */
function startScheduler() {
    const interval = config.pushIntervalMinutes;

    logger.info(`Démarrage du scheduler avec un intervalle de ${interval} minutes.`);

    // Planifier la tâche pour qu'elle s'exécute toutes les X minutes
    cron.schedule(`*/${interval} * * * *`, async () => {
        logger.info('Exécution de la tâche automatisée planifiée.');
        try {
            await automate();
        } catch (error) {
            logger.error(`Erreur lors de l'exécution de la tâche automatisée: ${error.message}`);
        }
    });

    logger.info('Scheduler démarré.');
}

module.exports = startScheduler;
