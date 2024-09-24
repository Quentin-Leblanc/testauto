const { exec } = require('child_process');
const logger = require('../logger');

// Fonction pour exécuter les tests et capturer les erreurs
async function runTests() {
    return new Promise((resolve, reject) => {
        exec('npm test', (error, stdout, stderr) => {
            if (error) {
                logger.error(`Erreur lors de l'exécution des tests : ${stderr || stdout}`);
                resolve({ success: false, errors: stderr ? stderr.split('\n') : stdout.split('\n') });
            } else {
                logger.info('Tests réussis :', stdout);
                resolve({ success: true, errors: [] });
            }
        });
    });
}

module.exports = { runTests };
