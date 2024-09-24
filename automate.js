const fs = require('fs');
const path = require('path');
const { sendPromptToChatGPT } = require('./scripts/sendPrompt');
const { handleResponse } = require('./scripts/handleResponse');
const { handleError } = require('./scripts/handleError');
const { runTests } = require('./scripts/runTests');
const logger = require('./logger');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MAX_REQUESTS_PER_MINUTE = process.env.MAX_REQUESTS_PER_MINUTE || 4;
let requestCount = 0;
let lastRequestTime = Date.now();
let projectState = 'init'; // Track the state of the project

// Function to check if a request can be sent to ChatGPT
function canSendRequest() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - lastRequestTime) / 1000; // seconds
    if (requestCount < MAX_REQUESTS_PER_MINUTE || timeElapsed >= 60) {
        if (timeElapsed >= 60) {
            requestCount = 0; // Reset counter after a minute
            lastRequestTime = currentTime;
        }
        requestCount++;
        return true;
    }
    return false;
}

// Utility function to ensure JSON validity and log parsing errors
function parseJSONResponse(response) {
    try {
        return JSON.parse(response);
    } catch (error) {
        logger.error('Erreur lors du parsing du texte en JSON :', error.message);
        throw new Error('Impossible de parser la réponse JSON. Vérifiez le format.');
    }
}

// Main automation function
async function automate() {
    logger.info('Début de l\'automatisation.');

    try {
        const context = `
        Tu es chargé de développer un jeu en ligne appelé 'Mafia SC2 Loup Garou'. Le projet utilise les technologies suivantes :
        - React pour l'interface utilisateur.
        - joinplayroom pour la synchronisation des joueurs.
        - Cycle.js pour la gestion des cycles jour/nuit.
        - roles.js pour la gestion des rôles (loup-garou, villageois, etc.).
        - sync.js pour la synchronisation en temps réel des actions des joueurs.

        Le jeu suit la dynamique du jeu de société Mafia SC2 Loup Garou, avec des fonctionnalités comme la gestion des rôles, des cycles jour/nuit, un chat en temps réel, et des logs d’actions.
        **Réponds uniquement en JSON strictement valide avec les contenus encodés en base64, sans texte explicatif.**
        Chaque champ dans le JSON doit être entouré de guillemets doubles ("").
        `;

        if (projectState === 'init') {
            if (canSendRequest()) {
                const prompt1 = `
                ${context}
                Crée un fichier 'src/game/roles.js' avec la logique des rôles de base (Loup Garou, Villageois).
                **Réponds uniquement avec un objet JSON valide contenant "action", "chemin" et "contenu" encodé en base64.**
                `;
                const response1 = await sendPromptToChatGPT(prompt1);
                const parsedResponse1 = parseJSONResponse(response1);
                await handleResponse(parsedResponse1);
                projectState = 'rolesAdded';
            }
        }

        if (projectState === 'rolesAdded') {
            if (canSendRequest()) {
                const prompt2 = `
                ${context}
                Crée un fichier 'src/game/voting.js' avec la logique des votes pour le jeu Mafia SC2 Loup Garou.
                **Réponds uniquement avec un objet JSON valide contenant "action", "chemin" et "contenu" encodé en base64.**
                `;
                const response2 = await sendPromptToChatGPT(prompt2);
                const parsedResponse2 = parseJSONResponse(response2);
                await handleResponse(parsedResponse2);
                projectState = 'votingAdded';
            }
        }

        if (projectState === 'votingAdded') {
            if (canSendRequest()) {
                const prompt3 = `
                ${context}
                Crée un fichier 'src/game/cycle.js' avec la logique des cycles jour/nuit. Pendant la nuit, les Loups Garous choisissent une victime, et pendant le jour, les Villageois votent pour éliminer un suspect.
                **Réponds uniquement avec un objet JSON valide contenant "action", "chemin" et "contenu" encodé en base64.**
                `;
                const response3 = await sendPromptToChatGPT(prompt3);
                const parsedResponse3 = parseJSONResponse(response3);
                await handleResponse(parsedResponse3);
                projectState = 'cycleAdded';
            }
        }

        // Run tests after each feature is added
        const testResult = await runTests();

        if (!testResult.success) {
            logger.error("Tests échoués. Voici les erreurs :");
            testResult.errors.forEach(error => logger.error(error));

            const promptDebug = `
            Voici les erreurs des tests :
            ${testResult.errors.join('\n')}.
            Corrige le code pour résoudre ces erreurs.
            **Réponds uniquement avec un objet JSON valide contenant les corrections à apporter.**
            `;
            const debugResponse = await sendPromptToChatGPT(promptDebug);
            const parsedDebugResponse = parseJSONResponse(debugResponse);
            await handleResponse(parsedDebugResponse);
        }

        logger.info('Automatisation terminée avec succès.');
    } catch (error) {
        logger.error('Erreur durant l\'automatisation :', error.message);
        await handleError(error);
    }
}

// Start the automation
automate();
