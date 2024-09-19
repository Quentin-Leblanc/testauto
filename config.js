// config.js
require('dotenv').config();

module.exports = {
    openaiApiKey: process.env.OPENAI_API_KEY,
    port: process.env.PORT || 3000,
    pushIntervalMinutes: parseInt(process.env.PUSH_INTERVAL_MINUTES, 10) || 10,
};