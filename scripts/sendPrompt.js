const axios = require('axios');
const dotenv = require('dotenv');
const logger = require('../logger');

// Load environment variables
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Fonction pour nettoyer le texte avant de le parser en JSON
function cleanResponseText(text) {
    // Supprimer les caractères de contrôle non valides
    text = text.replace(/[\x00-\x1F\x7F]/g, '');

    // Suppression des parties non nécessaires avant et après le JSON
    text = text.trim();

    // Si le texte commence par un texte explicatif avant le JSON, on tente de ne garder que le JSON
    const jsonStartIndex = text.indexOf('{');
    if (jsonStartIndex !== -1) {
        text = text.substring(jsonStartIndex);
    }

    // Suppression des caractères avant et après des potentiels objets JSON (par exemple, des accolades non terminées)
    text = text.replace(/^[^{[]*/, '').replace(/[^}\]]*$/, '');

    return text;
}

// Fonction pour décoder les données en base64
function decodeBase64(text) {
    try {
        return Buffer.from(text, 'base64').toString('utf-8');
    } catch (error) {
        logger.error('Erreur lors du décodage base64 :', error.message);
        throw new Error('Impossible de décoder le contenu base64.');
    }
}

async function sendPromptToChatGPT(prompt) {
    logger.info('Envoi du prompt à ChatGPT :', prompt);

    const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,  // Limite de tokens pour éviter les coupures
        temperature: 0.7
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Afficher la réponse brute avant toute modification
        let chatResponse = response.data.choices[0].message.content;
        console.log("Réponse brute non modifiée : ", chatResponse);  // Ajout de log brut
        logger.info('Réponse brute de ChatGPT:', chatResponse);

        // Nettoyage du texte avant de tenter le parsing
        chatResponse = cleanResponseText(chatResponse);

        // Vérifier si la réponse est bien en JSON valide avant le parsing
        if (!chatResponse.startsWith('{') && !chatResponse.startsWith('[')) {
            logger.error('Réponse après nettoyage n\'est pas un format JSON valide.');
            throw new Error('Réponse après nettoyage n\'est pas un format JSON valide.');
        }

        console.log("Réponse après nettoyage : ", chatResponse);  // Ajout de log brut
        logger.info('Réponse nettoyée de ChatGPT:', chatResponse);

        // Parse la réponse en JSON
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(chatResponse);
        } catch (parseError) {
            logger.error('Erreur lors du parsing de la réponse de ChatGPT :', parseError.message);
            logger.error('Réponse après nettoyage ayant causé l\'erreur :', chatResponse);
            throw new Error('Erreur lors du parsing de la réponse de ChatGPT après nettoyage.');
        }

        // Vérifie et décode les champs encodés en base64
        if (parsedResponse.contenu) {
            parsedResponse.contenu = decodeBase64(parsedResponse.contenu);
        }

        if (parsedResponse.chemin) {
            parsedResponse.chemin = decodeBase64(parsedResponse.chemin);
        }

        if (!parsedResponse.action || (!parsedResponse.chemin && !parsedResponse.dependencies)) {
            logger.warn('La réponse de ChatGPT ne contient pas les champs requis (action, chemin, contenu ou dependencies).');
        }

        return parsedResponse;
    } catch (error) {
        logger.error('Erreur lors de l\'envoi du prompt à ChatGPT:', error.message);
        throw error;
    }
}

module.exports = { sendPromptToChatGPT };
