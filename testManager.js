// testManager.js
const sendPrompt = require('./scripts/sendPrompt');
const logger = require('./logger');
const { deactivateDebugMode } = require('./requestLimiter');

/**
 * Fonction pour exécuter les tests avec une limite de 4 requêtes par minute.
 */
async function runTests() {
    try {
        logger.info('Début des tests automatisés.');

        // Liste des prompts de test
        const testPrompts = [
            'Test prompt 1 pour vérifier l\'API OpenAI.',
            'Test prompt 2 pour vérifier l\'API OpenAI.',
            'Test prompt 3 pour vérifier l\'API OpenAI.',
            'Test prompt 4 pour vérifier l\'API OpenAI.',
        ];

        for (const prompt of testPrompts) {
            const response = await sendPrompt(prompt);
            console.log(`Réponse: "${response}"`);
        }

        logger.info('Tous les tests ont réussi.');
    } catch (error) {
        logger.error('Une erreur est survenue lors des tests.');
        logger.error(`Détails de l'erreur: ${error.message}`);

        // Envoyer un prompt de débogage
        try {
            const debugPrompt = 'Débogage: Résoudre les erreurs survenues lors des tests.';
            const debugResponse = await sendPrompt(debugPrompt);
            console.log(`Réponse de débogage: "${debugResponse}"`);
            logger.info(`Réponse de débogage: "${debugResponse}"`);
        } catch (debugError) {
            logger.error('Une erreur est survenue lors du débogage.');
            logger.error(`Détails de l'erreur: ${debugError.message}`);
            console.error('Une erreur est survenue lors du débogage.');
        }
    } finally {
        // Désactiver le mode débogage si nécessaire
        deactivateDebugMode();
    }
}

module.exports = runTests;
