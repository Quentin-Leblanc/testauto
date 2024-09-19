// logger.js
const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'automation.log'), { flags: 'a' });

function info(message) {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message}\n`;
    console.log(logMessage.trim());
    logStream.write(logMessage);
}

function error(message) {
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
    console.error(logMessage.trim());
    logStream.write(logMessage);
}

module.exports = {
    info,
    error,
};
