const fs = require('fs');
const path = require('path');

// Fonction pour décoder du base64
function decodeBase64(encodedContent) {
    return Buffer.from(encodedContent, 'base64').toString('utf-8');
}

async function handleResponse(response) {
    if (response.action === 'Créer fichier') {
        const decodedContent = decodeBase64(response.contenu);
        const filePath = path.join(process.cwd(), response.chemin);

        // Écrire le fichier avec le contenu décodé
        fs.writeFileSync(filePath, decodedContent, 'utf8');
        console.log(`Fichier créé avec succès : ${filePath}`);
    }
}

module.exports = { handleResponse };
