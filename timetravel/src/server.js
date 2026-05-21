// server.js
import dotenv from 'dotenv';
import process from 'process';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/api/claude', async (req, res) => {
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Proxy running on http://localhost:3001'));