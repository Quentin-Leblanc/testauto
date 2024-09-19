// tasks.js
const createGame = require('./scripts/createGame');
const sendPrompt = require('./scripts/sendPrompt');
const handleError = require('./scripts/handleError');
const updateProject = require('./scripts/updateProject');

module.exports = {
    createGame,
    sendPromptToChatGPT: sendPrompt,
    handleErrors: handleError,
    updateProject: updateProject,
};
