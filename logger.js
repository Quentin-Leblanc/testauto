const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Define log directory and file
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'automation.log');

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: logFile }),
        new winston.transports.Console()
    ]
});

module.exports = logger;
