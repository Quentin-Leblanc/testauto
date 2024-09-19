// index.js
const express = require('express');
const dotenv = require('dotenv');
const automate = require('./automate');
const config = require('./config');

// Charger les variables d'environnement depuis .env
dotenv.config();

const app = express();
const PORT = config.port;

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('Bonjour, votre serveur Express fonctionne !');
});

// Route pour exécuter l'automatisation
app.post('/automate', async (req, res) => {
    try {
        const result = await automate();
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
