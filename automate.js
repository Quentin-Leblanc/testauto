const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis .env
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Fonction d'automatisation utilisant l'API OpenAI.
 * @returns {Promise<string>} - Réponse de l'API OpenAI.
 */
async function automate() {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Bonjour, comment puis-je vous aider aujourd'hui?",
            max_tokens: 50,
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API OpenAI:', error);
        throw error;
    }
}

module.exports = automate;
