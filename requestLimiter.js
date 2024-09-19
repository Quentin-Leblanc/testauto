// requestLimiter.js
const Bottleneck = require('bottleneck');
const config = require('./config');
const logger = require('./logger');

// Créer une instance de Bottleneck avec une limite de 4 requêtes par minute
const limiter = new Bottleneck({
    reservoir: config.maxRequests || 4, // Nombre de requêtes initiales
    reservoirRefreshAmount: config.maxRequests || 4, // Nombre de requêtes à réinitialiser
    reservoirRefreshInterval: 60 * 1000, // Intervalle de réinitialisation en millisecondes (1 minute)
    maxConcurrent: 1, // Nombre maximum de requêtes simultanées
    minTime: 250, // Temps minimum entre les requêtes en ms
});

// État de débogage
let isDebugging = false;

/**
 * Wrapper pour limiter les requêtes.
 * @param {Function} fn - La fonction de requête à limiter.
 * @returns {Function}
 */
function limitRequest(fn) {
    return limiter.wrap(async (...args) => {
        try {
            if (isDebugging) {
                logger.info(`Mode débogage actif. Requête spéciale de débogage envoyée.`);
            } else {
                logger.info(`Envoi de la requête. Réservoir restant : ${limiter.reservoir}`);
            }
            return await fn(...args);
        } catch (error) {
            logger.error(`Erreur dans le rate limiter: ${error.message}`);
            throw error;
        }
    });
}

/**
 * Activer le mode débogage.
 */
function activateDebugMode() {
    isDebugging = true;
    logger.info('Mode débogage activé.');
}

/**
 * Désactiver le mode débogage.
 */
function deactivateDebugMode() {
    isDebugging = false;
    logger.info('Mode débogage désactivé.');
}

module.exports = {
    limitRequest,
    resetRequestCount: () => {
        logger.info('Réinitialisation du réservoir de requêtes.');
        limiter.updateSettings({
            reservoir: config.maxRequests || 4,
        });
    },
    activateDebugMode,
    deactivateDebugMode,
};
