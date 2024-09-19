// logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');

try {
    // Créer le dossier de logs s'il n'existe pas
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
        console.log('Dossier logs créé.');
    }
} catch (err) {
    console.error(`Erreur lors de la création du dossier logs: ${err.message}`);
}

const logFilePath = path.join(logDir, 'automation.log');

let logStream;
try {
    logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
} catch (err) {
    console.error(`Erreur lors de l'ouverture du fichier de log: ${err.message}`);
}

function info(message) {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message}\n`;
    console.log(logMessage.trim());
    if (logStream) {
        logStream.write(logMessage);
    }
}

function error(message) {
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
    console.error(logMessage.trim());
    if (logStream) {
        logStream.write(logMessage);
    }
}

module.exports = {
    info,
    error,
};
