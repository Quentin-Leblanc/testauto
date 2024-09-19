// config.js
require('dotenv').config();

module.exports = {
    openaiApiKey: process.env.OPENAI_API_KEY,
    port: process.env.PORT || 3000,
    pushIntervalMinutes: parseInt(process.env.PUSH_INTERVAL_MINUTES, 10) || 5,
    maxRequests: parseInt(process.env.MAX_REQUESTS, 10) || 4, // Limite de requêtes par minute
};
