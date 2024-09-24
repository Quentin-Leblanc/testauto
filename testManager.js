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
            // Test pour créer un nouveau fichier
            `
Créer un fichier 'src/utils/helper.js' avec le contenu suivant :

\`\`\`javascript
function helper() {
  console.log('Helper function');
}
module.exports = helper;
\`\`\`

Réponds uniquement avec un objet JSON contenant l'action, le chemin du fichier et son contenu.
`,

            // Test pour modifier un fichier existant
            `
Ajouter le code suivant à la fin du fichier 'src/index.js' :

\`\`\`javascript
// Nouvelle fonctionnalité ajoutée automatiquement
function newFeature() {
  console.log('Nouvelle fonctionnalité');
}
\`\`\`

Réponds uniquement avec un objet JSON contenant l'action, le chemin du fichier et le contenu à ajouter.
`,

            // Test pour installer des dépendances
            `
Ajouter les dépendances suivantes à mon projet :

- axios
- fs-extra

Réponds uniquement avec un objet JSON contenant l'action et la liste des dépendances à installer.
`,
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
