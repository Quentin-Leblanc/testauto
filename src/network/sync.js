// src/network/sync.js

const WebSocket = require('ws');
const logger = require('../logger');

class SyncService {
    constructor() {
        this.players = [];
        this.ws = new WebSocket('wss://joinplayroom.example.com');
    }

    init() {
        this.ws.on('open', () => {
            logger.info('Connexion établie avec le serveur de synchronisation');
        });

        this.ws.on('message', (data) => {
            const message = JSON.parse(data);
            if (message.type === 'playerJoined') {
                this.addPlayer(message.player);
            } else if (message.type === 'actionSync') {
                this.syncAction(message);
            }
        });
    }

    addPlayer(player) {
        this.players.push(player);
        logger.info(`Nouveau joueur ajouté : ${player.name}`);
    }

    syncAction(action) {
        logger.info(`Action synchronisée : ${action.type}`);
        // Logique pour synchroniser les actions entre les joueurs
    }
}

module.exports = SyncService;
