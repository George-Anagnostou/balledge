require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Allow CORS for local frontend development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy endpoint for player search by first_name and last_name
app.get('/api/players', async (req, res) => {
  const { first_name, last_name } = req.query;
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'Missing first_name or last_name parameter' });
  }
  const url = `https://api.balldontlie.io/v1/players?first_name=${encodeURIComponent(first_name)}&last_name=${encodeURIComponent(last_name)}&per_page=100`;
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.BALLDONTLIE_API_KEY}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('balldontlie error:', data);
      return res.status(response.status).json({ error: 'balldontlie error', details: data });
    }
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 