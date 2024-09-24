// testOpenAI.js
const sendPrompt = require('./scripts/sendPrompt');
const logger = require('./logger');

async function testOpenAI() {
    try {
        logger.info('Test de l\'API OpenAI.');

        // Prompt pour créer un nouveau fichier
        const createFilePrompt = `
Créer un fichier 'src/utils/helper.js' avec le contenu suivant :

\`\`\`javascript
function helper() {
  console.log('Helper function');
}
module.exports = helper;
\`\`\`

Réponds uniquement avec un objet JSON contenant l'action, le chemin du fichier et son contenu.
`;

        const createFileResponse = await sendPrompt(createFilePrompt);
        console.log(`Réponse de création de fichier: "${createFileResponse}"`);

        // Prompt pour modifier un fichier existant
        const editFilePrompt = `
Ajouter le code suivant à la fin du fichier 'src/index.js' :

\`\`\`javascript
// Nouvelle fonctionnalité ajoutée automatiquement
function newFeature() {
  console.log('Nouvelle fonctionnalité');
}
\`\`\`

Réponds uniquement avec un objet JSON contenant l'action, le chemin du fichier et le contenu à ajouter.
`;

        const editFileResponse = await sendPrompt(editFilePrompt);
        console.log(`Réponse d'édition de fichier: "${editFileResponse}"`);

        // Prompt pour installer des dépendances
        const installDepsPrompt = `
Ajouter les dépendances suivantes à mon projet :

- axios
- fs-extra

Réponds uniquement avec un objet JSON contenant l'action et la liste des dépendances à installer.
`;

        const installDepsResponse = await sendPrompt(installDepsPrompt);
        console.log(`Réponse d'installation des dépendances: "${installDepsResponse}"`);

        logger.info('Tous les tests ont réussi.');
    } catch (error) {
        logger.error(`Erreur lors du test de l'API OpenAI: ${error.message}`);
        console.error(`Erreur lors du test de l'API OpenAI: ${error.message}`);
    }
}

testOpenAI();
