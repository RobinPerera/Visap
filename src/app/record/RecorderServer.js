const express = require('express');
const path = require('path');
const OpenTok = require('opentok');

const app = express();
const apiKey = '46168162';
const apiSecret = '644d70c00ff07a709bd460394c56f5f3c748aac4';
const opentok = new OpenTok(apiKey, apiSecret);

const cors = require('cors');
app.use(cors());

// Serve React files
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint for generating sessionId and token
app.get('/generate', (req, res) => {
    opentok.createSession({ mediaMode: 'routed' }, (err, session) => {
        if (err) {
            return res.status(500).send({ error: 'Could not create session' });
        }
        const sessionId = session.sessionId;
        const token = opentok.generateToken(sessionId);
        res.json({ apiKey, sessionId, token });
    });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 4200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
