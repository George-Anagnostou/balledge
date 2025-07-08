const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://balledge.onrender.com',
        'https://balledge-frontend.onrender.com'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API key from environment variables
const API_KEY = process.env.BALLDONTLIE_API_KEY;

// Sport-specific API endpoints
const API_ENDPOINTS = {
    nba: 'https://api.balldontlie.io/v1/players',
    mlb: 'https://api.balldontlie.io/mlb/v1/players',
    nfl: 'https://api.balldontlie.io/nfl/v1/players'
};

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Sports Player API is running',
        supported_sports: ['NBA', 'MLB', 'NFL'],
        api_source: 'balldontlie.io'
    });
});

// Unified player search endpoint
app.get('/api/players', async (req, res) => {
    const { sport, first_name, last_name } = req.query;
    if (!sport || !first_name || !last_name) {
        return res.status(400).json({ error: 'Missing required parameters: first_name, last_name, and sport are required' });
    }

    const baseUrl = API_ENDPOINTS[sport.toLowerCase()];
    if (!baseUrl) {
        return res.status(400).json({ error: 'Invalid sport' });
    }

    // Build query string with first_name and last_name
    const params = new URLSearchParams({
        first_name,
        last_name,
        per_page: 100
    });
    const url = `${baseUrl}?${params.toString()}`;

    const headers = {};
    if (API_KEY) {
        headers['Authorization'] = API_KEY;
    }

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Upstream API error', details: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Unified Sports API server running on http://localhost:${PORT}`);
    console.log(`Supported sports: NBA, MLB, NFL`);
    console.log(`API source: balldontlie.io`);
}); 